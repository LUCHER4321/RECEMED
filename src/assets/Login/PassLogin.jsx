import { useState } from 'react'
import { requestData } from '../RequestData';
function PassLogin(){
    const RUT = localStorage.getItem("RUT");
    const [pass, setPass] = useState('');
    const login = async () => {
        const response = await requestData(RUT, pass);
        if(response.error){
            alert("Contraseña incorrecta");
        }
        else{
            //Ir a recetas
            console.log(RUT);
            const profile = response.data.profiles[0];
            console.log(profile);
            const firstName = profile.first_name;
            const lastName = profile.last_name;
            localStorage.setItem("first_name", firstName);
            localStorage.setItem("last_name", lastName);
            const token = response.data.token;
            localStorage.setItem("token", token);
            window.location.href = "./prescription.html";
        }
    };
    return (
        <div className="flex flex-col items-center">
            <input type="text" placeholder="Ingresa tu contraseña" value={pass} onChange={(e) => setPass(e.target.value)}/>
            <button onClick={login} className="bg-rm-blue-100 hover:bg-rm-blue-200">Ingresar</button>
        </div>
    );
}

export default PassLogin