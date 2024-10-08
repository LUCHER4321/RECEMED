# Mini proyecto RECEMED

## Cómo se implementó el SSR

### Página para ingresar el RUT

La página para ingresar el RUT se encuentra en el archivo [index.html](./index.html).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RECEMED</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

La estructura es manejada por el archivo [main.jsx](./src/main.jsx).

```javascript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RutLogin from "./assets/Login/RutLogin.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RutLogin />
  </StrictMode>
);
```

Y creada por el archivo [RutLogin.jsx](./src/assets/Login/RutLogin.jsx)

```javascript
import { useState } from "react";
import { testRUT } from "../TestRUT";
function RutLogin() {
  const [RUT, setRUT] = useState("");
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
  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Ingresa tu RUT"
        value={RUT}
        onChange={(e) => setRUT(e.target.value)}
      />
      <button
        onClick={nextButton}
        className="bg-rm-blue-100 hover:bg-rm-blue-200"
      >
        Siguiente
      </button>
    </div>
  );
}

export default RutLogin;
```

La función `testRut(RUT)` se encarga de verificar que el RUT sea válido, el comando `localStorage.setItem("RUT", RUT);` se encarga de guardar el valor que el usuario ingresó, para luego redirigir al archivo [password.html](./password.html).

### Página para ingresar la contraseña

La página para ingresar la contraseña se encuentra en el archivo [password.html](./password.html).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RECEMED</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="src/pass_main.jsx"></script>
  </body>
