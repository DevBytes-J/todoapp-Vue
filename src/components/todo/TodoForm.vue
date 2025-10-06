<template>
  <div class="bg-white/30 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-white/30 shadow-2xl animate-form-in">
    <h2 class="text-2xl font-bold text-white mb-4">
      {{ isEditing ? 'Edit Task' : 'Add New Task' }}
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      
      <!-- Title Input -->
      <div>
        <label for="title" class="block text-sm font-medium text-white/80 mb-1">Title</label>
        <div class="relative">
          <Type class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
          <input
            id="title"
            v-model="formState.title"
            type="text"
            placeholder="e.g., Finish project report"
            required
            maxlength="100"
            class="w-full bg-white/20 border border-white/40 rounded-xl pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          />
        </div>
      </div>

      <!-- Description Textarea -->
      <div>
        <label for="description" class="block text-sm font-medium text-white/80 mb-1">Description (Optional)</label>
        <div class="relative">
          <AlignLeft class="absolute left-4 top-4 w-4 h-4 text-white/60" />
          <textarea
            id="description"
            v-model="formState.description"
            placeholder="Add more details about the task..."
            rows="3"
            maxlength="300"
            class="w-full bg-white/20 border border-white/40 rounded-xl pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none transition-all"
          ></textarea>
        </div>
      </div>

      <!-- Category Select -->
      <div>
        <label for="category" class="block text-sm font-medium text-white/80 mb-1">Category</label>
        <div class="relative">
          <Tag class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
          <select
            id="category"
            v-model="formState.category"
            required
            class="w-full bg-white/20 border border-white/40 rounded-xl appearance-none pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all cursor-pointer"
            :class="{ 'text-white/60': formState.category === '' }"
          >
            <option disabled value="">Select a Category</option>
            <option v-for="cat in categories" :key="cat" :value="cat" class="bg-gray-800 text-white">
              {{ cat }}
            </option>
          </select>
          <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 pt-2">
        <button
          type="button"
          @click="handleCancel"
          class="flex-1 bg-white/20 text-white rounded-xl py-2 font-semibold hover:bg-white/30 transition-all flex items-center justify-center gap-2"
        >
          <X class="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          class="flex-1 bg-white text-purple-600 rounded-xl py-2 font-semibold hover:bg-white/90 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <component :is="isEditing ? Save : Plus" class="w-4 h-4" />
          {{ isEditing ? 'Save Changes' : 'Add Task' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { Plus, Save, X, Type, AlignLeft, Tag, ChevronDown } from 'lucide-vue-next';
import type { Todo, Category } from '@/types'; // Assuming '@/types' exists

// Define the available categories (must match the Category type)
const categories: Category[] = ['Personal', 'Work', 'Urgent', 'Other'];

// --- Props and Emits ---
const props = defineProps<{
  editingId: string | null;
  initialData: { title: string; description: string; category: Category } | null;
}>();

const emit = defineEmits<{
  (e: 'submit', data: { title: string; description: string; category: Category }): void;
  (e: 'cancel'): void;
}>();

// --- State Management ---
const defaultFormState = {
  title: '',
  description: '',
  category: '' as Category, // Initialize with an empty string or default category
};

const formState = reactive({ ...defaultFormState });

const isEditing = computed(() => !!props.editingId);

// Watch for initialData changes to populate the form when switching to edit mode
watch(() => props.initialData, (newVal) => {
  if (newVal) {
    // Populate form with initial data for editing
    formState.title = newVal.title;
    formState.description = newVal.description;
    formState.category = newVal.category;
  } else {
    // Reset form when not editing (e.g., when switching back to 'Add' mode)
    Object.assign(formState, defaultFormState);
  }
}, { immediate: true });

// --- Handlers ---

const handleSubmit = () => {
  // Simple validation to ensure category is selected
  if (!formState.category) {
    alert('Please select a category.'); // Use a real UI message box if preferred
    return;
  }

  // Emit the form data
  emit('submit', {
    title: formState.title,
    description: formState.description,
    category: formState.category
  });

  // Reset form after submission if it was an "Add" operation
  if (!isEditing.value) {
    Object.assign(formState, defaultFormState);
  }
};

const handleCancel = () => {
  // Reset form state before canceling
  Object.assign(formState, defaultFormState);
  emit('cancel');
};
</script>

<style scoped>
@keyframes form-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-form-in {
  animation: form-in 0.3s ease-out;
}
/* Style to make the select placeholder text slightly lighter */
select.text-white[value=""] {
  color: rgba(255,255,255,0.6);
}
select:not([value=""]) {
  color: theme('colors.white');
}
</style>