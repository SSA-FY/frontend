<script setup>
import { defineEmits } from 'vue'
import SuggestVoteItem from '@/components/vote/SuggestVoteItem.vue'

const suggestions = [
  { title: '강아지 닮은 사람', id: 1 },
  { title: '같이 여행 가고 싶은 친구', id: 2 },
  { title: '선물과 같은 친구', id: 3 }
]
</script>

<template>
  <div class="p-3">
    <h6 class="mt-4 fw-bold fs-4 pb-2">이런 질문 어때요</h6>
    <div v-for="(suggestion, index) in suggestions" :key="index">
      <SuggestVoteItem :suggestion="suggestion"></SuggestVoteItem>
    </div>
  </div>
</template>

<style scoped></style>
