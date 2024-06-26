<script setup>
import { useMemberStore } from '@/stores/memberStore'
import { storeToRefs } from 'pinia'
import { ref, computed, watch } from 'vue'
import createCommentAPI from '@/apis/comment'

const commentAPI = createCommentAPI()
const store = useMemberStore()
const { tag } = storeToRefs(store)
const props = defineProps({
  comment: Object
})
const emit = defineEmits(['reloadComment'])

const comment = ref(props.comment)
watch(
  () => props.comment,
  () => {
    comment.value = props.comment
    comment.value.content = comment.value.content.replaceAll('\\n', '\n')
  },
  { immediate: true }
)
const content2HTML = computed(() => comment.value.content.replaceAll('\n', '<br/>'))
const myComment = computed(() => comment.value.commenter.split('@')[1] == tag.value)
const editContent = ref(null)
const isEditing = ref(false)

const saveEditComment = () => {
  console.log(editContent.value)
  commentAPI.editComment(
    props.comment.commentId,
    editContent.value,
    () => {
      props.comment.content = editContent.value
    },
    () => {
      console.log('수정 실패')
    }
  )
  isEditing.value = false
}
const cancelEdit = () => (isEditing.value = false)
const editing = () => {
  isEditing.value = true
  editContent.value = comment.value.content
}
const removeComment = () => {
  commentAPI.deleteComment(
    props.comment.commentId,
    () => {
      emit('reloadComment')
    },
    () => {
      console.log('삭제 실패')
    }
  )
}
</script>

<template>
  <div class="p-2 my-2" :class="[myComment ? 'my' : 'other']">
    <div v-if="!!myComment" class="d-flex justify-content-end">
      <template v-if="!isEditing">
        <button class="btn btn-success p-1 m-1" @click="editing()">수정</button>
        <button class="btn btn-danger p-1 m-1" @click="removeComment()">삭제</button>
      </template>
      <template v-else>
        <button class="btn btn-primary p-1 m-1" @click="saveEditComment()">저장</button>
        <button class="btn btn-orange p-1 m-1" @click="cancelEdit()">취소</button>
      </template>
    </div>
    <div v-if="!myComment">
      <span class="fw-bold">{{ comment.commenter }}</span>
    </div>
    <div>
      <div v-if="!isEditing" v-html="content2HTML"></div>
      <div v-else>
        <textarea v-model="editContent" class="form-control" rows="3"></textarea>
      </div>
    </div>
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

.btn-orange {
  background-color: #ff7a00;
  color: white;
}
</style>
