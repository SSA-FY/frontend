<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: Object
})

const gradientStyle = computed(
  () => `background: linear-gradient(to right, #ff7a00, white ${props.item.percent}%)`
)
</script>

<template>
  <div class="d-flex align-items-center my-2 p-2 gradient rounded" :style="gradientStyle">
    <img
      :src="item.profileImgUrl"
      class="rounded-circle"
      style="width: 40px; height: 40px; margin-right: 10px"
    />
    <div class="flex-grow-1">
      <p class="mb-0">{{ item.member }}</p>
      <span class="text-muted">{{ item.username }}</span>
    </div>
    <div class="text-end">
      <p class="mb-0 text-orange fw-bold fs-5">{{ item.percent }}%</p>
      <span class="fw-bold">{{ item.voteCnt }}표</span>
    </div>
  </div>
</template>

<style scoped>
.text-orange {
  color: #ff7a00;
}
</style>
