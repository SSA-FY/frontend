<script setup>
import createGroupAPI from '@/apis/group.js'
import createInviteAPI from '@/apis/invite.js'

import TopBackward from '@/components/TopBackward.vue'
import BottomOrangeButton from '@/components/BottomOrangeButton.vue'
import MemberInviteModal from '@/components/modals/MemberInvite.vue'
import ConfirmModal from '@/components/modals/Confirm.vue'

import { reactive } from 'vue'
import { useRouter } from 'vue-router'
// =================================================
const groupAPI = createGroupAPI()
const inviteAPI = createInviteAPI()

const group = reactive({ name: '', desc: '', img: '', previewUrl: '' })
const nickName = reactive({ nickName: '' })
const memberList = reactive([])

const deleteThis = (index) => {
  memberList.splice(index, 1)
}
// =================================================
const modal = reactive({ invite: false, create: false })

const bottomButtonClick = () => {
  // 유효성 검사
  if (group.name == '' || group.desc == '' || nickName.nickName == '') {
    return
  }
  modal.create = true
}

// =================================================

const router = useRouter()

const createButtonClick = () => {
  // 그룹 생성 요청
  const blob = new Blob(
    [
      JSON.stringify({
        teamName: group.name,
        description: group.desc,
        managerName: nickName.nickName
      })
    ],
    { type: 'application/json' }
  )

  const formData = new FormData()
  formData.append('dto', blob)
  formData.append('img', group.img)

  groupAPI.createGroup(
    formData,
    (res) => {
      const teamId = res.data
      // 멤버 초대 요청
      inviteAPI.createInvites(
        teamId,
        memberList.map((member) => member.id),
        () => {
          router.push({
            path: '/group/create-success',
            state: { id: teamId }
          })
        },
        () => {
          alert('멤버 초대 실패! 그룹 상세 페이지에서 멤버를 다시 초대해주세요')
          router.push({
            path: '/group/create-success',
            state: { id: teamId }
          })
        }
      )
    },
    () => {
      // TODO teamName 중복되어 그룹생성 실패한 경우 에러처리
      alert('해당 그룹명이 이미 존재합니다')
      modal.create = false
    }
  )
}
const imgUpload = (event) => {
  const input = event.target
  if (input.files) {
    const reader = new FileReader()
    reader.onload = (e) => {
      group.previewUrl = e.target.result
    }
    group.img = input.files[0]

    reader.readAsDataURL(input.files[0])
  }
}
</script>

<template>
  <!-- Modal 1 -->
  <MemberInviteModal
    v-if="modal.invite"
    @invite="modal.invite = false"
    @modal-close="modal.invite = false"
    type="create"
    v-model:memberList="memberList"
  />
  <!-- Modal 2 -->
  <ConfirmModal
    v-if="modal.create"
    @confirm="createButtonClick"
    @modal-close="modal.create = false"
    color="red"
  >
    <template v-slot:title>그룹 만들기</template>
    <template v-slot:content>
      정말로<br />
      '{{ group.name }}' 그룹을<br />
      만드시겠어요?
    </template>
    <template v-slot:buttonName>만들기</template>
  </ConfirmModal>

  <!-- Page -->
  <TopBackward></TopBackward>
  <form @submit.prevent>
    <div class="s-top">
      <label for="upload" class="s-label"><img class="s-groupImg" :src="group.previewUrl" /></label>
      <input
        type="file"
        id="upload"
        accept="image/png, image/gif, image/jpeg"
        hidden
        @change="imgUpload"
      />
      <!-- <img class="s-pictureSvg" src="/src/assets/imgs/picture.svg" /> -->
    </div>
    <div class="s-body">
      <label class="s-myLabel" for="inputGroupName">그룹명</label>
      <input
        type="text"
        class="s-myInput"
        v-model.trim="group.name"
        id="inputGroupName"
        maxlength="100"
      />
      <label class="s-myLabel" for="inputGroupDesc">한줄 소개</label>
      <input
        type="text"
        class="s-myInput"
        v-model.trim="group.desc"
        id="inputGroupDesc"
        maxlength="100"
      />
      <label class="s-myLabel" for="inputNickName">내 이름</label>
      <input
        type="text"
        class="s-myInput"
        v-model.trim="nickName.nickName"
        id="inputNickName"
        maxlength="10"
      />
      <label class="s-myLabel" for=""
        >멤버
        <img
          class="s-memberSvg"
          src="/src/assets/imgs/addMember.svg"
          @click="modal.invite = true"
        />
      </label>
      <div class="s-member" v-for="(value, index) in memberList" :key="index">
        {{ value.name }}
        <img class="s-closeSvg" src="/src/assets/imgs/close.svg" @click="deleteThis(index)" />
      </div>
    </div>
  </form>
  <BottomOrangeButton @click="bottomButtonClick">만들기</BottomOrangeButton>
</template>

<style scoped>
.s-top {
  position: relative;
}
.s-label {
  cursor: pointer;
  /* 16:9 */
  width: 100%;
  height: 0;
  padding-top: 56.25%;

  background-color: #fdfdfd;
  filter: brightness(1);
}
.s-label:hover {
  filter: brightness(0.9);
}

.s-groupImg {
  position: absolute;
  width: 100%;
  top: 0;
  object-fit: contain;
  max-height: 100%;
}
.s-pictureSvg {
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}
.s-body {
  display: flex;
  flex-direction: column;
  padding: 24px 20px 10px 20px;
}
.s-myLabel {
  color: #ff7a00;
  font-weight: 600;
  font-size: 18px;
  margin: 0 0 5px 0;
}
.s-myInput {
  margin: 2px 0 12px 0;
  border: #d0d0d0 solid 1px;
  padding: 2px 8px;
  border-radius: 4px;
}
.s-myInput:focus {
  outline: none;
  border: #ff7a00 solid 1px;
}
.s-memberSvg {
  float: right;
  cursor: pointer;
}
.s-member {
  border-bottom: 1px solid #d0d0d0;
  padding: 3px 1px 3px 2px;
}
.s-closeSvg {
  float: right;
  height: 20px;
  width: 20px;
  color: #ff7a00;
  cursor: pointer;
  transform: translateY(2px);
}
</style>
