<script setup>
import MemberItem from '@/components/vote/vote/MemberItem.vue'
import MemberResultItem from '@/components/vote/vote/MemberResultItem.vue'
import { defineProps, defineEmits, ref, watch, reactive } from 'vue'
import voteAPI from '@/apis/vote.js'

const props = defineProps(['vote'])
const vote = reactive({
  voteId: null,
  content: '',
  imgUrl: '',
  voteWhether: false
})

const memberId = ref(4)
const teamId = ref(1)
const members = ref([])
const memberResults = ref([])

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
      memberResults.value = data
    },
    () => {
      console.log('error')
    }
  )
}

const getMemberItemList = () => {
  voteAPI.getMemberItems(
    teamId.value,
    ({ data }) => {
      members.value = data
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
  <div class="user-list mt-5">
    <template v-if="vote.voteWhether">
      <h2 class="fw-bold">실시간 결과 <span class="emoji">🔥</span></h2>
    </template>
    <template v-else>
      <h2 class="fw-bold">누구야?</h2>
    </template>

    <div class="d-flex flex-wrap justify-content-around">
      <template v-if="vote.voteWhether">
        <MemberResultItem v-for="member in memberResults" :key="member.id" :member="member" />
      </template>
      <template v-else>
        <MemberItem
          v-for="member in members"
          :key="member.id"
          :member="member"
          :vote="props.vote"
          @do-vote="updateResult"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.user-list {
  padding: 20px;
}
h2 {
  font-size: 1.2rem;
  margin-bottom: 20px;
}
</style>
