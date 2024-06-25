<script setup>
import { defineProps, computed } from 'vue'

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
    case 'voteNotification':
      return {
        icon: '/src/assets/imgs/default-img.webp',
        link: `/notification/vote?voteid=${props.voteNotification.voteId}`,
        title: '누군가 나를 선택했어요!'
      }
    case 'invitionNotification':
      return {
        icon: '/src/assets/imgs/invitation-img.svg',
        link: `/notification/invitation?teamname=${props.invitionNotification.teamName}`,
        title: '새로운 그룹에 초대되었어요!'
      }
    case 'expiredVoteNotification':
      return {
        icon: '/src/assets/imgs/vote-result-img.svg',
        link: `/vote/finish?voteid=${props.expiredVoteNotification.expiredVoteId}`,
        title: '결과가 나왔어요!'
      }
    default:
      return '/src/assets/imgs/default-img.webp'
  }
})
</script>

<template>
  <RouterLink :to="info.link" style="text-decoration: none; color: inherit">
    <div class="notification-item p-3 mb-3 border-bottom d-flex justify-content-between">
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
          <!-- <RouterLink to="/notification/vote"> -->
          <img
            v-for="n in voteNotification.voteInfoItems.length"
            :key="n"
            src="/src/assets/imgs/person-svgrepo-com.svg"
            alt=""
            class="vote-count-img"
          />
          <!-- </RouterLink> -->
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
