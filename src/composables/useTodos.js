import { ref, computed } from "vue";
import { supabase } from "@/lib/supabase";
const todos = ref([]);
export function useTodos(userId) {
    const userTodos = computed(() => todos.value.filter((todo) => todo.user_id === userId));
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
    const createTodo = async (title, description, category) => {
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
    const updateTodo = async (id, updates) => {
        const { error } = await supabase.from("todos").update(updates).eq("id", id);
        if (!error) {
            const index = todos.value.findIndex((t) => t.id === id);
            if (index !== -1) {
                todos.value[index] = { ...todos.value[index], ...updates };
            }
        }
    };
    const deleteTodo = async (id) => {
        const { error } = await supabase.from("todos").delete().eq("id", id);
        if (!error) {
            todos.value = todos.value.filter((t) => t.id !== id);
        }
    };
    const toggleComplete = async (id) => {
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
