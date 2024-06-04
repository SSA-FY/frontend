<script setup>
import { ref } from 'vue'
import Suggestions from '@/components/vote/Suggestions.vue'
import VoteButton from '@/components/vote/VoteButton.vue'

const selectedSuggestion = ref('')
</script>

<template>
  <!-- <h1>투표 만들기</h1> -->
  <div class="card-header">그룹 이름</div>

  <div class="card">
    <div class="card-body mt-3">
      <h5 class="card-title text-secondary ps-3">친구들에게 물어볼 질문을</h5>
      <h5 class="card-title text-secondary ps-3">직접 만들어보세요🚀</h5>
      <div class="form-group px-3 pt-2">
        <textarea
          class="form-control border border-2 border-black rounded-0"
          rows="4"
          placeholder="질문을 입력하세요"
        ></textarea>
      </div>
      <Suggestions v-model="selectedSuggestion" />
      <VoteButton></VoteButton>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-top: 20px;
}
</style>
