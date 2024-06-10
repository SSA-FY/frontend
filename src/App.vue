<script setup>
import { RouterView } from 'vue-router'
// Urls : 임시용
import Urls from '@/components/Urls.vue'
</script>

<template>
  <RouterView />
  <Urls />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');
#app {
  width: 100vw;
  min-width: 350px;
  max-width: 500px;
  min-height: 100vh;
  /* border: 1px #d8d8d8 solid; */

  font-family: 'Noto Sans KR';
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
