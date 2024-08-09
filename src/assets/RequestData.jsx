export async function requestData(RUT, pass){
    const apiUrl = 'http://rec-staging.recemed.cl/doc/swagger.json';
    const requestData = {
        user: {
            password: pass,
            rut: RUT
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