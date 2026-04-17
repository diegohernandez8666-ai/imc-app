#  Proyecto IMC App
(Reporte en carpeta de frontend)

##  Descripción

Aplicación web para calcular el Índice de Masa Corporal (IMC) con sistema básico de autenticación.

---

##  Tecnologías utilizadas

* React (Frontend)
* Node.js + Express (Backend)
* Axios

---

##  Instalación y ejecución local

###  Backend

```bash
cd backend
npm install
node server.js
```

Servidor:

```
http://localhost:3001
```

---

###  Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación:

```
http://localhost:5173
```

---

##  Guía de despliegue

###  Backend (Render / Railway)

1. Crear cuenta en plataforma (Render o Railway)
2. Subir repositorio de GitHub
3. Configurar:

   * Root: `/backend`
   * Start command:

     ```
     node server.js
     ```
   * Puerto:

     ```
     3001
     ```

---

###  Frontend (Vercel / Netlify)

1. Conectar repositorio
2. Configurar:

   * Root: `/frontend`
   * Build command:

     ```
     npm run build
     ```
   * Output:

     ```
     dist
     ```

---

###  IMPORTANTE

Cambiar la URL del backend en el frontend:

```javascript
http://localhost:3001
```

por la URL desplegada (ejemplo):

```javascript
https://tu-backend.onrender.com
```

---

##  Funcionalidades actuales

* Registro de usuario (básico)
* Login funcional
* Formulario de peso y estatura
* Conexión frontend-backend

---

##  Funcionalidades pendientes

* Base de datos real
* Cálculo de IMC automático
* Mostrar resultado
* Recomendaciones personalizadas
* Manejo de sesión (JWT)
* Mejoras visuales

---

##  Autor

Proyecto académico
