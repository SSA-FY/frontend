<!-- <script setup>
import { defineProps, ref } from 'vue'

const props = defineProps(['suggestion'])
const suggestion = ref(props.suggestion)
</script>

<template>
  <div class="border">
    <input
      class="form-check-input order-2"
      type="radio"
      :id="suggestion.id"
      :value="suggestion.title"
      name="suggestion"
    />
    <label class="form-check-label order-1" :for="suggestion.id">{{ suggestion.title }}</label>
  </div>
</template>

<style scoped>
.border {
  margin-bottom: 10px;
  padding: 10px;
}
.form-check-label {
  flex-grow: 1;
}
.form-check-input {
  margin-left: auto;
}
</style> -->
<template>
  <div class="border d-flex justify-content-between align-items-center p-3 my-2">
    <label class="order-1 fw-bold" :for="suggestion.id">{{ suggestion.title }}</label>
    <input
      class="form-check-input order-2 ml-auto"
      type="radio"
      :id="suggestion.id"
      :value="suggestion.title"
      name="suggestion"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  suggestion: Object
})
</script>

<style scoped></style>
