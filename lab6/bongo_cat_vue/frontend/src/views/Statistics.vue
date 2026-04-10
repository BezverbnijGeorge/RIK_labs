<template>
  <div class="stats-container">
    <h2 class="title">Твоя статистика</h2>

    <!-- Статистика по кожній лапці -->
    <div class="stats-grid">
      <div class="stat-card">
        <p class="label">🔴 Ліва лапа:</p>
        <h3 class="red-text">{{ leftClicks }}</h3>
      </div>
      <div class="stat-card">
        <p class="label">🔵 Права лапа:</p>
        <h3 class="blue-text">{{ rightClicks }}</h3>
      </div>
    </div>

    <!-- Загальна статистика -->
    <div class="stat-card total-card">
      <p class="label">Всього натискань:</p>
      <h3 class="total-text">{{ totalClicks }}</h3>
    </div>

    <button class="reset-btn" @click="resetStats">Скинути прогрес</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const leftClicks = ref(0)
const rightClicks = ref(0)

// Автоматично рахуємо суму обох лапок
const totalClicks = computed(() => leftClicks.value + rightClicks.value)

onMounted(() => {
  // Використовуємо правильні ключі, які ми задали у грі
  leftClicks.value = parseInt(localStorage.getItem('cat_clicks_left')) || 0
  rightClicks.value = parseInt(localStorage.getItem('cat_clicks_right')) || 0
})

const resetStats = () => {
  if (confirm("Ти впевнений, що хочеш скинути всі кліки?")) {
    localStorage.removeItem('cat_clicks_left')
    localStorage.removeItem('cat_clicks_right')
    leftClicks.value = 0
    rightClicks.value = 0
  }
}
</script>

<style scoped>
.stats-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

/* Явний темний колір для заголовка */
.title {
  color: #2c3e50;
  margin-bottom: 20px;
}

.stats-grid {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
}

/* Робимо картки чисто білими з помітнішою тінню і рамкою */
.stat-card {
  background-color: #ffffff; 
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); 
  border: 1px solid #eaeaea; 
  text-align: center;
  flex: 1;
}

.total-card {
  max-width: 500px;
  width: 100%;
  margin-bottom: 30px;
}

/* Задаємо чіткі кольори для тексту, щоб нічого не зникало */
.label {
  color: #555555;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.red-text { color: #e74c3c; font-size: 2.5rem; margin: 0; }
.blue-text { color: #3498db; font-size: 2.5rem; margin: 0; }
.total-text { color: #2c3e50; font-size: 3.5rem; margin: 0; }

.reset-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.1s;
}

.reset-btn:active {
  transform: scale(0.95);
}

.reset-btn:hover {
  background-color: #c0392b;
}
</style>