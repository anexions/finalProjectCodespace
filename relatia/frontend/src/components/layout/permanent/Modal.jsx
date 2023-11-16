import "./modal.css"; //Estilos del modal

const Modal = ({ isOpen, closeModal, children }) => {
  //isOpen es un booleano que indica si el modal está abierto o no, closeModal es la función que cierra el modal
  //y children es el contenido del modal (children ya viene definido por react) Childre se define en el componente donde se llama al modal.
  if (!isOpen) return null; //Solo se abrirá si isOpen es true
 

  return (
    <div className="modal-overlay">
      <div className="modal-container" role="dialog" aria-modal="true">
        <button
          className="modal-close-btn"
          onClick={closeModal}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 
            0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 
            0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
