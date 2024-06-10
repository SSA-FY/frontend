<script setup>
import LogoMark from '@/components/logos/LogoMark.vue'
import LogoText from '@/components/logos/LogoText.vue'
import Kakao from '@/components/logos/Kakao.vue'
import Google from '@/components/logos/Google.vue'
import Naver from '@/components/logos/Naver.vue'

const { VITE_API_BASE_URL } = import.meta.env

// 개발용 시작
import { lambdaAxios } from '@/utils/axios'
import { useRouter } from 'vue-router'

const lambda = lambdaAxios()

const router = useRouter()

const getRefreshToken = () => {
  lambda.get(`/token/refresh`).then(() => {
    router.push('/group')
  })
}
// 개발용 끝
</script>

<template>
  <div
    class="tw-relative tw-w-full tw-h-screen tw-flex tw-flex-col tw-justify-center tw-items-center"
  >
    <div class="tw-flex tw-justify-center">
      <LogoMark class="tw-w-[60px]" />
      <LogoText class="tw-ms-2 tw-text-[2.5rem]" />
    </div>
    <div class="tw-mt-2 tw-invisible">익명 칭찬은 람다에서</div>

    <div class="tw-absolute tw-bottom-4 tw-w-full tw-px-4">
      <!-- 개발용 시작 -->
      <div
        class="tw-bg-[#ff7a00] tw-font-bold tw-text-black tw-no-underline tw-h-12 tw-rounded-lg tw-flex tw-justify-center tw-items-center tw-mb-3 tw-cursor-pointer"
        @click="getRefreshToken"
      >
        <LogoMark class="temp tw-w-6" />
        <div class="invisible">공</div>
        <div class="tw-ms-3 tw-text-white">람다로 체험하기</div>
      </div>
      <!-- 개발용 끝 -->
      <a
        class="tw-bg-[#FCE750] tw-font-bold tw-text-black tw-no-underline tw-h-12 tw-rounded-lg tw-flex tw-justify-center tw-items-center"
        :href="`${VITE_API_BASE_URL}/oauth2/authorization/kakao`"
      >
        <Kakao class="tw-w-6" />
        <div class="tw-ms-3">카카오로 시작하기</div>
      </a>
      <a
        class="tw-bg-[#F8F8F8] tw-font-bold tw-text-black tw-no-underline tw-mt-3 tw-h-12 tw-rounded-lg tw-flex tw-justify-center tw-items-center"
        :href="`${VITE_API_BASE_URL}/oauth2/authorization/google`"
      >
        <Google class="tw-w-6" />
        <div class="invisible">공</div>
        <div class="tw-ms-3">구글로 시작하기</div>
      </a>
      <a
        class="tw-bg-[#5AC251] tw-font-bold tw-text-white tw-no-underline tw-mt-3 tw-h-12 tw-rounded-lg tw-flex tw-justify-center tw-items-center"
        :href="`${VITE_API_BASE_URL}/oauth2/authorization/naver`"
      >
        <Naver class="tw-w-6" />
        <div class="tw-ms-3">네이버로 시작하기</div>
      </a>
    </div>
  </div>
</template>

<!-- 개발용 시작 -->
<style>
.temp > path,
.temp > rect {
  fill: white;
}
</style>
<!-- 개발용 끝 -->
