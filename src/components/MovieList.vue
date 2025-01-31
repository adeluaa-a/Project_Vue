
<template>
  <div class="movie-list">
    <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @select-movie="selectMovie"
    />
  </div>
</template>

<script setup>
import MovieCard from './MovieCard.vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  movies: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(['select-movie']);

const selectMovie = (id) => {
  emits('select-movie', id);
};
</script>

<style scoped>
.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>
