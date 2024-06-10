<script setup>
import pictureIcon from '@/assets/imgs/picture.svg'
import TopBackward from '@/components/TopBackward.vue'
import BottomOrangeButton from '@/components/BottomOrangeButton.vue'
import ConfirmModal from '@/components/modals/Confirm.vue'

const groupId = window.history.state.id

import { reactive } from 'vue'
import { useRouter } from 'vue-router'
// TODO: api로 그룹정보 받아오기
const groupInfo = reactive({
  name: '싸피 11반 11기',
  desc: '안녕하세요! 싸피 11반 11기 투표방입니다!',
  url: '',
  leader: '냥냥이@cat'
})
// TODO: 멤버가져오기
const memberList = reactive({
  myName: '냥냥이@cat',
  other: [
    '병익이사칭 @byeong_elk',
    '최병익 @byeong_e1k',
    '병익이팬클럽 @byeong_lov2',
    '병익이팬 @byeong_love',
    '병익 @byeong_cik',
    '병익이 @byeong_eik',
    '윰 @youm_0'
  ]
})
const modal = reactive({ confirm: false })
// =================================================
const leaderClick = (e) => {
  groupInfo.leader = e
}
// =================================================
const router = useRouter()

const buttonClick = () => {
  // TODO: 변경요청
  router.push({
    path: '/group/detail',
    state: { id: groupId }
  })
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
  <form @submit.prevent>
    <div class="s-top">
      <img class="s-groupImg" />
      <img class="s-pictureSvg" :src="pictureIcon" />
    </div>
    <div class="s-body">
      <label class="s-myLabel" for="inputGroupName">그룹명</label>
      <input
        type="text"
        class="s-myInput"
        v-model="groupInfo.name"
        id="inputGroupName"
        maxlength="100"
      />
      <label class="s-myLabel" for="inputGroupDesc">한줄 소개</label>
      <input
        type="text"
        class="s-myInput"
        v-model="groupInfo.desc"
        id="inputGroupDesc"
        maxlength="100"
      />
      <label class="s-myLabel" for="inputNickName">그룹장</label>

      <select class="s-select" @change="leaderClick($event.target.value)" id="leader">
        <option selected>{{ memberList.myName }}</option>
        <option v-for="member in memberList.other" :key="member">{{ member }}</option>
      </select>
    </div>
  </form>
  <BottomOrangeButton @click="groupInfo.name ? (modal.confirm = true) : ''"
    >완료</BottomOrangeButton
  >
</template>

<style scoped>
.s-top {
  position: relative;
}
.s-groupImg {
  /* 16:9 */
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  background-color: #d9d9d9;
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
