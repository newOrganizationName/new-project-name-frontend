# new-project-name-frontend

## Project Architecture

The project uses **Feature-Sliced Design (FSD)**

### Folder Structure

```
src/
├── app/                    # App Router (Next.js)
│   ├── pages/             # Additional pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
│
├── shared/                # Shared modules (lowest layer)
│   ├── api/              # RTK Query API endpoints
│   ├── config/           # Configuration (store, providers)
│   ├── lib/              # Utilities and helpers
│   ├── types/            # Common TypeScript types
│   └── ui/               # Common UI components (Button, Input)
│
├── entities/             # Business entities
│   └── user/            # Example: User entity
│       ├── model/       # Types, interfaces
│       ├── api/         # API endpoints for User
│       └── ui/          # UserCard, UserAvatar
│
├── features/            # Features
│   └── auth/            # Example: Authentication
│       ├── model/       # Redux slice, types
│       ├── api/         # API endpoints for auth
│       └── ui/          # LoginForm, RegisterForm
│
└── widgets/             # Complex UI components
    └── header/          # Example: Header widget
        └── ui/          # Header component
```

### Import Rules (Dependencies)

```
app → widgets → features → entities → shared
```

**Important:** Each layer can only import from lower layers!

✅ **Allowed:**

- `features/auth` → `entities/user` ✅
- `widgets/header` → `features/auth` ✅
- `app/page` → `widgets/header` ✅

❌ **Forbidden:**

- `shared` → `entities` ❌
- `entities` → `features` ❌
- `features` → `widgets` ❌

## What Goes Where?

### `shared/` — Shared Modules

**What goes here:**

- Utilities and helpers (`formatDate`, `validateEmail`)
- Common UI components (`Button`, `Input`, `Modal`)
- Configuration (`store`, `providers`, `constants`)
- Base API configuration (`baseApi`)
- Common types

**Example:**

```
shared/
├── lib/
│   ├── formatDate.ts
│   └── validateEmail.ts
├── ui/
│   ├── Button.tsx
│   └── Input.tsx
└── api/
    └── baseApi.ts
```

### `entities/` — Business Entities

**What goes here:**

- Business entities of the project (`User`, `Product`, `Order`, `Subject`)
- Data models, types
- API endpoints for a specific entity
- Entity UI components (cards, lists)

**Example:**

```
entities/
└── user/
    ├── model/
    │   └── types.ts          # interface User { id, name, email }
    ├── api/
    │   └── userApi.ts        # getUser, updateUser
    └── ui/
        ├── UserCard.tsx
        └── UserAvatar.tsx
```

**When to create an entity:**

- When there's a business entity with its own data
- When entity logic isolation is needed
- When the entity is used in multiple places

### `features/` — Features

**What goes here:**

- Specific application functions (`auth`, `profile`, `cart`, `search`)
- Redux slices for the feature
- API endpoints for the feature
- Feature UI components (forms, modals)

**Example:**

```
features/
└── auth/
    ├── model/
    │   └── authSlice.ts      # Redux slice for auth
    ├── api/
    │   └── authApi.ts        # login, register, logout
    └── ui/
        ├── LoginForm.tsx
        └── RegisterForm.tsx
```

**When to create a feature:**

- When there's a specific functionality (authentication, search, filtering)
- When own business logic is needed
- When a feature can use multiple entities

### `widgets/` — Complex UI Components

**What goes here:**

- Complex composite components
- Components that combine multiple features/entities
- Page blocks (Header, Footer, Sidebar)

**Example:**

```
widgets/
└── header/
    └── ui/
        └── Header.tsx        # Uses features/auth, entities/user
```

**When to create a widget:**

- When a component combines multiple features
- When it's a complex UI block (Header, Footer, Dashboard)
- When the component is used on different pages

### `app/` — Pages (Next.js App Router)

**What goes here:**

- Application pages (`page.tsx`)
- Layouts (`layout.tsx`)
- Route handlers

**Example:**

```
app/
├── page.tsx                  # Home page
├── layout.tsx                # Root layout
└── profile/
    └── page.tsx              # Profile page
```

## Practical Examples

### Example 1: Creating a User Entity

```typescript
// entities/user/model/types.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

// entities/user/api/userApi.ts
import { baseApi } from "@/shared/api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
    }),
  }),
});

// entities/user/ui/UserCard.tsx
export function UserCard({ user }: { user: User }) {
  return <div>{user.name}</div>;
}
```

### Example 2: Creating an Auth Feature

```typescript
// features/auth/api/authApi.ts
import { baseApi } from "@/shared/api/baseApi";
import type { User } from "@/entities/user/model/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

// features/auth/ui/LoginForm.tsx
("use client");
import { useLoginMutation } from "../api/authApi";

export function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  // ...
}
```

### Example 3: Creating a Header Widget

```typescript
// widgets/header/ui/Header.tsx
"use client";
import { UserCard } from "@/entities/user/ui/UserCard";
import { LoginForm } from "@/features/auth/ui/LoginForm";

export function Header() {
  return (
    <header>
      <UserCard />
      <LoginForm />
    </header>
  );
}
```

## Installation

### 1. Clone the Repository

```bash
git clone git@github.com:new-organization-name/new-project-name-frontend.git
cd new-project-name-frontend
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

### 4. Run the Development Server

```bash
yarn dev
```

### 5. Open in Browser

[http://localhost:3000](http://localhost:3000)

## Available Commands

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
