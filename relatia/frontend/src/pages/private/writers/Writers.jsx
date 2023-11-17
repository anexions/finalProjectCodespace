import { WriterCard } from "../../../components/writerCard/WriterCard"; //Importamos el componente WriterCard
import { useTranslation } from "react-i18next"; //Funcion para las traducciones
import "./writers.css"; //Estilos de la página
import "../../../components/modals/modal.css"; //Estilos del modal

const Writers = () => {
  const { t } = useTranslation(); //Llamada a la función para las traducciones, siempre que usemos t() se traducirá lo que haya dentro

  return (
    <div className="writer-container">
      <h1 className="writer-tittle">{t("writerTittle")}</h1>
      <h2 className="writer-subTittle">{t("writerSubTittle")}</h2>

      <div className="writer-container">
        <WriterCard />
      </div>
    </div>
  );
};

export default Writers;

//En vez de cargar el contenido de la página aquí, lo cargamos en WriterCard.jsx
