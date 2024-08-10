export async function prescription(first_name, last_name, token = ""){
    console.log(first_name + " " + last_name);
    return(
        <div className="flex flex-col items-center">
            <header className="absolute top-0 right-0">{first_name} {last_name}</header>
            <div className="flex flex-col absolute top-0 left-0">
                <p className="bg-rm-cyan-100">Receta Retenida</p>
                <p className="bg-rm-cyan-200">Receta Simple</p>
            </div>
            {await handlePrescriptions(token)}
        </div>
    );
}

async function fetchPrescriptions(token){
    console.log('Token:', token);
    const response = await fetch('http://rec-staging.recemed.cl/api/patients/prescriptions', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    console.log('Response status:', response.status);
    if (!response.ok) {
        console.error('Error fetching data:', response.status, response.statusText);
        throw new Error(`Network response was not ok. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Data fetched:', data);
    return data;
}

function onePrescription(json){
    const doctor = json.doctor;
    const bgColor = json.type === "Receta Retenida" ? "bg-rm-cyan-100" : json.type === "Receta Simple" ? "bg-rm-cyan-200" : "bg-white";
    return (
        <div className={`flex flex-col ${bgColor}`}>
            <p>Folio: {json.folio}</p>
            <p>Fecha de Emisión: {json.inserted_at}</p>
            <p>Dr. {doctor.first_name} {doctor.last_name}</p>
            <p>{doctor.speciality}</p>
            <p>código: {json.code}</p>
        </div>
    );
}

function allPrescriptions(list){
    if (!list || list.length === 0) {
        return <p>{list}</p>;
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            {list.map((item, index) => (
                <div key={index}>
                    {onePrescription(item)}
                </div>
            ))}
        </div>
    );
}

async function handlePrescriptions(token) {
    try {
        const response = await fetchPrescriptions(token);
        if (response && response.data) {
            return allPrescriptions(response.data, token);
        } else {
            return <p>No hay recetas disponibles</p>;
        }
    } catch (error) {
        console.error("Error fetching prescriptions:", error);
        return <p>Hubo un error al obtener las recetas.</p>;
    }
}