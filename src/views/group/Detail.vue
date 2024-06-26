<script setup>
import createGroupAPI from '@/apis/group.js'

import BottomOrangeButton from '@/components/BottomOrangeButton.vue'
import TopBackward from '@/components/TopBackward.vue'
import MemberInviteModal from '@/components/modals/MemberInvite.vue'
import ConfirmModal from '@/components/modals/Confirm.vue'
import SingleOkModal from '@/components/modals/SingleOk.vue'
import SimpleOkModal from '@/components/modals/SimpleOk.vue'

import { reactive, watchEffect, toRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

const teamName = route.query.name
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

// =================================================

import { useMemberStore } from '@/stores/memberStore'
const my = useMemberStore()
const myTag = my.tag
const myName = reactive({ current: '', new: '' })

const changeName = () => {
  console.log(myName)
  // TODO: patch 에러 해결
  if (myName.new.length > 0) {
    console.log('이름변경!')

    groupAPI.changeMyname(
      myName.new,
      teamName,
      (res) => {
        console.res
      },
      (err) => {
        console.log(err)
        check.impossible = true
      }
    )
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
        if (m.memberTag == myTag) {
          myName.current = m.nickname
        } else if (m.memberTag != group.managerTag) {
          memberList.push(m)
        }
      })

      // 이 그룹 멤버가 아니면
      if (myName.current == '') {
        router.push({
          path: '/group'
        })
      }
    },
    (err) => {
      console.log(err)
    }
  )
}
// =================================================
const modal = reactive({ invite: false, leave: false })
const check = reactive({ editing: false, impossible: false, single: false, simple: false })
const buttonClick = () => {
  router.push({
    path: '/boards'
    // TODO: group 관련 정보 넘겨주기
  })
}
const leaveGroup = () => {
  // TODO: group 나가기 기능 구현
  modal.leave = false

  if (group.managerTag == myTag && memberList.lengt > 0) {
    modal.simple = true
  } else {
    groupAPI.leaveGroup(
      teamName,
      () => {
        router.push({
          path: '/group'
        })
      },
      (err) => {
        console.log(err)
      }
    )
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
      '{{ group.name }}' 그룹을<br />
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
    <template v-slot:right>
      <img src="/src/assets/imgs/leave.svg" @click="modal.leave = true" /></template
  ></TopBackward>
  <form @submit.prevent v-if="group.id != undefined">
    <div class="s-top">
      <div class="s-imgContainer"><img class="s-myImg" :src="group.img" /></div>
      <div class="s-title">
        <h3 class="s-groupName">{{ group.name }}</h3>
        <h5 class="s-desc">{{ group.desc }}</h5>
      </div>
      <img
        v-if="group.managerTag == myTag"
        class="s-pencilSvg"
        @click="
          $router.push({
            path: '/group/edit',
            state: { name: group.name }
          })
        "
        src="/src/assets/imgs/docPencil.svg"
      />
    </div>
    <div class="s-body">
      <div class="s-myLabel" for="inputGroupName">그룹장</div>
      <div class="s-me">
        <div v-if="check.editing && group.managerTag == myTag">
          <input class="s-nameInput" v-model="myName.new" :placeholder="group.managerName" />
          <img class="s-edit" @click="changeName" src="/src/assets/imgs/success.svg" />
          <div v-if="check.impossible" class="s-redLine">이미 존재하는 닉네임입니다</div>
        </div>
        <div v-else class="s-name">
          {{ group.managerName }} @{{ group.managerTag }}
          <img
            v-if="group.managerTag == myTag"
            class="s-edit"
            @click="check.editing = true"
            src="/src/assets/imgs/edit.svg"
          />
        </div>
      </div>
      <div class="s-myLabel" for="inputGroupDesc">멤버</div>
      <div>
        <div v-if="group.managerTag != myTag" class="s-me">
          <div v-if="check.editing">
            <input class="s-nameInput" v-model="myName.new" :placeholder="myName.current" />
            <img class="s-edit" @click="changeName" src="/src/assets/imgs/success.svg" />
            <div v-if="check.impossible" class="s-redLine">이미 존재하는 닉네임입니다</div>
          </div>
          <div v-else class="s-name">
            {{ myName.current }} @{{ myTag }}
            <img class="s-edit" @click="check.editing = true" src="/src/assets/imgs/edit.svg" />
          </div>
        </div>
        <img
          v-else
          class="s-memberSvg"
          src="/src/assets/imgs/addMember.svg"
          @click="modal.invite = true"
        />
        <div class="s-name" v-for="m in memberList" key="member">
          {{ m.nickname }} @{{ m.memberTag }}
        </div>
      </div>
    </div>
  </form>

  <BottomOrangeButton @click="buttonClick"> 스토리 🗒️</BottomOrangeButton>
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
