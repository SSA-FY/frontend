<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Suggestions from '@/components/vote/create/Suggestions.vue'
import VoteButton from '@/components/vote/create/VoteButton.vue'
import createVoteAPI from '@/apis/vote.js'
import NavBar from '@/components/common/NavBar.vue'
import TopBackward from '@/components/vote/vote/TopBackward.vue'

const route = useRoute()

const teamName = ref(route.query.name)
const imgUrl = ref('https://storage.lambda.myeverlastinglove.com/vote/Default.jpeg')
const imgFile = ref(null)
const selectedSuggestion = ref('')
const question = ref('')

const change = (payload) => {
  selectedSuggestion.value = payload
}

const voteAPI = createVoteAPI()

const router = useRouter()

const moveGroupPage = () => {
  router.push('/group')
}

const createVote = () => {
  const formData = new FormData()
  if (imgFile.value != null) {
    formData.append('img', imgFile.value)
  }
  const content = question.value !== '' ? question.value : selectedSuggestion.value
  if (content !== '') {
    const requestVoteDto = JSON.stringify({ content })
    const blob = new Blob([requestVoteDto], { type: 'application/json' })
    formData.append('content', blob)
  } else {
    alert('질문을 입력해주세요')
    return
  }
  voteAPI.createVote(
    teamName.value,
    formData,
    () => {
      moveGroupPage()
    },
    () => {
      console.log('저장실패')
    }
  )
}

const upload = (event) => {
  const input = event.target
  if (input.files) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imgUrl.value = e.target.result
    }
    imgFile.value = input.files[0]

    reader.readAsDataURL(input.files[0])
  }
}
</script>

<template>
  <TopBackward></TopBackward>
  <div class="container">
    <div class="mt-3">
      <h5 class="card-title text-secondary ps-3">친구들에게 물어볼 질문을</h5>
      <h5 class="card-title text-secondary ps-3">직접 만들어보세요🚀</h5>

      <div class="form-group px-3 pt-2">
        <div
          class="square"
          :style="{
            backgroundImage: `url(${imgUrl})`
          }"
        >
          <div class="inner d-flex align-items-center justify-content-center">
            <textarea
              type="text"
              class="question-text h2 text-white p-3 m-2"
              v-model="question"
              placeholder="질문을 입력하세요"
              rows="4"
            >
            </textarea>
            <label for="upload" class="change-image border"> 이미지 변경 </label>
            <input
              type="file"
              @change="upload"
              class="d-none"
              accept="image/png, image/gif, image/jpeg"
              id="upload"
            />
          </div>
        </div>
      </div>
      <Suggestions v-model="selectedSuggestion" @selectSuggestions="change" />
      <VoteButton class="p-0" @click="createVote">투표 생성</VoteButton>
    </div>
    <NavBar />
  </div>
</template>

<style scoped>
.container {
  min-height: 90vh;
}
.card {
  border: 0px;
  margin-top: 20px;
}
.square {
  width: 100%;
  position: relative;
  background-size: 100% 100%;
}

.square:after {
  content: '';
  display: block;
  padding-bottom: 100%;
}

.inner {
  position: absolute;
  width: 100%;
  height: 100%;
}
.question-text {
  width: 90%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}
.question-text::placeholder {
  color: white;
}
.change-image {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 5px 10px;
}
</style>
