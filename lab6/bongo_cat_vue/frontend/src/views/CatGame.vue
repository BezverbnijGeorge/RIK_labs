<template>
  <div class="game-container">
    
    <!-- Котик займає весь простір між меню і кнопками -->
    <div class="cat-wrapper">
      <img :src="currentImage" class="cat" :style="{ top: imageTop + 'px' }" draggable="false" />
    </div>

    <!-- Нижня панель керування -->
    <div class="bottom-bar">
      <!-- Ліва кнопка -->
      <div class="btn left" 
           @mousedown="pressLeft" 
           @mouseup="releaseLeft" 
           @touchstart.prevent="pressLeft" 
           @touchend.prevent="releaseLeft"></div>
      
      <!-- Рахунок між кнопками -
      <div class="scoreboard">
        <div class="score red-score">
          <span>🔴</span> <strong class="score-val">{{ scoreLeft }}</strong>
        </div>
        <div class="score blue-score">
          <span>🔵</span> <strong class="score-val">{{ scoreRight }}</strong>
        </div>
      </div> -->

      <!-- Права кнопка -->
      <div class="btn right" 
           @mousedown="pressRight" 
           @mouseup="releaseRight" 
           @touchstart.prevent="pressRight" 
           @touchend.prevent="releaseRight"></div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import '../assets/css/Cat.css' 

const pawState = ref([0, 0])
const scoreLeft = ref(0)
const scoreRight = ref(0)

onMounted(() => {
  scoreLeft.value = parseInt(localStorage.getItem('cat_clicks_left')) || 0
  scoreRight.value = parseInt(localStorage.getItem('cat_clicks_right')) || 0
})

const images = [
  '/assets/state_0.png',
  '/assets/state_1.png',
  '/assets/state_2.png',
  '/assets/state_3.png'
]

const currentImage = computed(() => {
  const index = pawState.value[0] + pawState.value[1] * 2
  return images[index]
})

const imageTop = computed(() => {
  const index = pawState.value[0] + pawState.value[1] * 2
  return index === 0 ? 50 : 70
})

const pressLeft = () => {
  pawState.value[0] = 1
  scoreLeft.value++
  localStorage.setItem('cat_clicks_left', scoreLeft.value)
}
const releaseLeft = () => { pawState.value[0] = 0 }

const pressRight = () => {
  pawState.value[1] = 1
  scoreRight.value++
  localStorage.setItem('cat_clicks_right', scoreRight.value)
}
const releaseRight = () => { pawState.value[1] = 0 }
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  /* Вираховуємо висоту: 100% екрана мінус приблизна висота верхнього меню (~80px) */
  height: calc(100vh - 80px); 
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

/* Обгортка кота забирає весь вільний простір */
.cat-wrapper {
  flex-grow: 1; 
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  overflow: hidden; /* Щоб кіт не вилазив за межі контейнера */
}

/* Кіт максимально розтягується, але зберігає пропорції */
.cat {
  width: 100%;
  height: 100%;
  max-height: 60vh; /* Обмеження для дуже великих екранів */
  object-fit: contain; 
  position: relative;
  transition: top 0.05s ease;
}

/* Нижня панель: Flex Row з відступами */
.bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px; /* Трохи відступаємо від нижнього краю екрана */
}

.scoreboard {
  display: flex;
  gap: 1.5rem;
  font-size: 1.4rem;
  font-weight: bold;
  background: white; /* Легкий фон, щоб цифри гарно читалися */
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.red-score { color: #e74c3c; }
.blue-score { color: #3498db; }

.score-val {
  font-size: 1.6rem;
  margin-left: 0.2rem;
}

/* Базові налаштування для кнопок (їх розмір і фон беруться з твого Cat.css) */
.btn {
  cursor: pointer;
  user-select: none;
  /* Додав, щоб запобігти виділенню тексту на мобільних при швидкому тапі */
  -webkit-tap-highlight-color: transparent; 
}
</style>