</html>
```

La estructura es manejada por el archivo [pass_main.jsx](./src/pass_main.jsx).

```javascript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PassLogin from "./assets/Login/PassLogin";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PassLogin />
  </StrictMode>
);
```

Y creada por el archivo [PassLogin.jsx](./src/assets/Login/PassLogin.jsx).

```javascript
import { useState } from "react";
import { requestData } from "../RequestData";
function PassLogin() {
  const RUT = localStorage.getItem("RUT");
  const [pass, setPass] = useState("");
  const login = async () => {
    const response = await requestData(RUT, pass);
    if (response.error) {
      alert("Contraseña incorrecta");
    } else {
      //Ir a recetas
      const profile = response.data.profiles[0];
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
      <input
        type="text"
        placeholder="Ingresa tu contraseña"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={login} className="bg-rm-blue-100 hover:bg-rm-blue-200">
        Ingresar
      </button>
    </div>
  );
}

export default PassLogin;
```

La función `requestData(RUT, pass)` se encarga de obtener el archivo JSON con la información del paciente, entre ellos, el nombre, el apellido y un token, los cuales son guardados localmente para luego redirigir al archivo [prescription.html](./prescription.html).

### Página de las recetas médicas

La página para ingresar la contraseña se encuentra en el archivo [prescription.html](./prescription.html).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RECEMED</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="src/pres_main.jsx"></script>
  </body>
</html>
```

La estructura es creada en el archivo [pres_main.jsx](./src/pres_main.jsx) y la función `prescription(first_name, last_name, token = "")` a partir del nombre, apellido y token que se obtuvo previamente.

```javascript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { prescription } from "./assets/Prescription";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {await prescription(
      localStorage.getItem("first_name"),
      localStorage.getItem("last_name"),
      localStorage.getItem("token")
    )}
  </StrictMode>
);
```

### Configuración de Tailwind CSS

Los colores creados para el Tailwind CSS son:

- `"rm-blue-100": "#367CF4"`
- `"rm-blue-200": "#367cc8"`
- `"rm-cyan-100": "#00FFFF"`
- `"rm-cyan-200": "#007FFF"`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "rm-blue-100": "#367CF4",
        "rm-blue-200": "#367cc8",
        "rm-cyan-100": "#00FFFF",
        "rm-cyan-200": "#007FFF",
      },
    },
  },
  plugins: [],
};
```

## Cómo se implementó el CSR

### Testeo del RUT

Para asegurarme de que el RUT sea válido, creé la función `testRUT(RUT)` en el archivo [TestRUT.jsx](./src/assets/TestRUT.jsx), la cuál quita los puntos y el guion que hayan sido ingresados para luego separar el cuerpo del dígito verificador y así asegurarse de que este último sea el que correspode.

```javascript
export function testRUT(RUT) {
  const cleanRUT = RUT.replace(/[.\-]/g, "");
  const body = cleanRUT.slice(0, -1);
  let vDigit = cleanRUT.slice(-1).toUpperCase();
  if (!/^[0-9]+$/.test(body)) {
    return false;
  }
  let sum = 0;
  let mult = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += mult * parseInt(body.charAt(i));
    mult = mult < 7 ? mult + 1 : 2;
  }
  const mod11 = 11 - (sum % 11);
  let calcDigit = mod11 === 11 ? "0" : mod11 === 10 ? "K" : mod11.toString();
  return vDigit === calcDigit;
}
```

### Obtención del token y el nombre del paciente

Para obtener el JSON con la información del usuario, se creó la función `requestData(RUT, pass)` en el archivo [RequestData.jsx](./src/assets/RequestData.jsx), la cual envía un POST con el RUT y la contraseña a la respectiva [API](http://rec-staging.recemed.cl/api/users/log_in)

```javascript
export async function requestData(RUT, pass) {
  const apiUrl = "http://rec-staging.recemed.cl/api/users/log_in";
  const requestData = {
    user: {
      password: pass,
      rut: cleanRUT(RUT),
    },
  };
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    if (!response.ok)
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error: error.message };
  }
}
```

Además, cuenta con la función `cleanRUT(RUT)` para asegurarse de que el RUT esté en formato 12345678-9 y no 12.345.678-9 o 123456789.

```javascript
function cleanRUT(RUT) {
  const newRUT = RUT.replace(/[.\-]/g, "");
  return `${newRUT.slice(0, -1)}-${newRUT.slice(-1)}`;
}
```

### Recetas médicas

Las recetas médicas son manejadas por el archivo [Prescription.jsx](./src/assets/Prescription.jsx), la estructura general viene dada por la función `prescription(first_name, last_name, token = "")`, el header se encarga de mostrar el nombre del paciente arriba a la derecha, también se muestran los colores que representan las Recetas Retenidas y Simples, finalmente, llama a la función `handlePrescriptions(token)`.

```javascript
export async function prescription(first_name, last_name, token = "") {
  return (
    <div className="flex flex-col items-center">
      <header className="absolute top-0 right-0">
        {first_name} {last_name}
      </header>
      <div className="flex flex-col absolute top-0 left-0">
        <p className="bg-rm-cyan-100">Receta Retenida</p>
        <p className="bg-rm-cyan-200">Receta Simple</p>
      </div>
      {await handlePrescriptions(token)}
    </div>
  );
}
```

La función `handlePrescriptions(token)` se encarga de obtener el JSON de las recetas con la función `fetchPrescriptions(token)` y mostrarlas en pantalla con la función `allPrescriptions(list)`.

```javascript
async function handlePrescriptions(token) {
  try {
    const response = await fetchPrescriptions(token);
    if (response && response.data) {
      return allPrescriptions(response.data);
    } else {
      return <p>No hay recetas disponibles</p>;
    }
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    return <p>Hubo un error al obtener las recetas.</p>;
  }
}
```

La función `fetchPrescriptions(token)` se encarga de obtener el JSON de las recetas con a partir del token obtenido del RUT y la contraseña del paciente.

```javascript
async function fetchPrescriptions(token) {
  const response = await fetch(
    "http://rec-staging.recemed.cl/api/patients/prescriptions",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    console.error("Error fetching data:", response.status, response.statusText);
    throw new Error(`Network response was not ok. Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
```

La función `allPrescriptions(list)` se encarga de mostrar la lista de recetas en una tabla de una columna para móbiles y 2 para PC, la estructura de cada elemnto de `list` viene dada por la función `onePrescription(json)`.

```javascript
function allPrescriptions(list) {
  if (!list || list.length === 0) {
    return <p>Lista vacía</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {list.map((item, index) => (
        <div key={index}>{onePrescription(item)}</div>
      ))}
    </div>
  );
}
```

La función `onePrescription(json)` se encarga de la estructura de las recetas, primero el folio, luego la fecha de emisión, después el nombre y especialidad del doctor respectivamente y, finalmente, el código. Las recetas retenidas tienen un fondo color `"rm-cyan-100"`, mientras que las recetas simples tienen un fondo color `"rm-cyan-200"`.

```javascript
function onePrescription(json) {
  const doctor = json.doctor;
  const bgColor =
    json.type === "Receta Retenida"
      ? "bg-rm-cyan-100"
      : json.type === "Receta Simple"
      ? "bg-rm-cyan-200"
      : "bg-white";
  return (
    <div className={`flex flex-col ${bgColor}`}>
      <p>Folio: {json.folio}</p>
      <p>Fecha de Emisión: {json.inserted_at}</p>
      <p>
        Dr. {doctor.first_name} {doctor.last_name}
      </p>
      <p>{doctor.speciality}</p>
      <p>código: {json.code}</p>
    </div>
  );
}
```

## Ejecuciones del proyecto

### Ejecutar el unit test

El unit test elegido es la función `testRUT(RUT)` porque considero necesario asegurar que los RUTs de los pacientes sean válidos. Para ejecutarlo, hay que ejecutar el comando `npm test` en un Terminal.

Para ejecutar el unit test, se necesitan los paquetes jest (se instala con el comando `npm install --save-dev jest`) y babel (se instala con el comando `npm install --save-dev babel-jest @babel/preset-env @babel/preset-react`).

### Ejecutar el proyecto

Para ejecutar el proyecto hay que ejecutar el comando `npm run dev` en un Terminal y entonces se abrirá en un puerto local, puede cerrarse pulsando `CTRL+C` en el Terminal.

Para ejecutar el proyecto, se necesita el paquete Tailwind CSS (se instala con los comandos `npm install -D tailwindcss postcss autoprefixer` y `npx tailwindcss init -p`).
