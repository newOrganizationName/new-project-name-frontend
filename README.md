# new-project-name-frontend

## 🧱 Project Architecture

This project uses a modern, production-ready architecture based on:

- **Next.js App Router (15.x)**
- **Feature-Sliced Design (FSD) — lightweight adaptation**
- **React Query** for server state management
- **Zustand** for client/global UI and auth state
- **MUI Joy** as the component/UI framework
- **Supabase client (optional)** for future integrations

Architecture is intentionally designed so it can evolve into a large-scale project without rewrites.

---

## 📁 Folder Structure

```
src/
├── app/                     # Next.js App Router pages & layouts
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── sign-up/
│   │   └── page.tsx
│   └── subjects/[subject]/
│       └── page.tsx
│
├── shared/                  # Lowest-level reusable code
│   ├── api/                 # Fetch wrapper (apiClient)
│   ├── config/              # Constants, environment config
│   ├── lib/                 # Utilities (tokenStorage, error helpers)
│   ├── providers/           # QueryProvider, ThemeRegistry, AuthInitializer
│   ├── store/               # Zustand stores (auth, UI)
│   ├── types/               # Global TS types
│   └── ui/                  # Shared UI primitives (Toaster, etc.)
│
├── entities/                # Business-level entities
│   ├── teacher/             # Example domain entity
│   │   ├── ui/              # TeacherCard, TeacherList
│   │   └── index.ts
│   └── user/
│       └── model/           # User types
│
├── features/                # Functional modules (auth, search, etc.)
│   └── auth/
│       ├── api/             # loginAction, signupAction, logoutAction, meQuery
│       ├── lib/             # validation helpers
│       ├── model/           # React Query hooks (useLogin, useSignup, useLogout, useMe)
│       └── ui/              # LoginForm, SignUpForm, ProtectedRoute, layouts
│
└── widgets/                 # UI blocks composed of multiple features/entities
    ├── header/
    └── footer/
```

---

## 🔗 Import Layer Rules (FSD)

```
app → widgets → features → entities → shared
```

### ✔️ Allowed
- `features/auth` → `entities/user`
- `widgets/header` → `features/auth`
- `app/page.tsx` → `widgets/header`

### ❌ Forbidden
- `shared` → `entities`
- `entities` → `features`
- `features` → `widgets`

---

## 🧠 Layer Responsibilities

### `shared/` — Foundation Layer
Contains reusable code with **no business logic**.

Use it for:

- Utilities (`tokenStorage`, `errorMessages`)
- API client wrapper (`apiClient`)
- Providers (`QueryProvider`, `ThemeRegistry`)
- Zustand stores (`useAuthStore`, `useUiStore`)
- Shared UI parts (`Toaster`)
- Global constants

> This layer must not depend on any entities, features, or widgets.

---

### `entities/` — Business entities

Each entity represents a domain model (Teacher, User, Subject).

Contains:

- Types/models
- Small UI components (cards, lists)
- Future: entity-level mapping or formatting helpers

Use when multiple features rely on the same domain object.

---

### `features/` — Functional modules

Each feature contains:

- API actions and React Query requests  
- Business logic hooks  
- Validation  
- Feature-specific UI (forms, modals)

Example: `auth`:

```
features/auth/
├── api/        # loginAction, logoutAction, meQuery
├── model/      # useLogin, useSignup, useLogout, useMe
├── ui/         # LoginForm, SignUpForm, AuthFormLayout
└── lib/        # validation helpers
```

---

### `widgets/` — UI Blocks

Structure:

- Combine features + entities
- Used on multiple pages (Header, Footer, Dashboard sections)

Example: `Header` may include:

- User info
- Auth navigation
- UI store state (sidebar toggle)

---

### `app/` — Routing Layer (Next.js App Router)

Contains:

- Pages (`page.tsx`)
- Layouts
- Server/Client components
- Metadata
- Route segments

This layer orchestrates which widgets/features/entities are visible.

---

## 🔌 API Layer (shared/api)

The project uses a clean fetch wrapper:

```ts
apiClient.get('/auth/me');
apiClient.post('/auth/login', body);
```

- Automatically attaches `credentials: "include"`
- Handles JSON parsing
- Throws normalized errors with `status` and `data`

---

## 🔒 Authentication Architecture

### Current (temporary):
- Access token stored in `localStorage`
- Refresh token returned by backend in future (HTTP-only cookie)
- Zustand manages:
  - `user`
  - `isAuthenticated`
  - `loading`

### Near-future (final goal):
- Access tokens NOT stored on client
- Refresh tokens via secure cookies
- SSR compatibility with Next.js

The whole architecture is already prepared for switching to cookie-based auth.

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone git@github.com:new-organization-name/new-project-name-frontend.git
cd new-project-name-frontend
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Create `.env.local`

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 4. Start development server

```bash
yarn dev
```

### 5. Open app

```
http://localhost:3000
```

---

## 📦 Available Commands

| Command         | Description                     |
|-----------------|---------------------------------|
| `yarn dev`      | Start dev server                |
| `yarn build`    | Build production bundle         |
| `yarn start`    | Run production server           |
| `yarn lint`     | Run ESLint checks               |

