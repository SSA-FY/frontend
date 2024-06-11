<script setup>
import addMemberIcon from '@/assets/imgs/addMember.svg'
import pictureIcon from '@/assets/imgs/picture.svg'
import closeIcon from '@/assets/imgs/close.svg'

import TopBackward from '@/components/TopBackward.vue'
import BottomOrangeButton from '@/components/BottomOrangeButton.vue'
import MemberInviteModal from '@/components/modals/MemberInvite.vue'
import ConfirmModal from '@/components/modals/Confirm.vue'

import { reactive, watchEffect, toRaw } from 'vue'
import { useRouter } from 'vue-router'
// =================================================
const group = reactive({ name: '첫 만남은 너무 어려워', desc: '계획대로 되는건 없어' })
const nickName = reactive({ nickName: '' })
const memberList = reactive([])
// watchEffect(() => {
//   console.log('=========input===========')
//   console.log(group.name)
//   console.log(group.desc)
//   console.log(nickName.nickName)
//   console.log(toRaw(memberList))
//   console.log('=========================')
// })
const deleteThis = (index) => {
  memberList.splice(index, 1)
}
// =================================================
const modal = reactive({ invite: false, create: false })
const router = useRouter()
const buttonClick = () => {
  // 유효성 검사
  router.push({
    path: '/group/create-success',
    state: { name: group.name, desc: group.desc, url: '' }
  })
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
    @confirm="buttonClick"
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
      <img class="s-groupImg" />
      <img class="s-pictureSvg" :src="pictureIcon" />
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
      <label class="s-myLabel" for="inputNickName">내 이름</label>
      <input
        type="text"
        class="s-myInput"
        v-model="nickName.nickName"
        id="inputNickName"
        maxlength="10"
      />
      <label class="s-myLabel" for=""
        >멤버
        <img class="s-memberSvg" :src="addMemberIcon" @click="modal.invite = true" />
      </label>
      <div class="s-member" v-for="(value, index) in memberList" :key="index">
        {{ value }} <img class="s-closeSvg" :src="closeIcon" @click="deleteThis(index)" />
      </div>
    </div>
  </form>
  <BottomOrangeButton @click="group.name ? (modal.create = true) : ''">만들기</BottomOrangeButton>
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
