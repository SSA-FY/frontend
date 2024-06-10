<script setup>
import BottomOrangeButton from '@/components/BottomOrangeButton.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const buttonClick = () => {
  router.push('/group')
}

const groupName = window.history.state.name
const groupDesc = window.history.state.desc
const imgUrl = window.history.state.url
</script>

<template>
  <TopBackward />
  <div>
    <img class="s-myImg" />
    <div class="s-title">
      <h3 class="s-name">{{ groupName }}</h3>
      <h5 class="s-desc">{{ groupDesc }}</h5>
    </div>
  </div>
  <div class="s-content1">
    <div class="s-content2">그룹 만들기 완료!</div>
    곧 멤버들이 초대를 승낙하고 참여할 거에요
  </div>
  <BottomOrangeButton @click="buttonClick"> 확인 </BottomOrangeButton>
</template>

<style scoped>
.s-myImg {
  /* 16:9 */
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  background-color: #d9d9d9;
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
