
<template>
  <div>
    <MovieFilter @apply-filters="applyFilters" />
    <MovieList :movies="sortedMovies" @select-movie="navigateToDetail" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import MovieList from '../components/MovieList.vue';
import MovieFilter from '../components/MovieFilter.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const movies = ref([
  { id: 1, title: "Кунг Фу Панда 4 ", rating: 8.0, genre: "Мультфильмы", poster: "/images/Kung_Fu_Panda.jpg", description: "Кунг Фу Панда 4 продолжает приключения Паннды По в мире кунг-фу. В этой части По сталкивается с новыми вызовами и врагами, и ему предстоит научиться использовать свои навыки, чтобы защитить Долину Мира. По вновь объединяется с Друзьями-Воителями, чтобы преодолеть трудности и укрепить свои умения в боевых искусствах." },
  { id: 2, title: "Алиса в стране чудес", rating: 7.4, genre: "Фантастика", poster: "/images/Alisa_v_strane_chudes.jpg", description: "Алиса в стране чудес — это адаптация классической сказки Льюиса Кэрролла о девочке Алисе, которая попадает в волшебный мир, полный странных существ и необычных приключений. Фильм исследует темы взросления и фантазии, показывая, как Алиса сталкивается с абсурдными ситуациями и персонажами, такими как Безумный Шляпник и Чeshire Cat.Алиса в стране чудес — это адаптация классической сказки Льюиса Кэрролла о девочке Алисе, которая попадает в волшебный мир, полный странных существ и необычных приключений. Фильм исследует темы взросления и фантазии, показывая, как Алиса сталкивается с абсурдными ситуациями и персонажами, такими как Безумный Шляпник и Чeshire Cat." },
  { id: 3, title: "Мадагаскар 2", rating: 6.6, genre: "Мультфильмы", poster: "/images/Madagaskar_2.jpg", description: "Мадагаскар 2 — это продолжение приключений веселой группы животных, сбежавших из Нью-Йорка. На этот раз они отправляются в Африку, где сталкиваются с новыми друзьями и врагами, пытаясь вернуться домой. Фильм полон юмора и оставляет зрителей с положительными эмоциями." },
  { id: 4, title: "Один дома", rating: 7.6, genre: "Комедии", poster: "/images/Odin_doma.jpg", description: "Один дома — комедийный фильм о молодом мальчике по имени Кевин, который случайно остаётся дома один на Рождество, когда его семья уезжает в отпуск. Он использует свою смекалку, чтобы защитить дом от двух неуклюжих грабителей, что приводит к неожиданным и смешным ситуациям. Фильм стал культовым и любимым среди зрителей всех возрастов." },
  { id: 5, title: "Коралина в стране кошмаров", rating: 7.7, genre: "Фантастика", poster: "/images/Koralina.jpg", description: "Коралина в стране кошмаров — это анимационный фэнтези-триллер о девочке Коралайн, которая находит секретную дверь в альтернативный мир, где все кажется идеальным. Однако скоро она понимает, что это мир, полный опасностей и зловещих тайн, и ей предстоит бороться за свою свободу." },
  { id: 6, title: "Эверест", rating: 7.5, genre: "Мультфильмы", poster: "/images/Everest.jpg", description: "Эверест — это анимационная сказка о дружбе со Нежным человеком. Путешествие на самую высокую точку мира? Что может быть круче! Так решает Лу, когда случайно находит огромное, но очень милое чудовище посреди шумного мегаполиса. Пусть их преследуют ученые из сверхсекретной лаборатории, зато её новый друг умеет смешить и творить чудеса. Лу уверена, что поможет дружелюбному йети вернуться домой — на Эверест.\n" },
  { id: 7, title: "Хатико", rating: 8.1, genre: "Драмы", poster: "/images/Hatico.jpg", description: "Хатико: Самая верная собака — это трогательная драма, основанная на реальной истории о преданной собаке по имени Хатико. Она ждёт своего владельца на вокзале каждый день, даже после его смерти. Фильм показывает глубину дружбы и верности между хозяином и питомцем, оставляя зрителей тронутыми." },
  { id: 8, title: "Кухня", rating: 8.0, genre: "Комедии", poster: "/images/Kuhnya.jpg", description: "Кухня — российский ситком, рассказывающий о жизни и работе сотрудников ресторана. Сюжет разворачивается вокруг комедийных ситуаций, возникающих среди шеф-повара, официантов и кухонного персонала, их романтических отношений и повседневных трудностей. Сериал сочетает юмор и разнообразные кулинарные моменты, что делает его популярным у зрителей." },
  { id: 9, title: "Одаренная", rating: 7.6, genre: "Драмы", poster: "/images/odarennaya.jpg", description: "Одаренная — это трогательная драма о девочке-математике Мэри, которую пытается воспитать ее дядя Фрэнк. Фильм затрагивает вопросы о семье, воспитании и стремлении к самовыражению, когда в борьбу за опеку вступает бабушка Мэри, желающая развивать ее способности." },
  { id: 10, title: "Виноваты звезды ", rating: 7.8, genre: "Драмы", poster: "/images/vinovati_zvezdi.jpg", description: "Виноваты звезды — это трогательная история о любви двух подростков, Азии и Гейдже, которые встречаются на группе поддержки для больных раком. Фильм исследует темы жизни, смерти и силы любви, ставя перед героями непростые вопросы о смысле существования." },
  { id: 11, title: "Мадагаскар 3", rating: 7.0, genre: "Мультфильмы", poster: "/images/Madagaskar_3.jpg", description: "Мадагаскар 3: Кинохит по-русски рассказывает о возвращении Александра, Марти, Глории и Мелмана в Нью-Йорк. Они присоединяются к цирку, чтобы вернуть свое место в родном доме. Путешествие наполнено комичными приключениями, огнями цирка и новыми забавными персонажами." },
  { id: 12, title: "Гадкий я 4", rating: 6.9, genre: "Мультфильмы", poster: "/images/gadkiy_ya.jpg", description: "Гадкий я 4 продолжает приключения Гру и его детей. В этом фильме Гру сталкивается с новыми вызовами и противниками, а также с необходимостью справиться со своей задачей как оптимального отца и злодея. Чудесные моменты, забавные миньоны и эмоциональные отношения делают фильм ярким и увлекательным." },
  { id: 13, title: "Гарри Поттер и философский камень", rating: 7.8, genre: "Фантастика", poster: "/images/Harry_Potter.jpg", description: "Гарри Поттер и философский камень — это первая часть знаменитой саги о молодом волшебнике Гарри Поттере, который узнает о своем истинном происхождении и поступает в школу магии Хогвартс. Он находит верных друзей и сталкивается с темными силами, которые угрожают волшебному миру." },
  { id: 14, title: "Круэлла", rating: 7.5, genre: "Драмы", poster: "/images/Kryella.jpg", description: "Круэлла — это история о молодом дизайнере моды по имени Эстелла, которая впоследствии становится известной как Круэлла де Виль. Фильм показывает её становление, борьбу за признание и стремление быть лучшей в мире высокой моды, исследуя её сложные и темные стороны." },
  { id: 15, title: "1+1", rating: 8.5, genre: "Комедии", poster: "/images/1+1.jpg", description: "1+1 (или Intouchables) — французская драма, основанная на реальной истории о дружбе богатого парализованного человека Филиппа и его помощника Дрисса, который только что вышел из тюрьмы. Фильм прекрасно сочетает комедию и драму, показывая, как важно преодолевать социальные и физические барьеры" },
]);

const filters = ref({
  genre: '',
  sort: 'desc',

});

const applyFilters = (newFilters) => {
  filters.value = { ...newFilters };
};

const filteredMovies = computed(() => {
  let result = movies.value;

  if (filters.value.genre) {
    result = result.filter(movie => movie.genre === filters.value.genre);
  }



  return result;
});

const sortedMovies = computed(() => {
  return filteredMovies.value.slice().sort((a, b) => {
    if (filters.value.sort === 'asc') {
      return a.rating - b.rating;
    } else {
      return b.rating - a.rating;
    }
  });
});

const navigateToDetail = (id) => {
  router.push({ name: 'MovieDetail', params: { id } });
};
</script>

<style scoped>

</style>
