<!-- 컴포넌트 사용 예시
<BottomOrangeButton @click="클릭시 동작할 함수"> 확인 </BottomOrangeButton>
-->

<script setup></script>

<template>
  <div class="s-bottom">
    <slot></slot>
  </div>
</template>

<style scoped>
.s-bottom {
  cursor: pointer;
  position: sticky;
  bottom: 0;
  top: calc(100% - 42px);
  max-width: 500px;
  width: 100%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  height: 42px;
  color: white;
  font-size: 22px;
  line-height: 42px;
  font-weight: 600;
  text-align: center;
  background-color: #ff7a00;
  z-index: 200;
}
</style>
