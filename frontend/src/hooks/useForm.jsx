//Los custom hooks son una característica de React que permite encapsular lógica con estado y efectos secundarios para poder reutilizarla en diferentes componentes.

import { useState } from "react";

export const useForm = (initialObject = {}) => {
  //Creamos un objeto vacío por defecto que luego se rellenará con los datos del formulario

  const [form, setForm] = useState(initialObject); //Creamos un estado para el formulario.

  const changed = ({ target }) => {
    //Función que recoger (a través de onChange) los datos del formulario y los guarda en el estado (form
    const { name, value } = target; //Recogemos el nombre y el valor del input (target) (con desestructuración)
    setForm({
      //Guardamos los datos en el estado (form)
      ...form, //Mantenemos los datos que ya estaban en los otros campos y vamos añadiendo (form)
      [name]: value, //Añadimos los nuevos datos (name y value) al estado (form)
    });
  };

  // Función para resetear el formulario
  const resetForm = () => {
    setForm(initialObject); //Cambiamos la variable form por el objeto inicial vacío del principio.
  };

  // Función para reocger los datos del formulario de manera global (con change es individual)
  const setValues = (newValues) => {
    setForm(newValues); //Si quisieramos editar el formulario, recogeríamos los datos del formulario y los guardaríamos en el estado (form)
  };

  return {
    //Todo lo que devuelva el hook lo podemos usar en el componente que lo importe
    form,
    changed,
    resetForm,
    setValues,
  };
};

export default useForm;
