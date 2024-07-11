<script setup>
import { ref } from 'vue'
import createVoteAPI from '@/apis/vote'

const voteAPI = createVoteAPI()
const todayInfo = ref(Object)
const getTodayVoteInfo = () => {
  voteAPI.getTodayInfo(
    ({ data }) => {
      if (data) {
        todayInfo.value = data
      } else {
        todayInfo.value = {
          totalPoint: 0,
          voteInfoCnt: 0,
          opinionCnt: 0
        }
      }
    },
    () => {
      console.log('오늘의 투표 정보를 가져오는데 실패했습니다.')
    }
  )
}
getTodayVoteInfo()
</script>

<template>
  <h2>오늘의 투표 🎉</h2>
  <div class="p-3 bg-light">
    <div class="border-bottom py-2 d-flex justify-content-between align-items-center">
      <span>오늘 획득한 포인트</span>
      <span class="fw-bold"> <span class="emoji">😊</span> + {{ todayInfo.totalPoint }}P </span>
    </div>
    <div class="border-bottom py-2 d-flex justify-content-between align-items-center">
      <span>오늘 투표 수</span>
      <span class="fw-bold">{{ todayInfo.voteInfoCnt }}개</span>
    </div>
    <div class="py-2 d-flex justify-content-between align-items-center">
      <span>오늘 한 마디 수</span>
      <span class="fw-bold">{{ todayInfo.opinionCnt }}개</span>
    </div>
  </div>
</template>

<style scoped></style>
