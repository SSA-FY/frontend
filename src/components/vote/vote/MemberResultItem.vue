<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  votee: Object
})

const gradientStyle = computed(
  () => `background: linear-gradient(to right, #ff7a00, white ${props.votee.percent * 100}%)`
)
</script>

<template>
  <div class="member-item d-flex align-items-center p-2 m-2" :style="gradientStyle">
    <img :src="props.votee.profileImgUrl" alt="" class="avatar rounded-circle mr-2" />
    <div>
      <div class="name ps-2">{{ votee.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.member-item {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 150px;
  text-align: center;
}
.member-item:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.avatar {
  width: 50px;
  height: 50px;
}
.name {
  font-weight: bold;
}
.gradient {
  background: linear-gradient(to right, #ff7a00, white 10%);
}
</style>
