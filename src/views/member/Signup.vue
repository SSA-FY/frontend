<script setup>
import Kakao from '@/components/logos/Kakao.vue'
import Google from '@/components/logos/Google.vue'
import Naver from '@/components/logos/Naver.vue'

import BottomOrangeButton from '@/components/BottomOrangeButton.vue'

import { lambdaAxios } from '@/utils/axios'

import { useMemberStore } from '@/stores/memberStore'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const send = async () => {
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

  const res = await lambdaAxios().put('/member', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  const data = res.data

  member.tag = data.tag
  member.name = data.name
  member.profileImgUrl = data.profileImgUrl

  router.push('/signup-success')
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
const idCheck = computed(() => me.tag == '' || me.tag == null)
const check = computed(() => me.name == '' || me.name == null)

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
  me.url = 'https://storage.lambda.myeverlastinglove.com/lambda/NoImg.png'
}
</script>

<template>
  <div class="tw-w-full tw-h-screen tw-flex tw-items-center tw-pb-64">
    <form action="" class="tw-w-4/5 tw-mx-auto tw-mt-12">
      <div class="tw-flex tw-justify-between tw-items-end">
        <div class="tw-text-center">
          <div class="tw-font-bold tw-text-xl">회원가입</div>
          <input
            type="file"
            id="upload"
            accept="image/png, image/gif, image/jpeg"
            hidden
            @change="upload"
          />
          <label for="upload">
            <img :src="me.url" class="tw-h-20 tw-rounded-full tw-mt-6 tw-cursor-pointer" />
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
            <div class="tw-flex tw-items-center tw-absolute tw-right-2 tw-bottom-2">
              <Google v-if="'Google' == member.social" />
              <Kakao v-if="'Kakao' == member.social" />
              <Naver v-if="'Naver' == member.social" />
            </div>
          </div>
        </div>
        <div class="tw-mt-4 tw-relative">
          <div>이름</div>
          <input
            type="text"
            v-model="me.name"
            class="tw-ps-3 tw-mt-2 tw-h-10 tw-w-full tw-border-solid tw-border-[1px] focus:tw-outline-none tw-border-[#D0D0D0] focus:tw-border-[#ff7a00] focus:tw-border-[1px] focus:tw-rounded-sm"
          />
        </div>
        <div v-if="nameCheck" class="tw-mt-2 tw-text-xs tw-text-red-500">이름을 입력해주세요</div>
        <div class="tw-mt-4 tw-relative">
          <div>아이디</div>
          <div class="tw-absolute tw-left-3 tw-top-10">@</div>
          <input
            type="text"
            v-model="me.tag"
            class="tw-bg-transparent tw-ps-7 tw-mt-2 tw-h-10 tw-w-full tw-border-solid tw-border-[1px] focus:tw-outline-none tw-border-[#D0D0D0] focus:tw-border-[#ff7a00] focus:tw-border-[1px] focus:tw-rounded-sm"
          />
          <div v-if="idCheck" class="tw-mt-2 tw-text-xs tw-text-red-500">아이디를 입력해주세요</div>
        </div>
      </div>
    </form>
  </div>
  <BottomOrangeButton @click="send">가입 완료</BottomOrangeButton>
</template>

<style scoped></style>
