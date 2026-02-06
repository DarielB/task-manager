import supabase from "./supabase-client";

export type Todo = {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  created_at: string;
  favorite: boolean;
  deadline: Date | null;
};

export async function getTodos() {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at");

  if (error) {
    throw error;
  }
  return data as Todo[];
}

export async function createTodo(
  title: string,
  userId: string,
  description: string,
  deadline: Date | null,
) {
  const { error } = await supabase.from("todos").insert({
    title,
    user_id: userId,
    description: description,
    deadline: deadline,
  });
  if (error) {
    throw error;
  }
}

export async function updateTodo(
  id: string,
  updates: Partial<
    Pick<Todo, "title" | "completed" | "description" | "favorite" | "deadline">
  >,
) {
  const { error } = await supabase.from("todos").update(updates).eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deleteTodo(id: string) {
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
