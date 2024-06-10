<!-- 컴포넌트 사용 예시
<TopBackward>
  가운데 넣을 멘트
  <template v-slot:right> 오른쪽에 넣을 태그들 </template
></TopBackward>
-->
<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const backUrlList = {
  '/group/create': '/group',
  '/group/detail': '/group',
  //TODO 필요한 정보 전달
  '/group/edit': '/group/detail',
  '/notification/vote': '/notification',
  '/notification/invitation': '/notification',
  '/boards': '/group/detail',
  '/vote': '/group',
  '/vote/finish': '/group',
  '/vote/create': '/group'
  //TODO Mypage Edit 추가
}

const clickBack = () => {
  const url = route.path
  // param들어간 URL 처리하는 부분
  if (url.match(/^\/board\//)) {
    router.push('boards')
  } else {
    router.push(backUrlList[url])
  }
}
</script>

<template>
  <div class="s-top">
    <svg
      @click="clickBack"
      class="s-back"
      width="20"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.292152 11.2128C-0.097384 10.8188 -0.097384 10.1822 0.292152 9.78722L9.53714 0.427512C10.0995 -0.142504 11.0144 -0.142504 11.5777 0.427512C12.14 0.997527 12.14 1.92265 11.5777 2.49267L3.66913 10.5005L11.5777 18.5063C12.14 19.0774 12.14 20.0025 11.5777 20.5725C11.0144 21.1425 10.0995 21.1425 9.53714 20.5725L0.292152 11.2128Z"
        fill="black"
      />
    </svg>
    <slot></slot>
    <div class="s-right"><slot name="right"></slot></div>
  </div>
</template>

<style scoped>
.s-top {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  font-size: 16px;
  font-weight: 600;
  color: #111111;
}
.s-back {
  position: absolute;
  top: 9px;
  left: 10px;
  display: inline-block;
  cursor: pointer;
  padding: 0 0 0 4px;
}
.s-right {
  position: absolute;
  top: 9px;
  right: 10px;
  cursor: pointer;
}
</style>
