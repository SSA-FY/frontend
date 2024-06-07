<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  },
  groupName: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="d-flex align-items-center p-2 mb-2">
    <img :src="imageSrc" class="rounded-circle me-3" alt="Group Image" width="60" height="60" />
    <div class="group-item d-flex align-items-center flex-grow-1 px-3 py-2">
      <span>{{ groupName }}</span>
    </div>
  </div>
</template>

<style scoped>
.group-item {
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  height: 60px;
  font-size: 20px;
  font-weight: 500;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
}

.group-item:hover,
.group-item:focus,
.group-item:active {
  background-color: #f0f0f0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
