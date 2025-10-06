<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-fade-in-stats">
    
    <!-- Total Todos Card -->
    <div class="bg-white/30 backdrop-blur-lg rounded-2xl p-4 border border-white/30 shadow-xl flex items-center justify-between transition-all hover:scale-[1.02]">
      <div>
        <p class="text-sm font-medium text-white/80 uppercase tracking-wider">Total Tasks</p>
        <p class="text-3xl font-extrabold text-white mt-1">{{ stats.total }}</p>
      </div>
      <ListChecks class="w-8 h-8 text-white/80" />
    </div>

    <!-- Completed Todos Card -->
    <div class="bg-white/30 backdrop-blur-lg rounded-2xl p-4 border border-white/30 shadow-xl flex items-center justify-between transition-all hover:scale-[1.02]">
      <div>
        <p class="text-sm font-medium text-white/80 uppercase tracking-wider">Completed</p>
        <p class="text-3xl font-extrabold text-white mt-1">{{ stats.completed }}</p>
      </div>
      <CheckCircle class="w-8 h-8 text-green-300" />
    </div>

    <!-- Pending Todos Card -->
    <div class="bg-white/30 backdrop-blur-lg rounded-2xl p-4 border border-white/30 shadow-xl flex items-center justify-between transition-all hover:scale-[1.02]">
      <div>
        <p class="text-sm font-medium text-white/80 uppercase tracking-wider">Pending</p>
        <p class="text-3xl font-extrabold text-white mt-1">{{ stats.uncompleted }}</p>
      </div>
      <Clock class="w-8 h-8 text-yellow-300" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ListChecks, CheckCircle, Clock } from 'lucide-vue-next';

// Define the shape of the stats object expected from the parent
export interface TodoStatsData {
  total: number;
  completed: number;
  uncompleted: number;
}

const props = defineProps<{
  stats: TodoStatsData;
}>();
</script>

<style scoped>
@keyframes fade-in-stats {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-stats {
  animation: fade-in-stats 0.5s ease-out;
}
</style>