<script setup>
import NotificationVoteItem from '@/components/notification/NotificationVoteItem.vue'

const items = [
  {
    user: {
      name: '최병익',
      email: '@byeong_ik',
      profile: '/src/assets/imgs/person-svgrepo-com.svg'
    },
    isOpen: true,
    comment: '너일걸??'
  },
  { isOpen: false, comment: '너일걸??' },
  { isOpen: false, comment: '너일걸??' },
  { isOpen: false, comment: '너일걸??' },
  { isOpen: false, comment: '너일걸??' }
]
const props = defineProps({
  mainTitle: {
    type: String,
    required: false
  },
  subTitle: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div class="container mt-5">
    <h1 class="main-title">나를 뽑은 사람</h1>
    <p class="sub-title">'마성의 매력이 있는 친구'</p>
    <div class="mt-4">
      <div v-for="(item, index) in items" :key="index">
        <NotificationVoteItem :user="item.user" :isOpen="item.isOpen" :comment="item.comment" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
.main-title {
  font-size: 24px;
  font-weight: bold;
}
.sub-title {
  font-size: 18px;
  color: gray;
}
</style>
