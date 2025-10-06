<template>
  <div class="space-y-4">
    <div v-if="todos.length === 0" class="text-center p-8 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 text-white shadow-xl">
      <p class="text-lg font-medium">No todos found.</p>
      <p class="text-sm text-white/80 mt-1">Add a new task or adjust your filters.</p>
    </div>

    <TransitionGroup name="list" tag="ul" class="space-y-4">
      <li 
        v-for="todo in todos" 
        :key="todo.id" 
        :class="[
          'bg-white/30 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 transform hover:shadow-2xl hover:scale-[1.01] flex items-center shadow-lg',
          { 'opacity-60 saturate-50': todo.isCompleted }
        ]"
      >
        <!-- Checkbox and Content -->
        <div class="flex-grow flex items-start gap-4 cursor-pointer" @click="$emit('toggle', todo.id)">
          <div 
            :class="[
              'mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0',
              todo.isCompleted 
                ? 'bg-purple-500 border-purple-500' 
                : 'border-white/70 hover:bg-white/20'
            ]"
          >
            <Check v-if="todo.isCompleted" class="w-4 h-4 text-white" />
          </div>

          <div>
            <div class="flex items-center gap-2 mb-1">
              <span 
                :class="[
                  'text-sm font-semibold px-2 py-0.5 rounded-full text-white',
                  categoryClasses[todo.category]
                ]"
              >
                {{ todo.category }}
              </span>
            </div>
            <h3 
              :class="[
                'text-lg font-bold text-white',
                { 'line-through text-white/70': todo.isCompleted }
              ]"
            >
              {{ todo.title }}
            </h3>
            <p v-if="todo.description" class="text-white/80 text-sm mt-1">
              {{ todo.description }}
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex space-x-2 flex-shrink-0">
          <button 
            @click.stop="$emit('edit', todo)" 
            class="p-2 rounded-full text-white/80 hover:bg-white/30 transition-colors"
            title="Edit"
          >
            <Edit2 class="w-5 h-5" />
          </button>
          <button 
            @click.stop="$emit('delete', todo.id)" 
            class="p-2 rounded-full text-red-300 hover:bg-red-500/30 transition-colors"
            title="Delete"
          >
            <Trash2 class="w-5 h-5" />
          </button>
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { Check, Edit2, Trash2 } from 'lucide-vue-next';
// Assuming the Todo and Category types are available via '@/types'
import type { Todo, Category } from '@/types'; 

// Define Props and Emits based on usage in TodoView.vue
const props = defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits<{
  (e: 'toggle', id: string): void;
  (e: 'edit', todo: Todo): void;
  (e: 'delete', id: string): void;
}>();

// Simple logic to map category names to Tailwind CSS classes for styling
const categoryClasses: Record<Category, string> = {
  Personal: 'bg-green-500/80',
  Work: 'bg-blue-500/80',
  Urgent: 'bg-red-500/80',
  Other: 'bg-yellow-500/80',
};
</script>

<style scoped>
/* Transition Group Styles */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
/* Ensure the list item doesn't collapse during leave transition */
.list-leave-active {
  position: absolute; 
  width: 100%;
}
</style>
