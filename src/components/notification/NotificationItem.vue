<script setup>
import { defineProps, computed } from 'vue'
import invitationImg from '@/assets/imgs/invitation-img.svg'
import expiredVoteImg from '/src/assets/imgs/vote-result-img.svg'
import VoteImg from '/src/assets/imgs/default-img.webp'

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: false
  },
  expiredVoteNotification: {
    type: Object,
    required: false
  },
  invitionNotification: {
    type: Object,
    required: false
  },
  voteNotification: {
    type: Object,
    required: false
  }
})

const info = computed(() => {
  switch (props.type) {
    case 'Vote':
      return {
        icon: VoteImg,
        link: `/notification/vote/${props.voteNotification.voteId}`,
        title: '누군가 나를 선택했어요!'
      }
    case 'Invitation':
      return {
        icon: invitationImg,
        link: `/notification/invitation?teamname=${props.invitionNotification.teamName}`,
        title: '새로운 그룹에 초대되었어요!'
      }
    case 'ExpiredVote':
      return {
        icon: expiredVoteImg,
        link: `/vote/finish?voteid=${props.expiredVoteNotification.expiredVoteId}`,
        title: '결과가 나왔어요!'
      }
    default:
      return VoteImg
  }
})
</script>

<template>
  <RouterLink :to="info.link" style="text-decoration: none; color: inherit">
    <div class="p-3 mb-3 border-bottom d-flex justify-content-between">
      <div>
        <div class="d-flex align-items-center mb-0">
          <span class="title">{{ info.title }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div>
            <span class="description" v-if="voteNotification">{{
              voteNotification.voteTitle
            }}</span>
            <span class="description" v-else-if="invitionNotification">{{
              invitionNotification.teamName
            }}</span>
            <span class="description" v-else-if="expiredVoteNotification">{{
              expiredVoteNotification.expiredVoteTitle
            }}</span>
          </div>
          <!-- <span class="date me-2">{{ date }}</span>  시간 넣을까 생각중-->
        </div>
        <div v-if="voteNotification" class="d-flex mt-2">
          <img
            v-for="n in voteNotification.voteInfoItems.length"
            :key="n"
            src="/src/assets/imgs/person-svgrepo-com.svg"
            alt=""
            class="vote-count-img"
          />
        </div>
      </div>
      <div v-if="type !== 'vote'">
        <img :src="info.icon" alt="Icon" width="60" height="60" />
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.date {
  font-weight: bold;
  color: lightgray;
}
.title {
  font-weight: bold;
  font-size: 18px;
}
.description {
  color: #555;
  font-size: 16px;
}
.icon {
  border-radius: 50%;
}
.vote-count-img {
  width: 35px;
}
</style>
