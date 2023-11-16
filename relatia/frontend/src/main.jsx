import ReactDOM from "react-dom/client"; //Importamos ReactDOM para poder renderizar el componente
import App from "./App.jsx"; //Importamos el componente App

//IMPORT BOOTSTRAP-----------------------------
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />


ReactDOM.createRoot(document.getElementById("root")).render(<App />);
