<script setup>
import MemberItem from '@/components/vote/vote/MemberItem.vue'
import MemberResultItem from '@/components/vote/vote/MemberResultItem.vue'
import { ref, watch, reactive } from 'vue'
import createVoteAPI from '@/apis/vote.js'

const props = defineProps({
  vote: Object,
  name: String
})
const vote = reactive({
  voteId: null,
  content: '',
  imgUrl: '',
  voteWhether: false
})
const voteAPI = createVoteAPI()

const teamName = ref(props.name)
const votees = ref([])
const voteeResults = ref([])

const initializeVote = () => {
  if (props.vote) {
    vote.voteId = props.vote.voteId
    vote.content = props.vote.content
    vote.imgUrl = props.vote.imgUrl
    vote.voteWhether = props.vote.voteWhether
  }
}

watch(
  () => props.vote,
  () => {
    initializeVote()
  },
  { immediate: true }
)

const updateResult = () => {
  vote.voteWhether = true
  props.vote.voteWhether = true
}

const getMemberResultList = () => {
  voteAPI.getMemberResultItems(
    props.vote.voteId,
    ({ data }) => {
      voteeResults.value = data
    },
    () => {
      console.log('error')
    }
  )
}

const getMemberItemList = () => {
  voteAPI.getMemberItems(
    teamName.value,
    ({ data }) => {
      votees.value = data
    },
    () => {
      console.log('error')
    }
  )
}
const getData = () => {
  if (vote.voteWhether) {
    getMemberResultList()
  } else {
    getMemberItemList()
  }
}
watch(
  vote,
  () => {
    getData()
  },
  { immediate: true }
)
</script>
<template>
  <div class="p-2 mt-1">
    <template v-if="vote.voteWhether">
      <h2 class="fw-bold">실시간 결과 <span class="emoji">🔥</span></h2>
    </template>
    <template v-else>
      <h2 class="fw-bold">누구야?</h2>
    </template>

    <div class="d-flex flex-wrap justify-content-around">
      <template v-if="vote.voteWhether">
        <MemberResultItem
          v-for="voteeResult in voteeResults"
          :key="voteeResult.id"
          :votee="voteeResult"
        />
      </template>
      <template v-else>
        <MemberItem
          v-for="votee in votees"
          :key="votee.memberId"
          :votee="votee"
          :vote="props.vote"
          @do-vote="updateResult"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.2rem;
  margin-bottom: 20px;
}
</style>
