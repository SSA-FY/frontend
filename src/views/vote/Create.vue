<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Suggestions from '@/components/vote/create/Suggestions.vue'
import VoteButton from '@/components/vote/create/VoteButton.vue'
import voteAPI from '@/apis/vote.js'
const selectedSuggestion = ref('')
const question = ref('')
const memberId = ref('')
const teamId = ref('')

const change = (payload) => {
  selectedSuggestion.value = payload
}

const router = useRouter()

const moveGroupPage = () => {
  router.push('/group')
}

const createVote = () => {
  // memberId.value = '5a574b34-a3af-4b3c-bf7a-82376d70b853'
  memberId.value = 1
  teamId.value = 1
  if (question.value != '') {
    voteAPI.createVote(
      memberId.value,
      teamId.value,
      { content: question.value, backgroundUrl: 'null' },
      () => {
        moveGroupPage()
      },
      () => {
        console.log('저장실패')
      }
    )
  } else if (selectedSuggestion.value != null && selectedSuggestion.value != '') {
    voteAPI.createVote(
      memberId.value,
      teamId.value,
      { content: selectedSuggestion.value, backgroundUrl: 'null' },
      () => {
        moveGroupPage()
      },
      () => {
        console.log('저장실패')
      }
    )
  } else {
    alert('질문을 입력해주세요')
  }
}
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
          v-model="question"
        ></textarea>
      </div>
      <Suggestions v-model="selectedSuggestion" @selectSuggestions="change" />
    </div>
    <VoteButton class="p-0" @click="createVote">투표 생성</VoteButton>
  </div>
</template>

<style scoped>
.card {
  border: 0px;
  margin-top: 20px;
}
</style>
