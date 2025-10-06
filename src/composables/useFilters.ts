import { ref, computed } from "vue";
import type { Ref } from "vue";
import type { Todo, FilterType } from "@/types";

export function useFilters(todos: Ref<Todo[]>) {
  const filterType = ref<FilterType>("all");
  const selectedCategory = ref<string>("all");

  const filteredTodos = computed(() => {
    return todos.value.filter((todo) => {
      const statusMatch =
        filterType.value === "all" ||
        (filterType.value === "active" && !todo.completed) ||
        (filterType.value === "completed" && todo.completed);

      const categoryMatch =
        selectedCategory.value === "all" ||
        todo.category === selectedCategory.value;

      return statusMatch && categoryMatch;
    });
  });

  const stats = computed(() => ({
    total: todos.value.length,
    active: todos.value.filter((t) => !t.completed).length,
    completed: todos.value.filter((t) => t.completed).length,
  }));

  return {
    filterType,
    selectedCategory,
    filteredTodos,
    stats,
  };
}
