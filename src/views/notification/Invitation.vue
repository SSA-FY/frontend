<script setup>
import BottomOrangeButton from '@/components/BottomOrangeButton.vue'
import TopBackward from '@/components/TopBackward.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
// =================================================
// TODO: api로 그룹정보 받아오기
const groupInfo = reactive({
  id: 1,
  name: '싸피 11반 11기',
  desc: '안녕하세요! 싸피 11반 11기 투표방입니다!',
  leader: '냥냥이@cat',
  url: ''
})
const myName = reactive({ myName: '' })
const memberList = reactive([
  '병익이사칭 @byeong_elk',
  '최병익 @byeong_e1k',
  '병익이팬클럽 @byeong_lov2',
  '병익이팬 @byeong_love',
  '병익 @byeong_cik',
  '병익이 @byeong_eik',
  '윰 @youm_0'
])
// =================================================
const check = reactive({ impossible: false })
const router = useRouter()
const buttonClick = () => {
  // TODO: 닉네임 중복처리하고 api보내기
  check.impossible = true
  // router.push({
  //   path: '/notification'
  // })
}
</script>

<template>
  <TopBackward></TopBackward>
  <form @submit.prevent>
    <div class="s-top">
      <!-- TODO: 사진 URL넣기 -->
      <img class="s-groupImg" />
      <div class="s-title">
        <h3 class="s-groupName">{{ groupInfo.name }}</h3>
        <h5 class="s-groupDesc">{{ groupInfo.desc }}</h5>
      </div>
    </div>
    <div class="s-body">
      <div class="s-orangeText" for="inputGroupName">그룹장</div>
      <div class="s-name">
        {{ groupInfo.leader }}
      </div>
      <label class="s-orangeText" for="inputNickName">내 이름</label>
      <div>
        <input
          type="text"
          class="s-myInput"
          v-model="myName.myName"
          id="inputName"
          maxlength="10"
        />
        <div v-if="check.impossible" class="s-redLine">이미 존재하는 닉네임입니다</div>
      </div>
      <div class="s-orangeText" for="inputGroupDesc">멤버</div>
      <div>
        <div class="s-name" v-for="member in memberList" key="member">{{ member }}</div>
      </div>
    </div>
  </form>
  <BottomOrangeButton @click="buttonClick">참여하기</BottomOrangeButton>
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
.s-title {
  position: absolute;
  top: 22px;
  left: 20px;
  z-index: 2;
}
.s-myInput {
  margin: 2px 0 4px 0;
  border: #d0d0d0 solid 1px;
  padding: 2px 8px;
  border-radius: 4px;
  width: 100%;
}
.s-myInput:focus {
  outline: none;
  border: #ff7a00 solid 1px;
}
.s-redLine {
  color: #e5503c;
  font-size: 12px;
  padding: 0 0 0 8px;
  margin-bottom: 8px;
}
.s-groupName {
  font-size: 32px;
  font-weight: 500;
}
.s-groupDesc {
  font-size: 24px;
  font-weight: 500;
}
.s-body {
  grid-template-columns: 80px auto;
  position: relative;
  display: grid;
  flex-direction: column;
  padding: 24px 20px 10px 20px;
}
.s-orangeText {
  text-align: center;
  color: #ff7a00;
  font-weight: 600;
  font-size: 18px;
  margin: 0 0 5px 0;
  line-height: 32px;
}
.s-name {
  margin: 3px 0 6px 0;
  border: none;
  border-bottom: #d0d0d0 solid 1px;
  padding: 2px 8px;
  position: relative;
}
</style>
