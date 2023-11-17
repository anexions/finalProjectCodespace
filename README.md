<h1> <strong>Bienvenido a mi Proyecto Final en Codespace.</strong> </h1>
<p>Relatia, Donde nacen las historias!<br>
Relatia es una red social para escritores. Crea y comparte relatos con tus seguidores.</p>

<strong> FRONTEND </strong>
<p>Tecnologías Usadas:<br>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React Icon" style="width:40px; height:40px;">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS Icon" style="width:40px; height:40px;">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap Icon" style="width:40px; height:40px;">

<strong>Instalación y Configuración:</strong><br>
    1. <strong>Clona el repositorio </strong> (Traerá la carpeta (RELATIA) con tres en su interior: Frontend, backend y database.<br>
    2. <strong>Debes entrar primero al front</strong> (cd relatia, cd frontend) e instalar todas las dependencias con:<br> npm install<br>
       <strong>Luego entrar al back</strong> (cd relatia, cd backend) e instalar todas las dependencias con:<br> npm install<br>
    3. <strong>Vuelve a la carpeta raíz ejecuta:</strong><br> 
    npm start<br> 
    <strong>(esto arrancará tanto el front como el server node del back) *Mongod debe estar corriendo de fondo*</strong><br>
    4. <strong>Importa la base de datos con el comando:</strong><br>
    mongorestore --db=nombre_nueva_basedatos ./relatia/database/baseDatosProyectoFinal<br> 
    *Cambia nombre_nueva_basedatos por el que tu quieras o dejalo así*<br>
    *Hay que tener instaladas las tools de mongo*<br>
    <strong>El paso 4 no es obligatorio pero si la importas podrás ver los escritores que hay creado de base.</strong>
      
<div class="section">
    Descargar MongoDB (Base de datos):<br>
    <p><a href="https://www.mongodb.com/try/download/community" target="_blank">https://www.mongodb.com/try/download/community</a></p>
  <div>
<div class="section">
    Instalar database tools de mongo:<br>
   <p> <a href="https://www.mongodb.com/try/download/database-tools" target="_blank">https://www.mongodb.com/try/download/database-tools</a></p>
</div>
    <p>Uso de la APP:<br>
    Loguea o registra una cuenta.<br>
    La primera vez que entres no verás usuarios, dirígete a (según el idioma) writer o escritores y comienza a seguirlos.<br>
    Una vez seguidos, podrás comenzar a leer sus historias,<br>
    Publicar una historia: Dirígete a Publicar, rellena los campos y tus historias aparecerán debajo. Puedes editarla, o eliminarlas desde ahí.<br>
    En la sección usuario podrás cambiar tu imagen de perfil que se mostrará a los usuarios, tu nombre o biografía.

    <p>Contribuciones:<br>
    Cualquier contribución o feedback será bienvenido.</p>

    <p>Contacto: <a href="https://www.linkedin.com/in/jfernandezfullstack/" target="_blank">LinkedIn</a></p>
</div>

<div class="section">
    <strong> BACKEND </strong>
    <p>Descripción del Back-End:<br>
    El back proporciona al front una serie de endpoints para poder loguear usuarios, registrarlos, etc. A continuación se muestra en detalle:</p>

    <p><strong> ENDPOINTS Y FUNCIONES </strong><br>
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
