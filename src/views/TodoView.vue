<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 sm:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header with User Info -->
      <div class="text-center mb-8 animate-fade-in">
        <div class="flex items-center justify-between mb-4">
          <div></div>
          <h1 class="text-5xl sm:text-6xl font-bold text-white drop-shadow-lg">
            ✨ Todo Flow
          </h1>
          <button
            @click="handleLogout"
            class="bg-white/20 backdrop-blur-lg rounded-xl px-4 py-2 text-white hover:bg-white/30 transition-all flex items-center gap-2 border border-white/30"
            title="Logout"
          >
            <LogOut class="w-4 h-4" />
            <span class="hidden sm:inline">Logout</span>
          </button>
        </div>
        <div class="bg-white/20 backdrop-blur-lg rounded-2xl px-4 py-2 inline-flex items-center gap-2 border border-white/30">
          <User class="w-4 h-4 text-white" />
          <span class="text-white font-medium">{{ currentUser?.name }}</span>
        </div>
      </div>

      <!-- Stats Cards -->
      <TodoStats :stats="stats" />

      <!-- Filters -->
      <TodoFilters
        v-model:filter="filterType"
        v-model:category="selectedCategory"
      />

      <!-- Add Todo Button -->
      <button
        v-if="!isAdding && !editingId"
        @click="isAdding = true"
        class="w-full bg-white/20 backdrop-blur-lg rounded-2xl p-6 mb-6 border-2 border-dashed border-white/40 hover:border-white/60 hover:bg-white/25 transition-all shadow-xl group"
      >
        <div class="flex items-center justify-center gap-3 text-white">
          <Plus class="w-6 h-6 group-hover:rotate-90 transition-transform" />
          <span class="text-lg font-medium">Add New Todo</span>
        </div>
      </button>

      <!-- Add/Edit Form -->
      <TodoForm
        v-if="isAdding || editingId"
        :editing-id="editingId"
        :initial-data="editingData"
        @submit="handleFormSubmit"
        @cancel="handleFormCancel"
      />

      <!-- Todos List -->
      <TodoList
        :todos="filteredTodos"
        @toggle="toggleComplete"
        @edit="handleEdit"
        @delete="deleteTodo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Plus, LogOut, User } from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth';
import { useTodos } from '@/composables/useTodos';
import { useFilters } from '@/composables/useFilters';
import TodoStats from '@/components/todo/TodoStats.vue';
import TodoFilters from '@/components/todo/TodoFilters.vue';
import TodoForm from '@/components/todo/TodoForm.vue';
import TodoList from '@/components/todo/TodoList.vue';
import type { Todo, Category } from '@/types';
import { onMounted } from 'vue'

const router = useRouter();
const { currentUser, logout } = useAuth();

// FIX: Combined the two duplicate declarations of userTodos/useTodos here.
const { userTodos, createTodo, updateTodo, deleteTodo, toggleComplete, fetchTodos } = useTodos(
  currentUser.value?.id || ''
);

const { filterType, selectedCategory, filteredTodos, stats } = useFilters(userTodos);

const isAdding = ref(false);
const editingId = ref<string | null>(null);
const editingData = ref<{ title: string; description: string; category: Category } | null>(null);

const handleLogout = () => {
  logout();
  router.push('/auth');
};

const handleFormSubmit = (data: { title: string; description: string; category: Category }) => {
  if (editingId.value) {
    updateTodo(editingId.value, data);
    editingId.value = null;
    editingData.value = null;
  } else {
    createTodo(data.title, data.description, data.category);
    isAdding.value = false;
  }
};

const handleFormCancel = () => {
  isAdding.value = false;
  editingId.value = null;
  editingData.value = null;
};

const handleEdit = (todo: Todo) => {
  editingId.value = todo.id;
  editingData.value = {
    title: todo.title,
    description: todo.description,
    category: todo.category
  };
  isAdding.value = false;
};

onMounted(async () => {
  if (currentUser.value) {
    await fetchTodos()
  }
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>