export async function requestData(RUT, pass){
    const apiUrl = 'http://rec-staging.recemed.cl/api/users/log_in';
    const requestData = {
        user: {
            password: pass,
            rut: cleanRUT(RUT)
        }
    };
    try{
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });
        if(!response.ok) throw new Error(`Network response was not ok. Status: ${response.status}`);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error('Error:', error);
        return { error: error.message };
    }
}

function cleanRUT(RUT){
    const newRUT = RUT.replace(/[.\-]/g, "");
    return `{newRUTcleanRUT.slice(0, -1)}-{cleanRUT.slice(-1)}`
}