<script setup>
import { useRouter } from 'vue-router'
import Finish from '@/components/vote/finish/Finish.vue'

const router = useRouter()

const props = defineProps({
  name: String
})

const createVote = () => {
  router.push(`/vote/create?name=${props.name}`)
}
</script>

<template>
  <div class="wrap">
    <div id="voteCarousel" class="carousel slide">
      <div class="carousel-indicators">
        <button
          type="button"
          class="border border-white mt-1 active"
          data-bs-target="#voteCarousel"
        ></button>
      </div>
      <div class="carousel-inner position-relative container p-0">
        <div class="carousel-item active">
          <div class="square-container">
            <img
              src="https://storage.lambda.myeverlastinglove.com/vote/Default.jpeg"
              class="d-block w-100 square-image"
              alt="..."
            />
            <div class="carousel-caption bg-light rounded">
              <p class="mb-2 text-black">새로운 투표가 없어요 😓</p>
              <p class="mb-3 text-black">투표를 직접 만들어보세요!</p>
              <button class="btn bg-orange text-white" @click="createVote">투표 만들기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Finish />
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
