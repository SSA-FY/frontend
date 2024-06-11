<script setup>
import editIcon from '@/assets/imgs/edit.svg'
import leaveIcon from '@/assets/imgs/leave.svg'
import successIcon from '@/assets/imgs/success.svg'
import addMemberIcon from '@/assets/imgs/addMember.svg'
import docPencilIcon from '@/assets/imgs/docPencil.svg'

import BottomOrangeButton from '@/components/BottomOrangeButton.vue'
import TopBackward from '@/components/TopBackward.vue'
import MemberInviteModal from '@/components/modals/MemberInvite.vue'
import ConfirmModal from '@/components/modals/Confirm.vue'
import SingleOkModal from '@/components/modals/SingleOk.vue'
import SimpleOkModal from '@/components/modals/SimpleOk.vue'

import { reactive, watchEffect, toRaw } from 'vue'
import { useRouter } from 'vue-router'
// =================================================
const groupInfo = reactive({
  id: 1,
  name: '싸피 11반 11기',
  desc: '안녕하세요! 싸피 11반 11기 투표방입니다!',
  leader: '냥냥이@cat'
})
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
const newName = reactive({ name: '' })
const changeName = () => {
  // TODO: 이름 변경 기능 구현
  if (newName.name.length > 0) {
    console.log('이름변경!')
    check.impossible = true
  }
}
// =================================================
const modal = reactive({ invite: false, leave: false })
const check = reactive({ editing: false, impossible: false, single: false, simple: false })
const router = useRouter()
const buttonClick = () => {
  router.push({
    path: '/boards'
    // TODO: group 관련 정보 넘겨주기
  })
}
const leaveGroup = () => {
  // TODO: group 나가기 기능 구현
  modal.leave = false
  if (groupInfo.leader == memberList.myName) {
    modal.simple = true
  }
}
</script>

<template>
  <!-- Modal 1 -->
  <MemberInviteModal
    v-if="modal.invite"
    @invite="
      () => {
        modal.invite = false
        modal.single = true
      }
    "
    @modal-close="modal.invite = false"
  />
  <!-- Modal 2 -->
  <SingleOkModal v-if="modal.single" @ok="modal.single = false">
    <template v-slot:title>초대 완료</template>
    <template v-slot:content>곧 멤버들이 초대를 승낙하고 참여할거에요</template>
  </SingleOkModal>
  <!-- Modal 3 -->
  <ConfirmModal
    v-if="modal.leave"
    @confirm="leaveGroup"
    @modal-close="modal.leave = false"
    color="red"
  >
    <template v-slot:title>그룹 나가기</template>
    <template v-slot:content>
      정말로<br />
      '{{ groupInfo.name }}' 그룹을<br />
      나가시겠어요?
    </template>
    <template v-slot:buttonName>나가기</template>
  </ConfirmModal>
  <!-- Modal 4 -->
  <SimpleOkModal v-if="modal.simple" @modal-close="modal.simple = false"
    >그룹장은 그룹을 나갈 수 없습니다</SimpleOkModal
  >
  <!-- Page -->
  <TopBackward>
    <template v-slot:right> <img :src="leaveIcon" @click="modal.leave = true" /></template
  ></TopBackward>
  <form @submit.prevent>
    <div class="s-top">
      <img class="s-myImg" />
      <div class="s-title">
        <h3 class="s-groupName">{{ groupInfo.name }}</h3>
        <h5 class="s-desc">{{ groupInfo.desc }}</h5>
      </div>
      <img
        v-if="groupInfo.leader == memberList.myName"
        class="s-pencilSvg"
        @click="
          $router.push({
            path: '/group/edit',
            state: { id: groupInfo.id }
          })
        "
        :src="docPencilIcon"
      />
    </div>
    <div class="s-body">
      <div class="s-myLabel" for="inputGroupName">그룹장</div>
      <div class="s-me">
        <div v-if="check.editing && groupInfo.leader == memberList.myName">
          <input class="s-nameInput" v-model="newName.name" :placeholder="memberList.myName" />
          <img class="s-edit" @click="changeName" :src="successIcon" />
          <div v-if="check.impossible" class="s-redLine">이미 존재하는 닉네임입니다</div>
        </div>
        <div v-else class="s-name">
          {{ memberList.myName }}
          <img
            v-if="groupInfo.leader == memberList.myName"
            class="s-edit"
            @click="check.editing = true"
            :src="editIcon"
          />
        </div>
      </div>
      <div class="s-myLabel" for="inputGroupDesc">멤버</div>
      <div>
        <div v-if="groupInfo.leader != memberList.myName" class="s-me">
          <div v-if="check.editing">
            <input class="s-nameInput" v-model="newName.name" :placeholder="memberList.myName" />
            <img class="s-edit" @click="changeName" :src="successIcon" />
            <div v-if="check.impossible" class="s-redLine">이미 존재하는 닉네임입니다</div>
          </div>
          <div v-else class="s-name">
            {{ memberList.myName }}
            <img class="s-edit" @click="check.editing = true" :src="editIcon" />
          </div>
        </div>
        <img v-else class="s-memberSvg" :src="addMemberIcon" @click="modal.invite = true" />
        <div class="s-name" v-for="member in memberList.other" key="member">{{ member }}</div>
      </div>
    </div>
  </form>

  <BottomOrangeButton @click="buttonClick"> 스토리 🗒️</BottomOrangeButton>
</template>

<style scoped>
.s-top {
  position: relative;
}
.s-myImg {
  /* 16:9 */
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  background-color: #d9d9d9;
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
