<script setup>
import LogoMark from '@/components/logos/LogoMark.vue'
import LogoText from '@/components/logos/LogoText.vue'
import Kakao from '@/components/logos/Kakao.vue'
import Google from '@/components/logos/Google.vue'
import Naver from '@/components/logos/Naver.vue'
import { useRouter } from 'vue-router'

const { VITE_API_BASE_URL } = import.meta.env

// 개발용 시작
import Arrow from '@/components/icons/Arrow.vue'
import { ref } from 'vue'
const members = ref([])
const router = useRouter()
lambdaAxios()
  .get(`/token/member`)
  .then((res) => {
    members.value = res.data
  })

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

import { lambdaAxios } from '@/utils/axios'

const lambda = lambdaAxios()

const getRefreshToken = (email, social) => {
  lambda.get(`/token/refresh?email=${email}&social=${social}`).then(() => {
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

    <!-- 개발용 시작 -->
    <div class="tw-fixed tw-bottom-44 tw-w-full tw-flex tw-justify-between tw-mt-4 tw-px-2">
      <div class="tw-relative tw-w-full tw-max-w-[500px]">
        <div
          class="tw-h-10 tw-flex tw-justify-center tw-items-center tw-bg-[#ff7a00] tw-rounded-lg tw-text-white tw-cursor-pointer"
          @click="toggleMenu"
        >
          <div class="tw-w-11/12 tw-text-center tw-text-2xl tw-font-semibold">체험 하기</div>
          <Arrow
            class="tw-h-6 tw-fill-white tw-me-2"
            :class="isMenuOpen ? '-tw-rotate-90' : 'tw-rotate-90'"
          />
        </div>
        <div
          class="tw-w-full tw-absolute tw-bottom-14 tw-border-solid tw-bg-white tw-border-[#ff7a00] tw-transition-all tw-duration-200 tw-ease-linear"
          :class="
            isMenuOpen
              ? 'tw-max-h-48 tw-mt-2 tw-overflow-auto tw-border-2 tw-rounded-lg'
              : 'tw-max-h-0 tw-overflow-hidden'
          "
        >
          <div v-if="members.length > 0">
            <div
              class="tw-ps-4 tw-py-1 tw-text-xl tw-border-solid tw-border-[#ff7a00] tw-cursor-pointer"
              @click="getRefreshToken(members[0].email, members[0].social)"
            >
              {{ members[0].email }}
            </div>
            <div
              v-for="member in members.slice(1)"
              class="tw-ps-4 tw-py-1 tw-text-xl tw-border-solid tw-border-[#ff7a00] tw-border-t-2 tw-cursor-pointer"
              @click="getRefreshToken(member.email, member.social)"
            >
              {{ member.email }}
            </div>
          </div>
          <div v-else class="text-center tw-py-1 tw-text-xl">회원이 없습니다.</div>
        </div>
      </div>

      <!-- <Calendar class="tw-w-[34px] tw-me-3" /> -->
      <!-- <DatePicker /> -->
    </div>
    <!-- 개발용 끝 -->

    <div class="tw-absolute tw-bottom-4 tw-w-full tw-px-4">
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
