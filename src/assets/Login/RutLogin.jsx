import { useState } from 'react'
import { testRUT } from '../TestRUT';
function RutLogin(){
    const [RUT, setRUT] = useState('');
    const nextButton = () => {
        const valid = testRUT(RUT);
        if (valid) {
            //Ir a password
            localStorage.setItem("RUT", RUT);
            window.location.href = "./password.html";
        } else {
            alert("RUT inválido");
        }
    };
    return(
        <div className="flex flex-col items-center">
            <input type="text" placeholder="Ingresa tu RUT" value={RUT} onChange={(e) => setRUT(e.target.value)}/>
            <button onClick={nextButton} className="bg-rm-blue-100 hover:bg-rm-blue-200">Siguiente</button>
        </div>
    );
}

export default RutLogin