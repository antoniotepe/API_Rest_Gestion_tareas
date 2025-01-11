# API REST: Gestión de Tareas

Este proyecto es una API REST para la gestión de tareas personales, que incluye autenticación de usuarios mediante JWT y CRUD de tareas. Ideal para aprender o integrar una solución backend con Node.js.

## 📋 Características

- Autenticación de usuarios con JSON Web Tokens (JWT).
- CRUD de tareas asociadas a cada usuario.
- Uso de MySQL como base de datos.
- Código modular siguiendo buenas prácticas.

---

## 🚀 Requisitos

- Node.js (versión 16 o superior).
- MySQL (configurado con las credenciales necesarias).
- npm o yarn.

---

## ⚙️ Instalación

1. Clona este repositorio:
   ```bash
   git clone git@github.com:antoniotepe/API_Rest_Gestion_tareas.git
   cd API_Rest_Gestion_tareas

2. Instalación de dependencias
    ```bash
    npm install

3. Configura el archivo .env
    ```bash
    DB_HOST=localhost
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_base_de_datos
    JWT_SECRET=clave_secreta
    PORT=5000

4. Configura tu base de datos (en este caso se uso mysql)

5. Inicia el servidor
    ```bash
    npm run dev
    o
    npm start

6. 🛠️ Ejecución
    El servidor estará disponible en http://localhost:6500.

7. Rutas y Funcionalidades
    POST /api/auth/register
    Descripción: Registra un nuevo usuario.
    Requiere:
        email: Correo electrónico único.
        password: Contraseña segura.
        nombre: Nombre completo del usuario.
        Retorna: Token JWT.
        Ejemplo de Uso:
            {
                "email": "usuario@email.com",
                "password": "Password123",
                "nombre": "Juan Pérez"
            }


    POST /api/auth/login
    Descripción: Inicia sesión de usuario.
    Requiere:
        email: Correo electrónico.
        password: Contraseña.
        Retorna: Token JWT.
        Ejemplo de Uso:
            {
                "email": "usuario@email.com",
                "password": "Password123"
            }

8. Rutas de Tareas
    Nota: Todas las rutas de tareas requieren un token JWT en el header:
        Authorization: Bearer {token}
        
        GET /api/tareas
            Descripción: Obtiene todas las tareas del usuario autenticado.
            Retorna: Lista de tareas.
        POST /api/tareas
            Descripción: Crea una nueva tarea.
            Requiere:
            titulo: Título de la tarea.
            descripcion: Descripción de la tarea.
            estado (opcional): Estado de la tarea (pendiente, en_progreso, completada).
            Ejemplo de Uso:
                {
                    "titulo": "Completar proyecto",
                    "descripcion": "Terminar el backend del proyecto",
                    "estado": "pendiente"
                }

        PUT /api/tareas/:id
            Descripción: Actualiza una tarea existente.
            Requiere:
            titulo: Nuevo título.
            descripcion: Nueva descripción.
            estado: Nuevo estado.
            Ejemplo de uso:
                {
                    "titulo": "Completar proyecto",
                    "descripcion": "Terminar el backend del proyecto",
                    "estado": "en_progreso"
                }

        DELETE /api/tareas/:id
            Descripción: Elimina una tarea específica.
            No requiere body.


    💻 Tecnologías Utilizadas
    Backend: Node.js con Express.
    Autenticación: JWT.
    Base de Datos: MySQL.
    Pruebas: Insomnia para testear las rutas.

    🤝 Contribuciones
    ¡Las contribuciones son bienvenidas! Por favor, abre un issue o envía un pull request.

    📜 Licencia
    Este proyecto está bajo la Licencia MIT.


