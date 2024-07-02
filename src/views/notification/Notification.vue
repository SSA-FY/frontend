<template>
  <div class="container">
    <div class="text-left mt-5 ms-4 main-title">
      <p>My News</p>
    </div>
    <div class="text-center mt-3">
      <div v-if="list.length === 0" class="mt-3">
        <h4>아직 새로운 소식이 없어요</h4>
      </div>
      <div v-for="date in reversedDates" :key="date" class="date-section mt-2">
        <div class="date-text">
          <p>{{ date }}</p>
        </div>
        <div v-for="noti in getNotis(date)" :key="noti.id">
          <NotificationItem
            :type="noti.dtype"
            :expired-vote-notification="noti.expiredVoteNotification"
            :invition-notification="noti.invitionNotification"
            :vote-notification="noti.voteNotification"
          />
        </div>
      </div>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import NavBar from '@/components/common/NavBar.vue'
import NotificationItem from '@/components/notification/NotificationItem.vue'
import { lambdaAxios } from '@/utils/axios'

const list = ref([])

const time = reactive({
  timeMap: new Map()
})

const dates = computed(() => Array.from(time.timeMap.keys()))
const getNotis = (date) => {
  return time.timeMap.get(date)?.slice().reverse() || []
}

const reversedDates = computed(() => {
  return [...dates.value].sort().reverse()
})

const lambda = lambdaAxios()
onMounted(() => {
  lambda
    .get('/notification/list?page=0')
    .then((res) => {
      console.log(res.data.data)
      list.value = res.data.data
      list.value.forEach((noti) => {
        let date = noti.timestamp.split(' ')[0]
        if (!time.timeMap.has(date)) {
          time.timeMap.set(date, [])
        }
        time.timeMap.get(date).push(noti)
      })
      console.log(time.timeMap)
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>

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

.date-section {
  text-align: left; /* 날짜를 왼쪽 정렬 */
  margin-left: 10px; /* 필요에 따라 조정 가능 */
  margin-top: 10px;
}

.date-text {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  margin-left: 5%;
}

footer i {
  background-color: black;
}
</style>
