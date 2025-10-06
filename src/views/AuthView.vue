<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8 animate-fade-in">
        <h1 class="text-5xl font-bold text-white mb-2 drop-shadow-lg">
          ✨ Todo Flow
        </h1>
        <p class="text-white/90 text-lg">Organize your life beautifully</p>
      </div>

      <div class="bg-white/25 backdrop-blur-lg rounded-3xl p-8 border border-white/30 shadow-2xl">
        <div class="flex gap-2 mb-6">
          <button
            @click="authMode = 'login'; authError = ''"
            :class="[
              'flex-1 py-3 rounded-xl font-semibold transition-all',
              authMode === 'login'
                ? 'bg-white text-purple-600 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            ]"
          >
            Login
          </button>
          <button
            @click="authMode = 'signup'; authError = ''"
            :class="[
              'flex-1 py-3 rounded-xl font-semibold transition-all',
              authMode === 'signup'
                ? 'bg-white text-purple-600 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            ]"
          >
            Sign Up
          </button>
        </div>

        <div v-if="authError" class="bg-red-500/20 border border-red-500/40 text-white rounded-xl p-3 mb-4 text-sm">
          {{ authError }}
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="authMode === 'signup'" class="relative">
            <User class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              v-model="formData.name"
              type="text"
              placeholder="Full Name"
              class="w-full bg-white/30 border border-white/40 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <div class="relative">
            <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              v-model="formData.email"
              type="email"
              placeholder="Email"
              class="w-full bg-white/30 border border-white/40 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <div class="relative">
            <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              v-model="formData.password"
              type="password"
              placeholder="Password"
              class="w-full bg-white/30 border border-white/40 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-white text-purple-600 rounded-xl py-3 font-semibold hover:bg-white/90 transition-all shadow-lg"
          >
            {{ authMode === 'login' ? 'Login' : 'Create Account' }}
          </button>
        </form>

        <div class="mt-6 p-4 bg-white/20 rounded-xl border border-white/30">
          <p class="text-white/90 text-sm font-medium mb-2">Demo Account:</p>
          <p class="text-white/80 text-xs">Email: demo@todoflow.com</p>
          <p class="text-white/80 text-xs">Password: demo123</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { User, Mail, Lock } from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { login, signup } = useAuth();

const authMode = ref<'login' | 'signup'>('login');
const authError = ref('');

const formData = reactive({
  email: '',
  password: '',
  name: ''
});

const handleSubmit = async () => {
  authError.value = ''
  
  if (authMode.value === 'login') {
    const result = await login(formData.email, formData.password)
    if (result.success) {
      router.push('/')
    } else {
      authError.value = result.error || 'Login failed'
    }
  } else {
    const result = await signup(formData.email, formData.password, formData.name)
    if (result.success) {
      router.push('/')
    } else {
      authError.value = result.error || 'Signup failed'
    }
  }
}
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