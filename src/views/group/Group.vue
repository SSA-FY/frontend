<script setup>
import { ref, watchEffect } from 'vue'
import GroupItem from '@/components/group/GroupItem.vue'
import NavBar from '@/components/common/NavBar.vue'
import { lambdaAxios } from '@/utils/axios'

const groups = ref([])

const lambda = lambdaAxios()

watchEffect(() => {
  lambda
    .get('/team')
    .then((teamList) => {
      console.log(teamList)
      groups.value = teamList.data
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>

<template>
  <div class="container">
    <div class="text-left mt-5 ms-4 main-title">
      <p>My Group</p>
    </div>
    <div class="text-center mt-5">
      <div v-if="groups.length === 0" class="mt-3">
        <h4>참여중인 그룹이 없어요</h4>
        <p>
          기존 그룹에 참여하거나
          <br />
          새로운 그룹을 직접 만들어보세요e.
        </p>
      </div>
      <div v-for="group in groups" :key="group.teamName">
        <GroupItem
          :image-src="group.imgUrl"
          :name="group.teamName"
          :vote-whether="group.voteWhether"
        />
      </div>
      <div class="mt-3">
        <RouterLink to="/group/create">
          <button type="button" class="btn rounded-pill ms-3 group-btn">만들기</button>
        </RouterLink>
      </div>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<style scoped>
.container {
  min-height: 90vh;
}
.main-title {
  border-bottom: 1px solid #ff7a00;
  font-size: 32px;
  font-weight: 500;
}
.group-btn {
  border-color: #ff7a00;
  color: #ff7a00;
}

.group-btn {
  color: #ff7a00;
  border-color: #ff7a00;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.group-btn:hover,
.group-btn:focus,
.group-btn:active {
  background-color: #ff7a00;
  color: white;
}

footer i {
  background-color: black;
}
</style>
