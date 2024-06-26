<script setup>
import { ref, watch, computed } from 'vue'
import VoteContents from '@/components/vote/vote/VoteContents.vue'
import TopBackward from '@/components/vote/vote/TopBackward.vue'
import MemberList from '@/components/vote/vote/MemberList.vue'
import Finish from '@/components/vote/finish/Finish.vue'
import NoVote from '@/components/vote/vote/NoVote.vue'
import createVoteAPI from '@/apis/vote.js'
import NavBar from '@/components/common/NavBar.vue'
import Confetti from '@/components/Confetti.vue'

const voteAPI = createVoteAPI()
const teamId = ref(1) //props로 넘어와야 함
const currentVote = ref(null)
const voteList = ref([])
const idx = ref(0)
const len = computed(() => voteList.value.length)
const getVoteList = () => {
  voteAPI.getVoteList(
    teamId.value,
    ({ data }) => {
      voteList.value = data
      if (len.value > 0) {
        currentVote.value = voteList.value[0]
      }
    },
    () => {
      console.log('투표 목록 조회 실패')
    }
  )
}
watch(
  teamId,
  () => {
    getVoteList()
  },
  { immediate: true }
)

const isLast = ref(false)
const change = (payload) => {
  currentVote.value = null
  if (idx.value > 0 && payload == -1) {
    idx.value--
  } else if (idx.value < len.value && payload == 1) {
    idx.value++
  }
}
watch(idx, () => {
  isLast.value = idx.value == len.value
  if (!isLast.value) {
    currentVote.value = voteList.value[idx.value]
  }
})
</script>

<template>
  <TopBackward></TopBackward>
  <div class="container">
    <template v-if="voteList.length == 0">
      <NoVote />
    </template>
    <template v-else>
      <VoteContents :voteList="voteList" @change-vote="change" />
      <hr />
      <template v-if="!isLast">
        <MemberList :vote="currentVote" />
      </template>
      <template v-else>
        <Confetti class="position-fixed w-100 h-100 top-0 zindex-100" />
        <Finish />
      </template>
    </template>
  </div>
  <NavBar></NavBar>
</template>
<style scoped>
.container {
  min-height: 90vh;
}
</style>
