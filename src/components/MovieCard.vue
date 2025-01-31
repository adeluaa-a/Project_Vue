
<template>
  <div class="movie-card" @click="handleClick">
    <img :src="getPosterUrl(movie.poster)" :alt="movie.title" loading="lazy" />
    <h3>{{ movie.title }}</h3>
    <p>Рейтинг: {{ movie.rating }}</p>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['select-movie']);

const getPosterUrl = (path) => {
  return path ? path : '/images/no-image.jpg'; // Путь к изображению-заглушке
};

const handleClick = () => {
  emits('select-movie', props.movie.id);
};
</script>

<style scoped>
.movie-card {
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
