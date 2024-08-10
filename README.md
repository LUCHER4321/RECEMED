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

.
