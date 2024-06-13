<script setup>
import { ref, watch, computed } from 'vue'
import VoteContents from '@/components/vote/vote/VoteContents.vue'
import TopBackward from '@/components/vote/vote/TopBackward.vue'
import MemberList from '@/components/vote/vote/MemberList.vue'
import Finish from '@/components/vote/finish/Finish.vue'
import voteAPI from '@/apis/vote.js'

const memberId = ref(4)
const teamId = ref(1)
const currentVote = ref(null)
const voteList = ref([])
const idx = ref(0)
const len = computed(() => voteList.value.length)
const getVoteList = () => {
  voteAPI.getVoteList(
    memberId.value,
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
  <h1>투표</h1>
  <TopBackward />
  <VoteContents :voteList="voteList" @change-vote="change" />
  <template v-if="!isLast">
    <MemberList :vote="currentVote" />
  </template>
  <template v-else>
    <Finish />
  </template>
</template>

<style scoped></style>
