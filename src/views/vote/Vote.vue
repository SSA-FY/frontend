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
import { useRoute } from 'vue-router'

const route = useRoute()
const voteAPI = createVoteAPI()
const teamName = ref(route.query.name)
console.log(teamName.value)
const currentVote = ref(null)
const voteList = ref([])
const idx = ref(0)
const len = computed(() => voteList.value.length)
const getVoteList = () => {
  console.log(teamName.value)
  voteAPI.getVoteList(
    teamName.value,
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
  teamName,
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
      <NoVote :name="teamName" />
    </template>
    <template v-else>
      <VoteContents :voteList="voteList" @change-vote="change" :name="teamName" />
      <hr />
      <template v-if="!isLast">
        <MemberList :vote="currentVote" :name="teamName" />
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
