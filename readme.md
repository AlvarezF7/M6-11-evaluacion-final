## M6- Evaluación Final Ministerio de Mascotas

## Descripción
Proyecto para el gobierno de Chile que simula un **Ministerio de Mascotas**, donde se pueden registrar mascotas con los datos de su dueño, buscarlas por nombre o RUT, y eliminar registros. Los datos se almacenan en un archivo JSON simulando una base de datos.

## Tecnologías Utilizadas
- Node.js  
- Express  
- HTML  
- CSS  
- JavaScript  
- Almacenamiento: Archivo JSON (simulando base de datos)

## Endpoints API REST

| Método | Ruta           | Descripción                                           |
|--------|----------------|-------------------------------------------------------|
| GET    | /mascotas      | Obtener todas las mascotas                            |
| GET    | /mascotas?nombre= | Obtener mascota por nombre                           |
| GET    | /mascotas?rut= | Obtener todas las mascotas asociadas a un RUT        |
| POST   | /mascotas      | Registrar una nueva mascota con datos del dueño      |
| DELETE | /mascotas?nombre= | Eliminar una mascota por nombre                     |
| DELETE | /mascotas?rut= | Eliminar todas las mascotas asociadas a un RUT       |

## Funcionalidades
- Registrar mascotas con nombre, raza, edad y datos del dueño (nombre, RUT, teléfono).  
- Validar que no se repita el nombre de la mascota ni el teléfono del dueño.  
- Buscar mascotas por nombre o por RUT del dueño.  
- Eliminar registros por nombre de mascota o por RUT del dueño.  
- Mostrar resultados en pantalla en tiempo real.  
- Manejo básico de errores y mensajes al usuario.


## Ejecución del proyecto

1. Instalar dependencias  bsch **npm install**
2. Ejecutar Servidor  **npm start**
3. Abrir Navegador http://localhost:3000.

# Autor
Fernanda Álvarez para curso Fullstack Javascript Sence.