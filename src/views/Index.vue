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
import Arrow from '@/components/icons/Arrow.vue'
import { ref } from 'vue'

const members = ref([])

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
  <div class="tw-fixed tw-bottom-14 tw-w-full tw-flex tw-justify-between tw-mt-4">
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
</template>
