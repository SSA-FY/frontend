<script setup>
import LogoMark from '@/components/logos/LogoMark.vue'
import LogoText from '@/components/logos/LogoText.vue'

import BottomOrangeButton from '@/components/BottomOrangeButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const redirectMain = () => {
  router.push('/group')
}

// 개발용 시작
import { lambdaAxios } from '@/utils/axios'

const lambda = lambdaAxios()

const getRefreshToken = () => {
  lambda.get(`/token/refresh`).then(() => {
    router.push('/group')
  })
}
// 개발용 끝
</script>

<template>
  <div
    class="tw-w-full tw-h-[calc(100vh-42px)] tw-flex tw-flex-col tw-justify-center tw-items-center"
  >
    <div class="tw-flex tw-justify-center">
      <LogoMark class="tw-w-[60px]" />
      <LogoText class="tw-ms-2 tw-text-[2.5rem]" />
    </div>
    <div class="tw-mt-2 tw-font-medium">익명 칭찬은 람다에서</div>
  </div>
  <BottomOrangeButton @click="redirectMain">지금 바로 시작하기</BottomOrangeButton>
  <!-- 개발용 시작 -->
  <div
    @click="getRefreshToken"
    class="tw-fixed tw-bottom-16 tw-w-full tw-max-w-[500px] tw-text-center tw-bg-[#ff7a00] tw-text-white tw-text-2xl tw-rounded-lg tw-py-2 tw-font-semibold tw-cursor-pointer"
  >
    체험 하기
  </div>
  <!-- 개발용 끝 -->
</template>
