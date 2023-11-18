# RELATIA, DONDE NACEN LAS HISTORIAS!

Relatia es una red social para escritores donde podrás compartir tus relatos o cualquier pensamiento que se te venga a la mente.

Nuestra red social se basa en el sistema de seguimiento, cuantas más personas sigas, más contenido podrás leer.

## Tecnologías y Herramientas
![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge)
![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white&style=for-the-badge)

Contacto
[LinkedIn](https://www.linkedin.com/in/jfernandezfullstack)

Instalación

```bash
# Clona este repositorio
git clone https://github.com/anexions/finalProjectCodespace.git

# Ve al directorio del proyecto
cd relatia 

# Instala las dependencias en el frontend
cd frontend
npm install

# Instala las dependencias en el backend
cd cd..
cd backend
npm install

# Inicia el servidor del frontend y backend en un solo comando y una sola terminal
# Tienes que ejecuar el comando en la carpeta raiz del proyecto.
Usa cd.. hasta volver a la raiz y luego:
npm start
#Para poder ejecutar el proyecto debes tener Mongod corriendo de fondo.

# Opcional, volcar base de datos
Puedes traer el contenido de la base de datos usando este comando (en la carpeta raíz)
Debes tener algunas herramientas de MongoDB instaladas (mongoRestore)

mongorestore --db=nombre_nueva_basedatos ./relatia/database/baseDatosProyectoFinal

Uso

Crea una cuenta en la sección Registro

Loguea y automáticamente entrarás al feed/inicio (no veras historias)

En la sección writers/escritores (si has importado la base de datos) podrás seguir a los usuarios y al volver a inicio podrás leer sus hitorias.
Si no has importado la base de datos, puedes crear dos usuarios y así ves el funcionamiento.

Puedes publicar tus propias historias en la seccion publish/publicar (además de editarlas o borrarlas)

En la seccion usuario/profile podrás cambiar tu imagen y biografía para mostrarla en tu tarjeta de escritor.

Endpoints y funciones

Usuarios (Registrar, loguear, ver perfil, listar, editar, seguir, dejar de seguir, listar seguidores.)

//User register
router.post("/register", userController.register);
//login
router.post("/login", userController.login);
//Profile
router.get("/profile/:id", auth.auth, userController.profile); 
//User list
router.get("/list/:page?", auth.auth, userController.userList); 
//Update user
router.put("/update/", auth.auth, userController.updateUser);
//Save follow
router.post("/save", auth.auth, followController.saveFollow);
//Unfollow user
router.delete("/unfollow/:id", auth.auth, followController.deleteFollow);
//Following
router.get("/following/:id?/:page?", auth.auth, followController.following);

Email (Enviar)

//Send email
router.post('/save-email', saveEmail);

Publicaciones (Crear, editar, eliminar, *Me gusta y no megusta (en proceso))

//Guardar publicaciones
router.post("/save", auth.auth, publicationController.savePublication);
//Mostrar una publicación
router.get("/detail/:id", auth.auth, publicationController.detailPublication);
//Delete publication
router.delete("/delete/:id", auth.auth, publicationController.deletePublication);
//Edit publication
router.put("/edit/:id", auth.auth, publicationController.editPublication);

Licencia
MIT

Agradecimientos
Doy las gracias a Francisco, profesor de Codespace por su apoyo durante el proceso.
