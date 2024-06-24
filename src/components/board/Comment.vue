<script setup>
import { useMemberStore } from '@/stores/memberStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import createCommentAPI from '@/apis/comment';

const commentAPI = createCommentAPI();
const store = useMemberStore()
const { tag } = storeToRefs(store)
const props = defineProps({
  comment: Object
})
const content = computed(()=>props.comment.content)
const content2HTML = computed(() => props.comment.content.replace('\n', '<br/>'))
const myComment = computed(() => props.comment.commenter.split('@')[1] == tag.value)

const isEditing = ref(false)

const saveEditComment = () => {
  editing.value = false
  
}

const editing = ()=>isEditing.value = true
</script>

<template>
  <div class="p-2 my-2" :class="[myComment ? 'my' : 'other']">
    <div v-if="!!myComment" class="d-flex justify-content-end">
      <template v-if="isEditing">
        <button  class="btn btn-success p-1 m-1" @click="editing()">수정</button>
        <button class="btn btn-danger p-1 m-1" @click="removeComment()">삭제</button>
      </template>
      <template v-else>
        <button class="btn btn-success p-1 m-1" @click="saveEditComment()">저장</button>
        <button class="btn btn-danger p-1 m-1" @click="removeComment()">취소</button>
      </template>
    </div>
    <div v-if="!myComment">
      <span class="fw-bold">{{ comment.commenter }}</span>
    </div>
    <p>
      <v-if></v-if>
      <div v-html="content2HTML"></div>
    </p>
    <div class="text-end text-muted">
      {{ comment.time }}
    </div>
  </div>
</template>

<style scoped>
.my {
  background-color: #ffcd9e;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.other {
  background-color: rgb(240, 240, 240);
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
