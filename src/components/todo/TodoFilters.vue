<template>
  <div class="bg-white/20 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/30 shadow-xl">
    <div class="flex flex-wrap gap-3 mb-4">
      <button
        v-for="f in filters"
        :key="f"
        @click="$emit('update:filter', f)"
        :class="[
          'px-4 py-2 rounded-xl font-medium transition-all',
          filter === f
            ? 'bg-white text-purple-600 shadow-lg scale-105'
            : 'bg-white/20 text-white hover:bg-white/30'
        ]"
      >
        {{ capitalize(f) }}
      </button>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <button
        @click="$emit('update:category', 'all')"
        :class="[
          'px-3 py-1.5 rounded-lg text-sm transition-all',
          category === 'all'
            ? 'bg-white text-purple-600'
            : 'bg-white/20 text-white hover:bg-white/30'
        ]"
      >
        All Categories
      </button>
      
      <button
        v-for="cat in categories"
        :key="cat"
        @click="$emit('update:category', cat)"
        :class="[
          'px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1.5',
          category === cat
            ? 'bg-white text-purple-600'
            : 'bg-white/20 text-white hover:bg-white/30'
        ]"
      >
        <span :class="['w-2 h-2 rounded-full', categoryColors[cat]]"></span>
        {{ cat }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FilterType, Category } from '@/types';

interface Props {
  filter: FilterType;
  category: string;
}

defineProps<Props>();

defineEmits<{
  'update:filter': [value: FilterType];
  'update:category': [value: string];
}>();

const filters: FilterType[] = ['all', 'active', 'completed'];
const categories: Category[] = ['Personal', 'Work', 'Shopping', 'Health', 'Other'];

const categoryColors: Record<string, string> = {
  Personal: 'bg-purple-500',
  Work: 'bg-blue-500',
  Shopping: 'bg-pink-500',
  Health: 'bg-green-500',
  Other: 'bg-gray-500'
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>