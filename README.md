# Focus Task - Task Manager

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![i18n](https://img.shields.io/badge/Localization-PT%20%7C%20EN%20%7C%20FR-blue)

---

## Key Features

- **Secure Authentication:** User login and registration handled via Supabase Auth.
- **Full CRUD Management:** Create, read, update, and delete tasks with real-time persistence.
- **Smart Views:**
  - **My Day:** A central hub for all your current tasks.
  - **Important:** Dynamic filtering for starred/high-priority items.
  - **Completed:** A dedicated archive for finished goals.
  - **Planned (Calendar):** A large-scale monthly grid to visualize deadlines and schedules.
- **Multilingual Support (i18n):** Full localization for **Portuguese, English, and French**.

---

## Technology Stack

### **Frontend**

- **React + TypeScript:** For robust, type-safe UI development.
- **Vite:** To build tool and dev server.
- **React Router Dom:** Manages protected routes and navigation.
- **Lucide React:** Minimalist and consistent iconography.
- **i18next:** Framework for seamless language switching.
- **date-fns:** Advanced date manipulation for the calendar system.

### **Backend (BaaS)**

- **Supabase:**
  - **PostgreSQL:** Relational database for task storage.
  - **Row Level Security (RLS):** Ensures data isolation so users only see their own tasks.
  - **Auth:** Secure session management and JWT handling.

---

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/focus-task.git](https://github.com/your-username/focus-task.git)
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add your Supabase credentials:

    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Launch the app:**
    ```bash
    npm run dev
    ```

---

## Project Structure

```text
src/
├── components/     # UI components (CalendarView, CreateTask, Modals)
├── hooks/          # Custom hooks (useAuth, useTodos)
├── pages/          # Main views (Login, Register, Dashboard)
├── services/       # Supabase client and API logic
├── i18n.ts         # Internationalization setup (PT/EN/FR)
└── App.tsx         # Route definitions and layout
```
