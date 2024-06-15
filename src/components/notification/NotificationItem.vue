<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  date: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: false
  }
})

const info = computed(() => {
  switch (props.type) {
    case 'vote':
      return { icon: '/src/assets/imgs/default-img.webp', link: '/notification/vote' }
    case 'invitation':
      return { icon: '/src/assets/imgs/invitation-img.svg', link: '/notification/invitation' }
    case 'vote-result':
      return { icon: '/src/assets/imgs/vote-result-img.svg', link: '/vote/finish' }
    default:
      return '/src/assets/imgs/default-img.webp'
  }
})
</script>

<template>
  <div class="notification-item p-3 mb-3 border-bottom d-flex justify-content-between">
    <div>
      <div class="d-flex align-items-center mb-0">
        <span class="title">{{ title }}</span>
      </div>
      <div class="d-flex align-items-center">
        <div>
          <span class="description">{{ description }}</span>
        </div>
        <!-- <span class="date me-2">{{ date }}</span>  시간 넣을까 생각중-->
      </div>
      <div v-if="count" class="d-flex mt-2">
        <RouterLink to="/notification/vote">
          <img
            v-for="n in count"
            :key="n"
            src="/src/assets/imgs/person-svgrepo-com.svg"
            alt=""
            class="vote-count-img"
          />
        </RouterLink>
      </div>
    </div>
    <div v-if="type !== 'vote'">
      <RouterLink :to="info.link">
        <img :src="info.icon" alt="Icon" width="60" height="60" />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.notification-item {
}
.date {
  font-weight: bold;
  color: lightgray;
}
.title {
  font-weight: bold;
  font-size: 18px;
}
.description {
  color: #555;
  font-size: 16px;
}
.icon {
  border-radius: 50%;
}
.vote-count-img {
  width: 35px;
}
</style>
