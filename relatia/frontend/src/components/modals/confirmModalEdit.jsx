import { useTranslation } from "react-i18next";
import "../permanent/modal.css";

const ConfirmModalEdit = ({ isOpen, title, handleConfirm, handleCancel }) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="container-btn">
          <h2>{title}</h2>
          <button className="modal-button" onClick={handleConfirm}>
            {t("modalConfirm")}
          </button>
          <button className="modal-button" onClick={handleCancel}>
            {t("modalCancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModalEdit;
