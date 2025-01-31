<template>
  <div class="filter">
    <form @submit.prevent="handleSubmit">
      <div class="filter-group">
        <label for="genre">Жанр:</label>
        <select id="genre" v-model="selectedGenre">
          <option value="">Все</option>
          <option v-for="genre in genres" :key="genre" :value="genre">
            {{ genre }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label for="sort">Сортировка:</label>
        <select id="sort" v-model="sortOrder">
          <option value="desc">Рейтинг ↓</option>
          <option value="asc">Рейтинг ↑</option>
        </select>
      </div>

      <div class="button-group">
        <button type="submit">Применить</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedGenre = ref('');
const sortOrder = ref('desc');
const genres = ref(['Мультфильмы', 'Фантастика', 'Комедии', 'Драмы']);

const emit = defineEmits(['apply-filters']);

const handleSubmit = () => {
  emit('apply-filters', {
    genre: selectedGenre.value,
    sort: sortOrder.value,
  });
};
</script>

<style scoped>

.filter {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}


form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
}

select {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.button-group {
  display: flex;
  align-items: flex-end;
}

button {
  background: #d3582c;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  font-weight: bold;
  cursor: pointer;
  min-width: 120px;
}

button:hover {
  background: #d3582c;
}
</style>
