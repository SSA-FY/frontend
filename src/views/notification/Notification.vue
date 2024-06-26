<script setup>
import { ref, watchEffect } from 'vue'
import NavBar from '@/components/common/NavBar.vue'
import NotificationItem from '@/components/notification/NotificationItem.vue'
import { lambdaAxios } from '@/utils/axios'

const list = ref([])

const lambda = lambdaAxios()
watchEffect(() => {
  lambda
    .get('/notification/list?page=0')
    .then((res) => {
      console.log(res.data.data)
      list.value = res.data.data
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>

<template>
  <div class="container">
    <div class="text-left mt-5 ms-4 main-title">
      <p>My News</p>
    </div>
    <div class="text-center mt-5">
      <div v-if="list.length === 0" class="mt-5">
        <h4>아직 새로운 소식이 없어요</h4>
      </div>
      <div v-for="(noti, index) in list" :key="index">
        <NotificationItem
          :type="noti.dtype"
          :expired-vote-notification="noti.expiredVoteNotification"
          :invition-notification="noti.invitionNotification"
          :vote-notification="noti.voteNotification"
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
