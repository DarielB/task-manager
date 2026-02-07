import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTodos } from "../../hooks/useTodos";
import type { Todo } from "../../services/todos";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CreateTaskCard } from "../../components/CreateTaskCard/CreateTaskCard";
import { EditTaskModal } from "../../components/EditTaskModal/EditTaskModal";
import { CalendarView } from "../../components/CalendarView/CalendarView";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  LogOut,
  CheckCircle2,
  Circle,
  Calendar as CalendarIcon,
  Star,
  Layout,
  Search,
  Trash2,
  Clock,
  Edit3,
  Languages,
} from "lucide-react";
import "./Dashboard.css";

export default function Dashboard({ mode = "all" }) {
  const { user, signOut } = useAuth();
  const { t, i18n } = useTranslation();
  const {
    todos,
    loading,
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo,
    favoriteToggleTodo,
  } = useTodos();

  const [search, setSearch] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const navigate = useNavigate();

  const isPlannedMode = mode === "planned";

  const toggleLanguage = () => {
    const langs = ["pt", "en", "fr"];
    const currentIndex = langs.indexOf(i18n.language.split("-")[0]);
    const nextIndex = (currentIndex + 1) % langs.length;
    i18n.changeLanguage(langs[nextIndex]);
  };

  const filteredTodos = todos.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    if (mode === "important") return matchesSearch && task.favorite;
    if (mode === "completed") return matchesSearch && task.completed;
    if (mode === "planned") return matchesSearch && task.deadline;
    return matchesSearch;
  });

  async function handleUpdateTodo(id: string, updates: Partial<Todo>) {
    try {
      if (updateTodo) await updateTodo(id, updates);
      setEditingTodo(null);
    } catch (err) {
      console.error("Erro ao atualizar:", err);
    }
  }

  return (
    <div className="todo-container">
      {/* Sidebar */}
      <aside className="todo-sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <CheckCircle2 size={24} color="#fff" />
          </div>
          <span>Focus Task</span>
        </div>

        <nav className="todo-nav">
          <button
            className={`nav-btn ${mode === "all" ? "active" : ""}`}
            onClick={() => navigate("/")}
          >
            <Layout size={20} /> {t("my_day")}
          </button>
          <button
            className={`nav-btn ${mode === "important" ? "active" : ""}`}
            onClick={() => navigate("/important")}
          >
            <Star size={20} /> {t("important")}
          </button>
          <button
            className={`nav-btn ${mode === "planned" ? "active" : ""}`}
            onClick={() => navigate("/planned")}
          >
            <CalendarIcon size={20} /> {t("planned")}
          </button>
          <button
            className={`nav-btn ${mode === "completed" ? "active" : ""}`}
            onClick={() => navigate("/completed")}
          >
            <CheckCircle2 size={20} /> {t("completed")}
          </button>
        </nav>

        {/* Seletor de Idioma */}
        <div className="language-section">
          <button onClick={toggleLanguage} className="lang-toggle-btn">
            <Languages size={16} />
            <span>
              {i18n.language.startsWith("pt")
                ? "Português"
                : i18n.language.startsWith("en")
                  ? "English"
                  : "Français"}
            </span>
          </button>
        </div>

        <div className="user-section">
          <p className="user-email">{user?.email}</p>
          <button className="logout-action" onClick={signOut}>
            <LogOut size={16} /> {t("logout") || "Sair"}
          </button>
        </div>
      </aside>

      {/* Área Principal */}
      <main className="todo-main">
        <header className="todo-header">
          <div className="header-info">
            <h1>
              {mode === "important"
                ? t("important")
                : mode === "completed"
                  ? t("completed")
                  : mode === "planned"
                    ? t("planned")
                    : t("my_day")}
            </h1>
            <p>
              {format(new Date(), "eeee, d 'de' MMMM", {
                locale: i18n.language === "pt" ? ptBR : undefined,
              })}
            </p>
          </div>
          <div className="search-container">
            <div className="search-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder={t("search")}
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        <section className="todo-content">
          {isPlannedMode ? (
            <CalendarView
              todos={todos}
              onEditTask={(task) => setEditingTodo(task)}
            />
          ) : (
            <>
              <CreateTaskCard onAdd={addTodo} />

              {loading && (
                <div className="loading-state">
                  {t("loading") || "Carregando..."}
                </div>
              )}

              <div className="task-list">
                {filteredTodos.map((task) => (
                  <div
                    key={task.id}
                    className={`task-item ${task.completed ? "completed" : ""}`}
                  >
                    <button
                      className="check-btn"
                      onClick={() => toggleTodo(task)}
                    >
                      {task.completed ? (
                        <CheckCircle2 size={22} color="#10b981" />
                      ) : (
                        <Circle size={22} />
                      )}
                    </button>

                    <div
                      className="task-body"
                      onClick={() => setEditingTodo(task)}
                    >
                      <span className="task-text">{task.title}</span>
                      {task.description && (
                        <p className="task-description-preview">
                          {task.description}
                        </p>
                      )}

                      <div className="task-meta">
                        {task.deadline ? (
                          <>
                            <CalendarIcon size={12} />
                            <span>
                              {format(
                                typeof task.deadline === "string"
                                  ? parseISO(task.deadline)
                                  : task.deadline,
                                "dd 'de' MMM",
                                {
                                  locale:
                                    i18n.language === "pt" ? ptBR : undefined,
                                },
                              )}
                            </span>
                          </>
                        ) : (
                          <>
                            <Clock size={12} />{" "}
                            <span>{t("today") || "Hoje"}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="task-actions">
                      <Edit3
                        size={18}
                        className="edit-icon"
                        onClick={() => setEditingTodo(task)}
                      />
                      <Star
                        size={18}
                        onClick={() => favoriteToggleTodo(task)}
                        className={task.favorite ? "star-active" : "star-icon"}
                      />
                      <Trash2
                        size={18}
                        className="delete-icon"
                        onClick={() => removeTodo(task.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      {editingTodo && (
        <EditTaskModal
          todo={editingTodo}
          onClose={() => setEditingTodo(null)}
          onSave={handleUpdateTodo}
        />
      )}
    </div>
  );
}
