# Flux Media (React + TypeScript + Vite)

## 🚀 Ver el proyecto en [Live](https://flux-media-front.vercel.app/)

Este proyecto ha sido desplegado utilizando [Vercel](https://vercel.com/).

Para más información sobre cómo desplegar aplicaciones en Vercel, consulta su [documentación oficial](https://vercel.com/docs).

# Servicio API

El proyecto esta conectado a la api [Flux Media](flux-media-api-production.up.railway.app) desplegado con [Railway](https://railway.app/)

Repositorio: [ds-flux-media-service](https://github.com/AlexanderUzco/ds-flux-media-service)

Postman Collection: [flux-media-collection](https://www.postman.com/red-equinox-473577/workspace/flux-media-service/collection/25671998-0c950769-a35f-46aa-a82c-61ede40c1b36)

# Configuración del Cliente Frontend

Este proyecto utiliza variables de entorno para la configuración del cliente frontend. Antes de ejecutar la aplicación, **asegúrate de configurar las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto**.

## Variables de Entorno

- `VITE_FLUX_MEDIA_SERVICE_URL`: URL del servicio Flux Media.

- Variables de Configuración de Firebase:

  - `VITE_FIREBASE_API_KEY`: Clave API de Firebase.
  - `VITE_FIREBASE_AUTH_DOMAIN`: Dominio de autenticación de Firebase.
  - `VITE_FIREBASE_PROJECT_ID`: ID del proyecto de Firebase.
  - `VITE_FIREBASE_STORAGE_BUCKET`: Bucket de almacenamiento de Firebase.
  - `VITE_FIREBASE_MESSAGING_SENDER`: Identificador de remitente de Firebase.
  - `VITE_FIREBASE_APP_ID`: ID de la aplicación de Firebase.
  - `VITE_FIREBASE_MEASUREMENT_ID`: ID de medición de Firebase.

## Configuración de Firebase

Para utilizar las funciones de Firebase en el cliente frontend, necesitarás configurar un proyecto en Firebase y obtener las credenciales correspondientes. Puedes encontrar más información sobre cómo configurar Firebase en la [documentación oficial de Firebase](https://firebase.google.com/docs/web/setup).

Asegúrate de que las variables de entorno de Firebase coincidan con la configuración de tu proyecto en Firebase para garantizar el correcto funcionamiento de la integración con Firebase en el cliente frontend.

¡Listo! Con estas variables de entorno configuradas, estás preparado para ejecutar y trabajar con el cliente frontend de tu aplicación.
