<script setup>
import BottomOrangeButton from '@/components/BottomOrangeButton.vue'
import Confetti from '@/components/Confetti.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const redirectMain = () => {
  router.push('/group')
}
</script>

<template>
  <div
    class="tw-relative tw-w-full tw-h-screen tw-flex tw-flex-col tw-justify-center tw-items-center"
  >
    <h1 class="tw-text-2xl tw-font-bold">Lambda에</h1>
    <h1 class="tw-text-2xl tw-font-bold">오신 것을 환영합니다</h1>
    <h6 class="tw-mt-5 tw-text-base">지금 바로 익명 투표를 시작해보세요.</h6>
  </div>
  <Confetti class="tw-absolute tw-w-full tw-h-screen tw-top-0 tw-z-100" />
  <BottomOrangeButton @click="redirectMain">확인</BottomOrangeButton>
</template>

<style scoped></style>
