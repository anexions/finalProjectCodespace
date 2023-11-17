import React from "react";
import { useTranslation } from "react-i18next";
import "./modal.css";

const ConfirmModal = ({ isOpen, title, handleConfirm, handleCancel }) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{title}</h2>
        <div className="container-btn">
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

export default ConfirmModal;
