import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo as updateTodoService,
  deleteTodo,
  type Todo,
} from "../services/todos";
import { useAuth } from "./useAuth";

export function useTodos() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTodos() {
    if (!user) return;

    try {
      const data = await getTodos();
      setTodos(data);
    } finally {
      setLoading(false);
    }
  }

  async function addTodo(
    title: string,
    description: string,
    deadline: Date | null,
  ) {
    if (!user) return;

    await createTodo(title, user.id, description, deadline);
    await loadTodos();
  }

  async function toggleTodo(todo: Todo) {
    await updateTodo(todo.id, {
      completed: !todo.completed,
    });
    await loadTodos();
  }

  async function favoriteToggleTodo(todo: Todo) {
    await updateTodo(todo.id, {
      favorite: !todo.favorite,
    });
    await loadTodos();
  }

  async function removeTodo(id: string) {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }
  async function updateTodo(
    id: string,
    updates: Partial<
      Pick<
        Todo,
        "title" | "description" | "completed" | "favorite" | "deadline"
      >
    >,
  ) {
    await updateTodoService(id, updates);
    await loadTodos();
  }
  useEffect(() => {
    loadTodos();
  }, [user]);

  return {
    todos,
    loading,
    addTodo,
    toggleTodo,
    updateTodo,
    favoriteToggleTodo,
    removeTodo,
  };
}
