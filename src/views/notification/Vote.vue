<script setup>
import NotificationVoteItem from '@/components/notification/NotificationVoteItem.vue'
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const voteNotification = {
  votetitle: '마성의 매력이 있는 친구',
  voteInfoItems: [
    {
      voteInfoId: 5,
      opinion: '너야!',
      isOpen: true,
      member: {
        name: '최병익',
        profile: 'img',
        tag: 'tag'
      }
    },
    {
      voteInfoId: 2,
      opinion: '너일걸 2',
      isOpen: false
    },
    {
      voteInfoId: 3,
      opinion: '너일걸 3',
      isOpen: false
    },
    {
      voteInfoId: 4,
      opinion: '너일걸 4',
      isOpen: false
    },
    {
      voteInfoId: 5,
      opinion: '너일걸 5',
      isOpen: false
    }
  ]
}

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

watchEffect(() => {
  console.log(route.params.voteid)
})
</script>

<template>
  <div class="container mt-5">
    <h1 class="main-title">나를 뽑은 사람</h1>
    <p class="sub-title">{{ voteNotification.votetitle }}</p>
    <div class="mt-4">
      <div v-for="(item, index) in voteNotification.voteInfoItems" :key="index">
        <NotificationVoteItem :member="item.member" :isOpen="item.isOpen" :opinion="item.opinion" />
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
