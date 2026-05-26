# equipo2-todo-front-web

Frontend web de EduTask — aplicación de gestión de tareas académicas.  
Construido con React 19 + TypeScript + Vite + Firebase Auth + Axios.

---

## Requisitos previos

- Node.js 18+
- Yarn (`npm install -g yarn`)
- Backend corriendo en `http://localhost:8081` (equipo2-todo-back)

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto copiando `.env.example`:

```bash
cp .env.example .env
```

Luego completa con los valores de tu proyecto Firebase:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_API_URL=http://localhost:8080
```

> Los valores de Firebase son los mismos que usa la app mobile (equipo2-todo-front-mobile).

---

## Instalación y ejecución

```bash
# Instalar dependencias
yarn install

# Iniciar servidor de desarrollo (http://localhost:5173)
yarn start
# o equivalente:
yarn dev

# Build para producción
yarn build

# Preview del build
yarn preview
```

---

## Storybook

```bash
# Iniciar Storybook (http://localhost:6006)
yarn storybook

# Generar build estático de Storybook
yarn build-storybook
```

Componentes documentados en Storybook:
- `Avatar` — avatar circular con iniciales
- `Tag` — badge de prioridad (low/medium/high)
- `ProgressBar` — barra de progreso
- `TaskCard` — tarjeta de tarea con acciones
- `StudyListCard` — tarjeta de lista de tareas

---

## Estructura del proyecto

```
src/
├── components/         # Componentes reutilizables
│   ├── Avatar/
│   ├── CreateNewTaskFrom/
│   ├── DueTodayCard/
│   ├── Modal/
│   ├── Navbar/         # Con dropdown de usuario y logout
│   ├── ProgressBar/
│   ├── SearchBar/
│   ├── SearchResultItem/
│   ├── StudyListCard/
│   ├── Tag/
│   └── TaskCard/
├── contexts/
│   └── AuthContext.tsx  # Estado de autenticación Firebase
├── pages/
│   ├── About/           # Perfil de usuario + logout
│   ├── Home/            # Dashboard con listas (conectado al API)
│   ├── Login/           # Login con Firebase
│   ├── Register/        # Registro (llama al backend)
│   ├── Search/          # Búsqueda global (conectado al API)
│   └── Tasks/           # Detalle de lista con tareas (conectado al API)
├── router/
│   └── AppRouter.tsx    # Rutas protegidas y públicas
├── services/
│   ├── api.ts           # Cliente axios con interceptor de token
│   ├── auth/
│   │   ├── auth.ts      # Instancia de Firebase Auth
│   │   ├── authService.ts  # login / register / logout
│   │   └── firebase.ts  # Inicialización de Firebase
│   ├── listPreferences.ts  # Colores de listas en localStorage
│   └── todoService.ts   # Llamadas al API REST
└── types.ts             # Tipos TypeScript (API + UI)
```

---

## Flujo de autenticación

1. Usuario no autenticado → redirige a `/login`
2. Login con email/password → Firebase autentica → token guardado en `localStorage`
3. Cada request al backend incluye `Authorization: Bearer <token>`
4. Si el backend responde 401 → redirige a `/login`
5. Logout → limpia Firebase session + `localStorage`

---

## Rutas

| Ruta | Descripción | Auth |
|------|-------------|------|
| `/login` | Iniciar sesión | Pública |
| `/register` | Crear cuenta | Pública |
| `/` | Dashboard con listas | Privada |
| `/tasks/:id` | Detalle de una lista | Privada |
| `/search` | Búsqueda global | Privada |
| `/about` | Perfil y cerrar sesión | Privada |

---

## Usuarios de prueba

| Email | Contraseña | Descripción |
|-------|-----------|-------------|
| `test@example.com` | `Test1234!` | Usuario de prueba general |

> Crea el usuario desde la pantalla de Registro, o con `POST /users` en el backend.

---

## Notas

- El backend debe estar corriendo antes de iniciar la app.
- Los valores de Firebase son los mismos que usa la app mobile.