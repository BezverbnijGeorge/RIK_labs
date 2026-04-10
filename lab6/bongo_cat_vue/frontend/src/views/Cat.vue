<template>
<div class="container">
        <img :src="currentImage" class="cat" :style="{ top: imageTop + 'px' }" />
        <div class="btn left" 
         @mousedown="pressLeft" 
         @mouseup="releaseLeft" 
         @touchstart="pressLeft" 
         @touchend="releaseLeft"></div>
    <div class="btn right" 
         @mousedown="pressRight" 
         @mouseup="releaseRight" 
         @touchstart="pressRight" 
         @touchend="releaseRight"></div>
        <!--<button class="back-btn" @click="goHome">← Назад</button>-->
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import '../assets/css/Cat.css' 

const pawState = ref([0, 0])
const router = useRouter()

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

const pressLeft = () => pawState.value[0] = 1
const releaseLeft = () => pawState.value[0] = 0
const pressRight = () => pawState.value[1] = 1
const releaseRight = () => pawState.value[1] = 0

const goHome = () => {
  router.push('/')
}
</script>