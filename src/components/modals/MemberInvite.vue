<!-- 컴포넌트 사용 예시
  <MemberInviteModal
    v-if="modal.invite"
    @invite="추가 누른후 동작할 함수" 
    @modal-close="모달닫기 함수"
    type="create혹은detail"
    v-model:memberList="memberList"
  />
-->

<!-- .value is for defineModel only -->

<script setup>
import { reactive } from 'vue'
import createInviteAPI from '@/apis/invite.js'
const inviteAPI = createInviteAPI()

const searchList = reactive([])
const pickList = reactive([])
const memberList = defineModel('memberList', {
  type: Array
})
const { type } = defineProps(['type'])

// =================================================

const search = (value) => {
  const tag = value.target.value.trim()
  if (tag == '') return
  inviteAPI.searchMember(
    tag,
    (res) => {
      //searchList 배열 업데이트
      searchList.length = 0
      const newArr = res.data
      newArr.forEach((e) => {
        searchList.push({
          id: e.memberId,
          name: e.name + ' @' + e.tag
        })
      })
    },
    () => {
      console.log('search error')
    }
  )
}
const addThis = (value) => {
  if (!pickList.includes(value)) {
    pickList.unshift(value)
  }
}
const deleteThis = (index) => {
  pickList.splice(index, 1)
}

// =================================================

import { useMemberStore } from '@/stores/memberStore'
const member = useMemberStore()
const myId = member.memberId

const finish = () => {
  if (type == 'create') {
    const members = JSON.stringify(memberList.value)
    for (let i = pickList.length - 1; i >= 0; i--) {
      const e = pickList[i]
      if (!members.includes(e.id) && e.id != myId) {
        memberList.value.push(e)
      }
    }
    pickList.length = 0
  } else if (type == 'detail') {
    // TODO: memberList에 있는 사람인지 판단하고 API추가
    pickList.length = 0
  }
}
</script>

<template>
  <div class="s-outter">
    <div class="s-inner">
      <div class="s-title">멤버 초대</div>
      <div class="s-body">
        <div class="s-searchList">
          <input class="s-myInput" @keyup.enter="search" />
          <div
            v-for="(value, index) in searchList"
            :key="index"
            class="s-search"
            @click="addThis(value)"
          >
            {{ value.name }}
          </div>
        </div>
        <div class="s-pickList">
          <div v-for="(value, index) in pickList" :key="index" class="s-pick">
            {{ value.name }}
            <img class="s-mySvg" src="/src/assets/imgs/close.svg" @click="deleteThis(index)" />
          </div>
        </div>
      </div>
      <div class="s-bottom">
        <button
          class="s-blueButton"
          @click="
            () => {
              finish()
              $emit('invite')
            }
          "
        >
          추가
        </button>
        <button class="s-cancelButton" @click="$emit('modalClose')">취소</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.s-outter {
  position: fixed;
  height: 100%;
  width: 100%;
  background: #00000033;
  z-index: 500;
}

.s-inner {
  /* shadow-md */
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  position: fixed;
  display: inline-block;
  border-radius: 5px;
  background: #fff;
  padding: 15px 15px;
  height: 300px;
  width: 80vw;
  height: 70vh;
  top: 15vh;
  left: 10vw;
  min-width: 297px;
  max-width: 400px;
  z-index: 501;
}
@media screen and (min-width: 500px) {
  .s-inner {
    left: 50px;
  }
}
.s-title {
  padding: 0 0 8px 0;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid #d0d0d0;
}
.s-body {
  padding: 10px 0 2px 0;
  height: 100%;
  position: relative;
}
.s-searchList {
  z-index: 1;
  position: absolute;
  width: 100%;
  background-color: #fff;
  border: solid 1px;
  border-radius: 4px;
  max-height: calc(100% - 100px);
  overflow-y: auto;
}
.s-searchList > :nth-child(2) {
  border-top: solid 1px;
}
.s-search {
  display: none;
  border-top: 1px solid #d0d0d0;
  padding: 2px 8px;
}
.s-search:hover {
  background-color: #f3f3f2;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.s-search:hover,
.s-searchList:hover .s-search,
.s-searchList:focus-within .s-search {
  display: block;
}
.s-myInput {
  width: 100%;
  position: relative;
  padding: 2px 8px;
  border: none;
  border-radius: 4px;
  outline: none;
}
.s-pickList {
  top: 40px;
  position: relative;
  overflow-y: auto;
  height: calc(100% - 120px);
}
.s-mySvg {
  float: right;
  height: 20px;
  width: 20px;
  cursor: pointer;
  transform: translateY(2px);
}
.s-pick {
  border-bottom: 1px solid #d0d0d0;
  padding: 3px 1px 3px 2px;
}
.s-bottom {
  position: absolute;
  bottom: 10px;
  right: 10px;
  margin-top: 10px;
}
.s-blueButton {
  border-radius: 8px;
  background-color: #0054fd;
  color: white;
  border: solid 1px #0054fd;
  margin-right: 4px;
  padding: 3px 10px;
}
.s-cancelButton {
  border-radius: 8px;
  background-color: white;
  color: #0054fd;
  border: solid 1px #0054fd;
  padding: 3px 10px;
}
</style>
