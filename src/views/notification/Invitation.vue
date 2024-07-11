<script setup>
import createGroupAPI from '@/apis/group.js'

import BottomOrangeButton from '@/components/BottomOrangeButton.vue'
import TopBackward from '@/components/TopBackward.vue'
import SimpleOkModal from '@/components/modals/SimpleOk.vue'

import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const lambda = lambdaAxios()
const teamName = route.query.name
if (teamName == undefined) {
  router.push({
    path: '/group'
  })
}

const group = reactive({
  id: undefined,
  name: '',
  desc: '',
  img: '',
  managerTag: '',
  managerName: ''
})
const groupAPI = createGroupAPI()

groupAPI.getGroupInfo(
  teamName,
  (res) => {
    const groupInfo = res.data
    group.id = groupInfo.teamId
    group.name = groupInfo.teamName
    group.desc = groupInfo.description
    group.img = groupInfo.imgUrl
    group.managerTag = groupInfo.managerTag
    group.managerName = groupInfo.managerName
    getMembers()
  },
  () => {
    console.log('error')
  }
)

import { lambdaAxios } from '@/utils/axios'
const myName = ref('')

const buttonClick = () => {
  console.log(modal)
  if (myName.value.length > 0) {
    console.log(myName.value)
    lambda
      .post('/invitation/accept', { teamName: group.name, nickname: myName.value })
      .then(() => {
        modal.sucess = true
        router.push({
          path: '/group'
        })
      })
      .catch((err) => {
        console.error(err)
        modal.duplicated = true
      })
  }
}
// =================================================

const memberList = reactive([])

const getMembers = async () => {
  groupAPI.getMembers(
    teamName,
    (res) => {
      const members = res.data
      members.forEach((m) => {
        if (m.memberTag != group.managerTag) {
          memberList.push(m)
          console.log('member ' + m)
        }
      })
    },
    (err) => {
      console.log(err)
    }
  )
}

const nicknameDuplicatedHandler = () => {
  modal.duplicated = false
  myName.value = ''
}

// =================================================
const modal = reactive({ duplicated: false })
</script>

<template>
  <SimpleOkModal v-if="modal.duplicated" @modal-close="nicknameDuplicatedHandler"
    >이미 사용중인 닉네임 입니다. 다른 닉네임을 입력해주세요</SimpleOkModal
  >
  <!-- Page -->
  <TopBackward></TopBackward>
  <form @submit.prevent v-if="group.id != undefined">
    <div class="s-top">
      <div class="s-imgContainer"><img class="s-myImg" :src="group.img" /></div>
      <div class="s-title">
        <h3 class="s-groupName">{{ group.name }}</h3>
        <h5 class="s-desc">{{ group.desc }}</h5>
      </div>
    </div>
    <div class="s-body">
      <div class="s-myLabel" for="inputGroupName">그룹장</div>
      <div class="s-me">
        <div class="s-name">{{ group.managerName }} @{{ group.managerTag }}</div>
      </div>
      <div class="s-myLabel" for="inputGroupDesc">내이름</div>
      <input class="s-nameInput" v-model="myName" placeholder="닉네임을 입력하세요" />
      <div class="s-myLabel" for="inputGroupDesc">멤버</div>
      <div>
        <div class="s-name" v-for="m in memberList" :key="m">
          {{ m.nickname }} @{{ m.memberTag }}
        </div>
      </div>
    </div>
  </form>

  <BottomOrangeButton @click="buttonClick"> 참여하기</BottomOrangeButton>
</template>

<style scoped>
.s-top {
  position: relative;
}
.s-imgContainer {
  position: relative;
  /* 16:9 */
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  border: solid 1px #d9d9d9;
  border-left: none;
  background-color: #fdfdfd;
}
.s-myImg {
  position: absolute;
  width: 100%;
  top: 0;
  object-fit: contain;
  max-height: 100%;
}
.s-title {
  position: absolute;
  top: 22px;
  left: 20px;
  z-index: 2;
}
.s-me {
  position: relative;
  display: inline-block;
  width: 100%;
}
.s-redLine {
  color: #e5503c;
  font-size: 12px;
  padding: 0 0 0 8px;
}
.s-groupName {
  font-size: 32px;
  font-weight: 500;
}
.s-desc {
  font-size: 24px;
  font-weight: 500;
}

.s-pencilSvg {
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}
.s-edit {
  position: absolute;
  right: 10px;
  top: 0px;
  cursor: pointer;
}
.s-body {
  grid-template-columns: 80px auto;
  position: relative;
  display: grid;
  flex-direction: column;
  padding: 24px 20px 10px 20px;
}
.s-myLabel {
  text-align: center;
  color: #ff7a00;
  font-weight: 600;
  font-size: 18px;
  margin: 0 0 5px 0;
  line-height: 32px;
}
.s-name {
  margin: 6px 0 6px 0;
  border: none;
  border-bottom: #d0d0d0 solid 1px;
  padding: 2px 8px;
  position: relative;
}
.s-nameInput {
  outline: none;
  width: 100%;
  margin: 6px 0 6px 0;
  border: none;
  border-bottom: #d0d0d0 solid 1px;
  padding: 2px 8px;
}
.s-nameInput::placeholder {
  color: #d0d0d0;
}
.s-memberSvg {
  top: 5px;
  transform: translateX(-5px);
  float: right;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
</style>
