<h1> <strong>Bienvenido a mi Proyecto Final en Codespace.</strong> </h1>
Relatia, Donde nacen las historias!<br>
Relatia es una red social para escritores. Crea y comparte relatos con tus seguidores.</p>

<h2><strong> FRONTEND </strong></h2>
Tecnologías Usadas:<br>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React Icon" style="width:40px; height:40px;">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS Icon" style="width:40px; height:40px;">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap Icon" style="width:40px; height:40px;">

<strong>Instalación y Configuración:</strong><br>
<br>
    1. <strong>Clona el repositorio </strong> (Traerá la carpeta (RELATIA) con tres en su interior: Frontend, backend y database.<br>
    <br>
    2. <strong>Debes entrar primero al front</strong> (cd relatia, cd frontend) e instalar todas las dependencias con:<br> npm install<br>
       <strong>Luego entrar al back</strong> (cd relatia, cd backend) e instalar todas las dependencias con:<br> npm install<br>
       <br>
    3. <strong>Vuelve a la carpeta raíz ejecuta:</strong><br> 
    npm start<br> 
    <strong>(esto arrancará tanto el front como el server node del back) *Mongod debe estar corriendo de fondo*</strong><br>
    <br>
    4. <strong>Importa la base de datos con el comando:</strong><br>
    mongorestore --db=nombre_nueva_basedatos ./relatia/database/baseDatosProyectoFinal<br> 
    *Cambia nombre_nueva_basedatos por el que tu quieras o dejalo así*<br>
    *Hay que tener instaladas las tools de mongo*<br>
    <strong>El paso 4 no es obligatorio pero si la importas podrás ver los escritores que hay creado de base.</strong>
      
    Descargar MongoDB (Base de datos):<br>
    <a href="https://www.mongodb.com/try/download/community" target="_blank">https://www.mongodb.com/try/download/community</a></p>

    Instalar database tools de mongo:<br>
    <a href="https://www.mongodb.com/try/download/database-tools" target="_blank">https://www.mongodb.com/try/download/database-tools</a></p>

    Uso de la APP:<br>
    <br>
    Registra una cuenta y luego loguéate con ella.<br>
  <img src=https://github.com/anexions/finalProjectCodespace/assets/135029821/1d17dd2f-d7b3-406f-9af6-133537c12572) />
    La primera vez que entres, no verás publicaciones. Debes dirigirte a la sección de escritores ( y si has importado la base de datos podrás ver a otros escritores para seguirlos)
   <img src=https://github.com/anexions/finalProjectCodespace/assets/135029821/e5081322-4d86-428a-bce5-1d663b8621b8)/>
    <img src=https://github.com/anexions/finalProjectCodespace/assets/135029821/6af96900-041d-4cca-9fe5-39a5f40334f5)/>
    Una vez los sigas, podrás leer sus historias en el feed.
    <img src=https://github.com/anexions/finalProjectCodespace/assets/135029821/43cc41ff-d1e1-439b-b8c4-bbdd94978a4f)/>

<br>
    <strong>PUBLICAR UNA HISTORIA</strong><br>
    Dirigete a la seccion Publicar y rellena los campos del formulario. Tus historias aparecerán debajo donde podrás editarlas o eliminarlas.
    <img src=https://github.com/anexions/finalProjectCodespace/assets/135029821/40a6e7ac-3c7f-4ac7-a73b-71fcc1ba8d01)/>
    Una vez las publiques, tus seguidores podrán leerla.<br>
<br>
    <strong>CAMBIAR DATOS DE USUARIO</strong><br>
    En la sección usuario podrás cambiar la imagen de perfil y la bio que se mostrará en tu tarjeta de escritor a otros usuarios.
    <img src=https://github.com/anexions/finalProjectCodespace/assets/135029821/7af74830-a275-49e5-9bb9-843a291d5770)/>

    <strong>Contribuciones:</strong><br>
    Cualquier contribución o feedback será bienvenido.</p><br>
<br>
   <strong> Contacto:</strong> <br>
   <a href="https://www.linkedin.com/in/jfernandezfullstack/" target="_blank">LinkedIn</a></p>

   <h2> <strong> BACKEND </strong></h2>
    Descripción del Back-End:<br>
    El back proporciona al front una serie de endpoints para poder loguear usuarios, registrarlos, etc. A continuación se muestra en detalle:</p>

    <strong> ENDPOINTS Y FUNCIONES </strong><br>
    Usuarios: Registrar, loguear, ver perfil, listar usuarios, actualizar, seguir, dejar de seguir, mostrar lista de seguidores.<br>
    //User register<br>
    router.post("/register", userController.register);<br>
    //login<br>
    router.post("/login", userController.login);<br>
    //Profile<br>
    router.get("/profile/:id", auth.auth, userController.profile); //:id is a parameter for url (need the token as well to access)<br>
    //User list<br>
    router.get("/list/:page?", auth.auth, userController.userList); //? means optional parameter, if not, page=1<br>
    //Update user<br>
    router.put("/update/", auth.auth, userController.updateUser);<br>
    //Save follow<br>
    router.post("/save", auth.auth, follow

router.post("/save", auth.auth, followController.saveFollow);
//Unfollow user
router.delete("/unfollow/:id", auth.auth, followController.deleteFollow);
//Following
router.get("/following/:id?/:page?", auth.auth, followController.following);
//Guardar publicaciones
router.post("/save", auth.auth, publicationController.savePublication);
//Mostrar una publicación
router.get("/detail/:id", auth.auth, publicationController.detailPublication);
//Delete publication
router.delete("/delete/:id", auth.auth, publicationController.deletePublication);
//Edit publication
router.put("/edit/:id", auth.auth, publicationController.editPublication);

Emails: Guardamos un registro de los emails recibidos.
router.post('/save-email', saveEmail);

Publicaciones: Crear, editar o eliminar.

Tecnologías y Herramientas: Lista las tecnologías, lenguajes de programación, bases de datos y herramientas utilizadas en el back-end.

Instalación y Configuración del Servidor: Detalla los pasos para configurar el entorno del servidor, incluyendo la instalación de dependencias y la configuración de bases de datos.

APIs y Endpoints: Si tu back-end expone APIs, documenta los endpoints disponibles, métodos HTTP, parámetros esperados y formatos de respuesta.

Seguridad y Autenticación: Proporciona información sobre las medidas de seguridad implementadas, como autenticación y autorización.

Testing: Explica cómo realizar pruebas en el back-end, incluyendo cualquier framework o herramienta de prueba utilizada.

Despliegue: 

General
Licencia: MIT

Agradecimientos: 
Agradezco la ayuda de Codespace y del profesor Francisco por el apoyo recibido.
