<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  voteWhether: {
    type: Boolean,
    required: true
  }
})
console.log(props.voteWhether)
</script>

<template>
  <div :class="['d-flex', 'align-items-center', 'p-2', 'mb-2']">
    <RouterLink
      class=""
      style="text-decoration: none; color: inherit"
      :to="{ path: '/group/detail', query: { name: props.name } }"
    >
      <img :src="imageSrc" class="rounded-circle me-3" alt="Group Image" width="60" height="60" />
    </RouterLink>

    <RouterLink
      class="d-flex flex-grow-1"
      style="text-decoration: none; color: inherit"
      :to="{ path: '/vote', query: { name: props.name } }"
    >
      <div
        :class="[
          'group-item',
          'd-flex',
          'align-items-center',
          'flex-grow-1',
          'px-3',
          'py-2',
          { 'has-vote': props.voteWhether }
        ]"
      >
        <span>{{ name }}</span>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.group-item {
  border: 2px solid #dcdcdc;
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

.has-vote {
  border-color: #ff7a00;
}
</style>
