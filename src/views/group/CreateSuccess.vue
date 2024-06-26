<script setup>
import createGroupAPI from '@/apis/group.js'

import BottomOrangeButton from '@/components/BottomOrangeButton.vue'
import Confetti from '@/components/Confetti.vue'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

// =================================================

const router = useRouter()
const buttonClick = () => {
  router.push('/group')
}

const teamId = window.history.state.id

if (teamId == undefined) {
  router.push('/group')
}

// =================================================

const group = reactive({ name: '', desc: '', img: '' })
const groupAPI = createGroupAPI()

groupAPI.getGroupInfo(
  teamId,
  (res) => {
    const groupInfo = res.data
    group.name = groupInfo.teamName
    group.desc = groupInfo.description
    group.imgUrl = groupInfo.imgUrl
  },
  () => {
    console.log('error')
  }
)
</script>

<template>
  <div>
    <div>
      <div class="s-imgContainer"><img class="s-myImg" :src="group.imgUrl" /></div>
      <div class="s-title">
        <h3 class="s-name">{{ group.name }}</h3>
        <h5 class="s-desc">{{ group.desc }}</h5>
      </div>
    </div>
    <div class="s-content1">
      <div class="s-content2">그룹 만들기 완료!</div>
      곧 멤버들이 초대를 승낙하고 참여할 거에요
    </div>

    <Confetti />
  </div>
  <BottomOrangeButton @click="buttonClick"> 확인 </BottomOrangeButton>
</template>

<style scoped>
.s-imgContainer {
  position: relative;
  /* 16:9 */
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  border-bottom: solid 1px #d9d9d9;
  background-color: #fdfdfd;
}
.s-myImg {
  /* TODO img 너비 수정 */
  position: absolute;
  width: 100%;
  top: 0;
  object-fit: contain;
  max-height: 100%;
}
.s-title {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
}
.s-name {
  font-size: 32px;
  font-weight: 500;
}
.s-desc {
  font-size: 24px;
  font-weight: 500;
}
.s-content1 {
  padding-top: 30%;
  text-align: center;
}
.s-content2 {
  font-weight: 700;
  font-size: 18px;
  margin: 0 0 8px 0;
}
</style>
