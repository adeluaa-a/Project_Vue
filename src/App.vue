<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<style>

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;  /* Явно задаем высоту */
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 15px 0;
  font-size: 24px;
  font-weight: bold;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}


footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px; /* Явно задаем высоту */
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 10px 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}


main {
  padding-top: 90px;  /* Отступ вниз, чтобы фильтрация не залезала под header */
  padding-bottom: 60px; /* Отступ вверх, чтобы не заходило под footer */
  max-width: 1200px;
  margin: 0 auto;
}
</style>
