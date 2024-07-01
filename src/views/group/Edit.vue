<script setup>
import createGroupAPI from '@/apis/group.js'

import TopBackward from '@/components/TopBackward.vue'
import BottomOrangeButton from '@/components/BottomOrangeButton.vue'
import ConfirmModal from '@/components/modals/Confirm.vue'

import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const teamName = window.history.state.name
if (teamName == undefined) {
  router.push({
    path: '/group'
  })
}

// =================================================

const group = reactive({
  id: undefined,
  name: '',
  desc: '',
  img: '',
  previewUrl: '',
  managerTag: ''
})
const groupAPI = createGroupAPI()

groupAPI.getGroupInfo(
  teamName,
  (res) => {
    const groupInfo = res.data
    group.id = groupInfo.teamId
    group.name = groupInfo.teamName
    group.desc = groupInfo.description
    group.previewUrl = groupInfo.imgUrl
    group.managerTag = groupInfo.managerTag
    getMembers()
  },
  () => {
    console.log('error')
  }
)

// =================================================

const memberList = reactive([])

const getMembers = async () => {
  groupAPI.getMembers(
    teamName,
    (res) => {
      const members = res.data
      members.forEach((m) => {
        memberList.push(m)
      })
    },
    (err) => {
      console.log(err)
    }
  )
}

const leaderClick = (e) => {
  group.managerTag = e
}
// =================================================
const modal = reactive({ confirm: false })

const buttonClick = () => {
  // 그룹 변경 요청
  const blob = new Blob(
    [
      JSON.stringify({
        teamId: group.id,
        teamName: group.name,
        description: group.desc,
        managerTag: group.managerTag
      })
    ],
    { type: 'application/json' }
  )

  const formData = new FormData()
  formData.append('dto', blob)
  formData.append('img', group.img)

  groupAPI.updateGroup(
    formData,
    () => {
      router.push(`/group/detail?name=${group.name}`)
    },
    (err) => {
      if (err.response.status == 409) {
        alert('해당 그룹명이 이미 존재합니다')
      }
      modal.confirm = false
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
  <!-- Modal -->
  <ConfirmModal
    v-if="modal.confirm"
    @confirm="buttonClick"
    @modal-close="modal.confirm = false"
    color="red"
  >
    <template v-slot:title>그룹 편집</template>
    <template v-slot:content> 정말로 그룹 정보를 수정하시겠어요? </template>
    <template v-slot:buttonName>확인</template>
  </ConfirmModal>

  <!-- Page -->
  <TopBackward></TopBackward>
  <form @submit.prevent v-if="group.id != undefined">
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
        v-model="group.name"
        id="inputGroupName"
        maxlength="100"
      />
      <label class="s-myLabel" for="inputGroupDesc">한줄 소개</label>
      <input
        type="text"
        class="s-myInput"
        v-model="group.desc"
        id="inputGroupDesc"
        maxlength="100"
      />
      <label class="s-myLabel" for="inputNickName">그룹장</label>

      <select class="s-select" @change="leaderClick($event.target.value)" id="leader">
        <option
          :selected="group.managerTag == m.memberTag"
          v-for="m in memberList"
          :value="m.memberTag"
        >
          {{ m.nickname }} @{{ m.memberTag }}
        </option>
      </select>
    </div>
  </form>
  <BottomOrangeButton @click="group.name ? (modal.confirm = true) : ''">완료</BottomOrangeButton>
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
.s-select {
  margin: 2px 0 12px 0;
  height: 30px;
  outline: none;
  padding: 2px 6px;
  border: #d0d0d0 solid 1px;
  border-radius: 4px;
}
.s-select:focus {
  border: #ff7a00 solid 1px;
}
</style>
