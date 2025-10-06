import { ref, computed } from "vue";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/types";

interface Todo {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: Category;
  completed: boolean;
  created_at: string;
}

const todos = ref<Todo[]>([]);

export function useTodos(userId: string) {
  const userTodos = computed(() =>
    todos.value.filter((todo) => todo.user_id === userId)
  );

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      todos.value = data;
    }
  };

  const createTodo = async (
    title: string,
    description: string,
    category: Category
  ) => {
    const { data, error } = await supabase
      .from("todos")
      .insert([
        {
          user_id: userId,
          title,
          description,
          category,
          completed: false,
        },
      ])
      .select();

    if (!error && data) {
      todos.value.unshift(data[0]);
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    const { error } = await supabase.from("todos").update(updates).eq("id", id);

    if (!error) {
      const index = todos.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        todos.value[index] = { ...todos.value[index], ...updates };
      }
    }
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (!error) {
      todos.value = todos.value.filter((t) => t.id !== id);
    }
  };

  const toggleComplete = async (id: string) => {
    const todo = todos.value.find((t) => t.id === id);
    if (todo) {
      await updateTodo(id, { completed: !todo.completed });
    }
  };

  return {
    userTodos,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  };
}
