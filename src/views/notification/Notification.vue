<script setup>
import { ref } from 'vue'
import NavBar from '@/components/common/NavBar.vue'
import NotificationItem from '@/components/notification/NotificationItem.vue'

const notis = ref([
  {
    date: '2023.10.13',
    title: '누군가 나를 선택했어요!',
    description: '마성의 매력이 있는 친구',
    type: 'vote',
    count: 2
  },
  {
    date: '2023.10.13',
    title: '누군가 나를 선택했어요!',
    description: '책을 많이 읽을 것 같은 사람',
    type: 'vote',
    count: 4
  },
  {
    date: '2023.10.13',
    title: '결과가 나왔어요!',
    description: '제일 귀여운 친구',
    type: 'vote-result'
  },
  {
    date: '2023.10.12',
    title: '새로운 그룹에 초대되었어요!',
    description: '우리들만의 공간',
    type: 'invitation'
  }
])
</script>

<template>
  <div class="container">
    <div class="text-left mt-5 ms-4 main-title">
      <p>My News</p>
    </div>
    <div class="text-center mt-5">
      <div v-if="notis.length === 0" class="mt-5">
        <h4>아직 새로운 소식이 없어요</h4>
      </div>
      <div v-for="(noti, index) in notis" :key="index">
        <NotificationItem
          :date="noti.date"
          :title="noti.title"
          :description="noti.description"
          :type="noti.type"
          :count="noti.count"
        />
      </div>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<style scoped>
.container {
  min-height: 90vh;
}
.main-title {
  border-bottom: 1px solid #ff7a00;
  font-size: 32px;
  font-weight: 500;
}
.noti-btn:hover,
.noti-btn:focus,
.noti-btn:active {
  background-color: #ff7a00;
  color: white;
}

footer i {
  background-color: black;
}
</style>
