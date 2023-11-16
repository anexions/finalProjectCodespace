 //FUNCION DE LIKES-----------------------------------------------------------------

  // const likePublication = async (publicationId) => {
  //   setIsButtonClicked(true);
  //   const token = localStorage.getItem("token");
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (!token || !user) {
  //     return;
  //   }
  //   try {
  //     const response = await fetch(
  //       `${globalConfiguration.url}publication/like/${publicationId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token,
  //         },
  //         body: JSON.stringify({
  //           user: user.id,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Error al dar like a la publicación");
  //     }

  //     const data = await response.json();
  //     console.log(data);

  //     // Asegúrate de acceder a la propiedad correcta de la respuesta
  //     const updatedLikes = data.likePublication.like;

  //     // Actualizar el estado de las publicaciones
  //     setPublications((prevPublications) => {
  //       return prevPublications.map((publication) => {
  //         if (publication._id === publicationId) {
  //           // Utilizar el contador de likes actualizado
  //           return { ...publication, like: updatedLikes };
  //         }
  //         return publication;
  //       });
  //     });
  //   } catch (error) {
  //     console.error(error.message);
  //     // Manejar el error, mostrar un mensaje al usuario, etc.
  //   }
  // };