<script setup>
import Kakao from '@/components/logos/Kakao.vue'
import Google from '@/components/logos/Google.vue'
import Naver from '@/components/logos/Naver.vue'

import BottomOrangeButton from '@/components/BottomOrangeButton.vue'

import { lambdaAxios } from '@/utils/axios'

import { useMemberStore } from '@/stores/memberStore'
import { computed, reactive, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const lambda = lambdaAxios()

const disabled = reactive({
  name: false,
  tag: false
})

const shake = (area) => {
  if (disabled[area]) {
    return
  }

  disabled[area] = true
  setTimeout(() => {
    disabled[area] = false
  }, 1000)
}

const send = async () => {
  if (nameCheck.value && tagCheck.value) {
    shake('name')
    shake('tag')
    return
  }

  if (nameCheck.value) {
    shake('name')
    return
  }

  if (tagCheck.value) {
    shake('tag')
    return
  }

  const formData = new FormData()

  const blob = new Blob(
    [
      JSON.stringify({
        memberId: member.memberId,
        name: me.name,
        tag: me.tag
      })
    ],
    { type: 'application/json' }
  )

  formData.append('dto', blob)
  formData.append('img', me.img)

  const res = await lambda.put('/member', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  const data = res.data

  member.tag = data.tag
  member.name = data.name
  member.profileImgUrl = data.profileImgUrl

  router.push('/mypage')
}

const member = useMemberStore()

const me = reactive({
  email: member.email,
  name: member.name,
  tag: member.tag,
  img: null,
  url: member.profileImgUrl
})

const nameCheck = computed(() => me.name == '' || me.name == null)
const tagEmptyCheck = computed(() => me.tag == '' || me.tag == null)
const tagDuplicateCheck = ref(false)
watchEffect(async () => {
  if (me.tag == member.tag) {
    return
  }

  const res = await lambda.get(`/member/${me.tag}`)
  tagDuplicateCheck.value = res.data
})
const tagCheck = computed(() => tagEmptyCheck.value || tagDuplicateCheck.value)

const upload = (event) => {
  const input = event.target
  if (input.files) {
    const reader = new FileReader()
    reader.onload = (e) => {
      me.url = e.target.result
    }
    me.img = input.files[0]

    reader.readAsDataURL(input.files[0])
  }
}

const remove = () => {
  me.img = null
  me.url = 'https://storage.lambda.myeverlastinglove.com/member/NoProfile.png'
}

const exit = async () => {
  await lambda.delete('/member')
}
</script>

<template>
  <div class="tw-w-full tw-h-[calc(100vh-42px)] tw-flex tw-items-center tw-pb-64">
    <form action="" class="tw-w-4/5 tw-mx-auto tw-mt-12">
      <div class="tw-font-bold tw-text-2xl">개인정보 수정</div>
      <div class="tw-flex tw-justify-between tw-items-end">
        <div class="tw-text-center">
          <input
            type="file"
            id="upload"
            accept="image/png, image/gif, image/jpeg"
            hidden
            @change="upload"
          />
          <label for="upload">
            <img :src="me.url" class="tw-h-20 tw-rounded-full tw-mt-6 tw-ms-2 tw-cursor-pointer" />
          </label>
        </div>
        <div class="tw-flex">
          <label
            for="upload"
            class="tw-bg-[#ff7a00] hover:tw-opacity-85 tw-text-white tw-px-4 tw-py-2 tw-rounded-3xl tw-font-medium tw-flex tw-items-center tw-cursor-pointer"
          >
            <div>사진등록</div>
          </label>
          <div
            class="tw-bg-white hover:tw-opacity-85 tw-text-[#ff7a00] tw-border-solid tw-border-2 tw-border-[#ff7a00] tw-ms-4 tw-px-7 tw-py-2 tw-rounded-3xl tw-font-medium tw-flex tw-items-center tw-cursor-pointer"
            @click="remove"
          >
            <div>삭제</div>
          </div>
        </div>
      </div>
      <div class="tw-mt-8">
        <div class="tw-mt-4 tw-relative">
          <div>이메일</div>
          <div class="tw-flex tw-mt-2">
            <input
              type="email"
              disabled
              v-model="me.email"
              class="tw-ps-3 tw-h-10 tw-w-full tw-border-solid focus:tw-outline-none tw-border-[#ff7a00] tw-border-[1px] tw-rounded-sm"
            />
            <div class="tw-absolute tw-right-2 tw-bottom-2">
              <Google v-if="'Google' == member.social" />
              <Kakao v-if="'Kakao' == member.social" />
              <Naver v-if="'Naver' == member.social" />
            </div>
          </div>
        </div>
        <div class="tw-mt-4 tw-relative">
          <div>이름</div>
          <div :class="{ shake: disabled.name }">
            <input
              type="text"
              v-model="me.name"
              class="tw-ps-3 tw-mt-2 tw-h-10 tw-w-full tw-border-solid tw-border-[1px] focus:tw-outline-none tw-border-[#D0D0D0] focus:tw-border-[#ff7a00] focus:tw-border-[1px] focus:tw-rounded-sm"
            />
          </div>
          <div
            v-if="nameCheck"
            class="tw-mt-2 tw-text-xs tw-text-red-500"
            :class="{ shake: disabled.name }"
          >
            이름을 입력해주세요
          </div>
        </div>
        <div class="tw-mt-4">
          <div>아이디</div>
          <div class="tw-relative" :class="{ shake: disabled.tag }">
            <div class="tw-absolute tw-left-2 tw-bottom-2 tw-text-lg -tw-z-10">@</div>
            <input
              type="text"
              v-model="me.tag"
              class="tw-bg-transparent tw-ps-7 tw-mt-2 tw-h-10 tw-w-full tw-border-solid tw-border-[1px] focus:tw-outline-none tw-border-[#D0D0D0] focus:tw-border-[#ff7a00] focus:tw-border-[1px] focus:tw-rounded-sm"
            />
          </div>
          <div
            v-if="tagEmptyCheck"
            class="tw-mt-2 tw-text-xs tw-text-red-500"
            :class="{ shake: disabled.tag }"
          >
            아이디를 입력해주세요
          </div>
          <div
            v-else-if="tagDuplicateCheck"
            class="tw-mt-2 tw-text-xs tw-text-red-500"
            :class="{ shake: disabled.tag }"
          >
            이미 존재하는 아이디입니다
          </div>
        </div>
      </div>
    </form>
  </div>
  <div
    class="tw-fixed tw-bottom-14 tw-right-4 tw-text-red-600 tw-underline tw-underline-offset-4 tw-cursor-pointer"
    @click="exit"
  >
    회원 탈퇴
  </div>
  <BottomOrangeButton @click="send">수정 완료</BottomOrangeButton>
</template>

<style scoped>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
