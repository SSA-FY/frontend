<!-- 컴포넌트 사용 예시
  <SimpleOkModal 
  v-if="모달오픈 변수" 
  @modal-close="모달닫기 함수">
    내용
  </SimpleOkModal>
-->
<script setup></script>

<template>
  <div class="s-outter" @click="$emit('modalClose')">
    <div class="s-inner" @click.stop>
      <div class="s-content">
        <slot></slot>
      </div>
      <button class="s-button" @click="$emit('modalClose')">닫기</button>
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
.s-content {
  padding: 0 0 8px 3px;
  font-size: 18px;
  margin: 30px 0 28px;
  text-align: center;
}
.s-button {
  float: right;
  border-radius: 8px;
  color: white;
  padding: 3px 10px;
  width: 65px;
  background-color: white;
  border: solid 1px #ff7a00;
  color: #ff7a00;
}
</style>
