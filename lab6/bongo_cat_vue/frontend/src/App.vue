<!-- <template>
  <div id="app">
    <router-view />
  </div>
</template> -->


<template>
  <div id="app-layout">
    <header class="navbar">
      <div class="logo">🐱 Cat Clicker SPA</div>
      <nav>
        <router-link to="/">Гра</router-link>
        <router-link to="/stats">Статистика</router-link>
        <router-link to="/about">Про застосунок</router-link>
      </nav>
    </header>

    
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  padding: 15px 30px;
  color: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #34495e;
}

/* Цей клас Vue Router додає автоматично до активного посилання */
nav a.router-link-active {
  background-color: #42b983;
  font-weight: bold;
}

.content {
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
</style>