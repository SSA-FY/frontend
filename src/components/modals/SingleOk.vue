<!-- 컴포넌트 사용 예시
  <SingleOkModal 
  v-if="모달오픈 변수" 
  @modal-close="모달닫기 함수"
  @ok="확인 누르면 동작할 함수">
    <template v-slot:title>제목</template>
    <template v-slot:content>내용</template>
  </SingleOkModal>
-->
<script setup></script>

<template>
  <div class="s-outter">
    <div class="s-inner">
      <div class="s-title">
        <slot name="title"></slot>
      </div>
      <div>
        <slot name="content"></slot>
      </div>
      <button class="s-button" @click="$emit('ok')">확인</button>
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
  padding: 20px;
  width: 80vw;
  /* height: 200px; */
  top: calc(50vh - 120px);
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
  padding: 0 0 8px 3px;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid #d0d0d0;
  margin-bottom: 10px;
}
.s-button {
  float: right;
  border-radius: 8px;
  color: white;
  margin-top: 25px;
  padding: 3px 10px;
  width: 65px;
  border: none;
  background-color: #ff7a00;
}
</style>
