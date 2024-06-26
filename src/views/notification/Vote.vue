<script setup>
import NotificationVoteItem from '@/components/notification/NotificationVoteItem.vue'
import { lambdaAxios } from '@/utils/axios'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const lambda = lambdaAxios()

const voteNotification = ref({})

watchEffect(() => {
  lambda
    .get(`/voteinfo/list/${route.params.voteid}`)
    .then((res) => {
      console.log(res.data)
      voteNotification.value = res.data
    })
    .catch((error) => {
      console.error(error)
    })
})

const update = () => {
  console.log('update!')
  lambda
    .get(`/voteinfo/list/${route.params.voteid}`)
    .then((res) => {
      console.log(res.data)
      voteNotification.value = res.data
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <div class="container mt-5">
    <h1 class="main-title">나를 뽑은 사람</h1>
    <p class="sub-title">{{ voteNotification.content }}</p>
    <div class="mt-4">
      <div v-for="item in voteNotification.responseVoteInfoToMeDtoList" :key="item.voteInfoId">
        <NotificationVoteItem
          :tag="item.voterTag"
          :isOpen="item.isOpen"
          :opinion="item.opinion"
          :voteInfoId="item.voteInfoId"
          @update="update"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
.main-title {
  font-size: 24px;
  font-weight: bold;
}
.sub-title {
  font-size: 18px;
  color: gray;
}
</style>
