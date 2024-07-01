<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  voteList: Array,
  name: String
})
const teamName = ref(props.name)
const emit = defineEmits(['changeVote'])
const currentIdx = ref(0)
const transitioning = ref(false)
const preVote = () => {
  if (currentIdx.value > 0) {
    transitioning.value = true
    currentIdx.value--
    emit('changeVote', -1)
    wait()
  }
}

const nextVote = () => {
  if (currentIdx.value < props.voteList.length) {
    transitioning.value = true
    currentIdx.value++
    emit('changeVote', 1)
    wait()
  }
}

const wait = () => {
  setTimeout(() => {
    transitioning.value = false
  }, 400)
}
const router = useRouter()
const createVote = () => {
  router.push(`/vote/create?name=${teamName.value}`)
}
</script>

<template>
  <div class="wrap">
    <div id="voteCarousel" class="carousel slide">
      <div class="carousel-indicators">
        <button
          v-for="(vote, index) in props.voteList"
          :key="vote.id"
          type="button"
          class="border border-white mt-1"
          :class="{ active: index == 0 }"
          data-bs-target="#voteCarousel"
          :data-bs-slide-to="index"
          :aria-current="index == currentIdx.value"
          :aria-label="'Slide ' + (index + 1)"
          disabled
        ></button>
        <button
          type="button"
          class="border border-white mt-1"
          data-bs-target="#voteCarousel"
          :data-bs-slide-to="props.voteList.length"
          :aria-label="'Slide ' + props.voteList.length"
        ></button>
      </div>
      <div class="carousel-inner position-relative container p-0">
        <div
          v-for="(vote, index) in props.voteList"
          :key="vote.id"
          class="carousel-item"
          :class="index == 0 ? 'active' : ' '"
        >
          <div class="square-container">
            <img :src="vote.imgUrl" class="d-block w-100 square-image" alt="..." />
            <div class="carousel-caption">
              <div class="question-text h1">
                {{ vote.content }}
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="square-container">
            <img
              src="https://storage.lambda.myeverlastinglove.com/vote/Default.jpeg"
              class="d-block w-100 square-image"
              alt="..."
            />
            <div class="carousel-caption">
              <p class="mb-2 text-black">모든 투표를 완료했어요!</p>
              <p class="mb-3 text-black">새로운 투표를 만들어보세요!</p>
              <button class="btn bg-orange text-white" @click="createVote">투표 만들기</button>
            </div>
          </div>
        </div>
      </div>
      <button
        v-if="currentIdx != 0"
        class="carousel-control-prev"
        type="button"
        data-bs-target="#voteCarousel"
        data-bs-slide="prev"
        :disabled="transitioning"
        @click="preVote"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        v-if="currentIdx != props.voteList.length"
        class="carousel-control-next"
        type="button"
        data-bs-target="#voteCarousel"
        data-bs-slide="next"
        :disabled="transitioning"
        @click="nextVote"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.carousel-indicators {
  top: 1%;
  border-top: 0;
  border-bottom: 0;
  z-index: 1;
}
.carousel-indicators button {
  height: 7px;
  border-radius: 10px;
}
.question-text {
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 5px;
}
.carousel-item {
  transition: transform 0.4s ease-in-out !important;
}
.carousel-caption {
  position: absolute;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  z-index: 2;
}
.bg-orange {
  background-color: #ff7a00;
  z-index: 2;
}
.square-container {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
}

.square-image {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
}
</style>
