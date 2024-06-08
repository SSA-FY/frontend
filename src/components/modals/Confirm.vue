<!-- 컴포넌트 사용 예시
  <ConfirmModal 
  v-if="모달오픈 변수" 
  @confirm="확인 누르면 동작할 함수" 
  @modal-close="모달닫기 함수"
  @color="색깔(red)">
    <template v-slot:title>제목</template>
    <template v-slot:content>내용</template>
    <template v-slot:buttonName>확인버튼 이름</template>
  </ConfirmModal>
-->
<script setup>
const props = defineProps({
  color: { required: false, default: 'orange' }
})
// color 추가 시 아래 코드 수정
const colorCode = props.color == 'red' ? '#fe2c2c' : '#ff7a00'
</script>

<template>
  <div class="outter" @click="$emit('modalClose')">
    <div class="inner" @click.stop>
      <div class="s-title">
        <slot name="title"></slot>
      </div>
      <div>
        <slot name="content"></slot>
      </div>
      <div class="s-bottom">
        <button
          class="s-redButton"
          :style="{ backgroundColor: colorCode, borderColor: colorCode }"
          @click="$emit('confirm')"
        >
          <slot name="buttonName"></slot>
        </button>
        <button
          class="s-cancelButton"
          :style="{ color: colorCode, borderColor: colorCode }"
          @click="$emit('modalClose')"
        >
          취소
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outter {
  position: fixed;
  height: 100%;
  width: 100%;
  background: #00000033;
  z-index: 500;
}
.inner {
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
  height: 200px;
  top: calc(50vh - 120px);
  left: 10vw;
  min-width: 297px;
  max-width: 400px;
  z-index: 501;
}
@media screen and (min-width: 500px) {
  .inner {
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
.s-bottom {
  position: absolute;
  bottom: 10px;
  right: 10px;
  margin-top: 10px;
}
.s-redButton {
  border-radius: 8px;
  color: white;
  margin-right: 4px;
  padding: 3px 10px;
  width: 65px;
  border: solid 1px;
}
.s-cancelButton {
  border-radius: 8px;
  background-color: white;
  padding: 3px 10px;
  width: 62px;
  border: solid 1px;
}
</style>
