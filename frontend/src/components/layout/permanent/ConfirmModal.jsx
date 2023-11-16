import React from 'react';
import { useTranslation } from "react-i18next";

const ConfirmModal = ({ isOpen, title, handleConfirm, handleCancel }) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title || t("areYouSure")}</h2>
        <button onClick={handleConfirm}>{t("modalConfirm")}</button>
        <button onClick={handleCancel}>{t("modalCancel")}</button>
      </div>
    </div>
  );
};

export default ConfirmModal;
