#  Reporte del Proyecto IMC App

##  Introducción

El presente proyecto consiste en el desarrollo de una aplicación web que permite calcular el Índice de Masa Corporal (IMC) de un usuario, así como gestionar un sistema básico de autenticación.

---

##  Objetivo

Desarrollar una aplicación funcional que integre frontend y backend para el cálculo del IMC y futura recomendación de ejercicios.

---

##  Desarrollo

###  Frontend

Se utilizó React para crear la interfaz de usuario, incluyendo:

* Pantalla de login
* Formulario para ingresar peso y estatura

###  Backend

Se implementó un servidor con Node.js y Express:

* Endpoint de login (`/api/auth/login`)
* Configuración de CORS
* Manejo de datos en formato JSON

---

##  Integración

Se utilizó Axios para la comunicación entre frontend y backend mediante peticiones HTTP.

---

##  Resultados

* Se logró implementar un sistema funcional de login
* Se estableció comunicación entre cliente y servidor
* Se desarrolló la base del formulario de cálculo de IMC

---

##  Limitaciones

* No se implementó base de datos
* El sistema de autenticación es básico
* No se calcula aún el IMC automáticamente

---

##  Trabajo futuro

* Integración con base de datos (MongoDB o MySQL)
* Implementación de JWT para autenticación
* Cálculo automático del IMC
* Generación de recomendaciones de ejercicio
* Mejoras en la interfaz gráfica

---

##  Conclusión

El proyecto cumple con los objetivos iniciales al demostrar la integración entre frontend y backend, dejando una base sólida para futuras mejoras.
