import Routing from "./router/Routing"; //Importamos el archivo de rutas
import { useTranslation } from "react-i18next"; //Importamos la función para las traducciones
import "../src/helpers/languages/i118n"; //Importamos el archivo de traducciones

function App() {
  const { t } = useTranslation(); //Llamada a la función para las traducciones, siempre que usemos t() se traducirá lo que haya dentro
  //Al colocarlo aquí, nos aseguramos de que se cargue en toda la aplicación.

  return (
    <div>
      <Routing /> {/* Llamamos al componente de rutas */}
    </div>
  );
}

export default App;
