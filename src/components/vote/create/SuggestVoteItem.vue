<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  suggestion: Object
})

const emit = defineEmits(['selectSuggestion'])
const suggestion = ref(props.suggestion)

const selectSuggestion = (title) => {
  emit('selectSuggestion', title)
}
</script>

<template>
  <div class="border d-flex justify-content-between align-items-center p-3 my-2">
    <label class="order-1 fw-bold" :for="suggestion.id">{{ suggestion.title }}</label>
    <input
      class="form-check-input order-2 ml-auto"
      type="radio"
      :id="suggestion.id"
      :value="suggestion.title"
      name="suggestion"
      @change="selectSuggestion(suggestion.title)"
    />
  </div>
</template>

<style scoped></style>
