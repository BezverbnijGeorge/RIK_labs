<template>
  <div class="about-container">
    <h2 class="title">Про застосунок</h2>
    <div class="text-block">
      <p>Цей web-застосунок розроблено в рамках лабораторної роботи.</p>
      <p><strong class="highlight">Головна мета:</strong> Демонстрація архітектури <em>Single Page Application (SPA)</em>.</p>
      <p><strong class="highlight">Використані технології:</strong> Vue 3 (Composition API), Vue Router, Vite.</p>
      <p>Додаток використовує клієнтський роутинг: переходи між сторінками "Гра", "Статистика" та цією сторінкою відбуваються миттєво, без звернення до сервера за новими HTML-документами.</p>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.title {
  color: #2c3e50;
  margin-bottom: 20px;
}

.text-block {
  text-align: left;
  max-width: 650px;
  width: 100%;
  line-height: 1.8; /* Збільшений міжрядковий інтервал для легшого читання */
  font-size: 1.15rem;
  color: #444444; /* Явний темно-сірий колір тексту */
  
  /* Стилізація під "картку", як на сторінці статистики */
  background-color: #ffffff; 
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #eaeaea;
}

/* Відступи між абзацами */
.text-block p {
  margin-bottom: 15px;
}

/* Останній абзац не потребує відступу знизу */
.text-block p:last-child {
  margin-bottom: 0;
}

/* Виділення важливих слів іншим відтінком */
.highlight {
  color: #2c3e50;
  font-weight: 700;
}
</style>