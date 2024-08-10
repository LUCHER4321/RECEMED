export async function prescription(profile, token = ""){
    return(
        <div>
            <header className="absolute top-0 right-0">{profile.first_name} {profile.last_name}</header>
            {await handlePrescriptions(token)}
        </div>
    );
}

async function fetchPrescriptions(token){
    console.log('Token:', token);  // Verifica el token que se está utilizando
    const response = await fetch('http://rec-staging.recemed.cl/api/patients/prescriptions', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    console.log('Response status:', response.status);  // Verifica el estado de la respuesta
    if (!response.ok) {
        console.error('Error fetching data:', response.status, response.statusText);  // Imprime el error si ocurre
        throw new Error(`Network response was not ok. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Data fetched:', data);  // Verifica los datos recibidos
    return data;
}

function onePrescription(json){
    const doctor = json.doctor;
    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <p>Folio: {json.folio}</p>
                <p>Receta de Medicamentos</p>
            </div>
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