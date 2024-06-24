<script setup>
import { ref, watch } from 'vue'
import VoteResultItem from '@/components/board/VoteResultItem.vue'
import Comment from '@/components/board/Comment.vue'
import createCommentAPI from '@/apis/comment'
import createBoardAPI from '@/apis/board'

const props = defineProps({
  boardId: Number
})
const commentAPI = createCommentAPI()
const boardAPI = createBoardAPI()

const boardResult = ref(null)
const commentList = ref(null)
const detailPage = ref(0)
const commentPage = ref(0)

//투표 결과 자세한 정보 가져오기
const getBoardDetail = () => {
  boardAPI.getBoardDetail(
    props.boardId,
    detailPage.value,
    ({ data }) => {
      boardResult.value = data
      console.log('board', data)
    },
    () => {
      console.log('error')
    }
  )
}

//투표에 대한 코멘트 페이징으로 가져오기
const getCommentList = () => {
  commentAPI.getComments(
    props.boardId,
    commentPage.value,
    ({ data }) => {
      commentList.value = data
      console.log('comment', data)
    },
    () => {
      console.log('error')
    }
  )
}

watch(
  commentPage,
  () => {
    getBoardDetail()
  },
  { immediate: true }
)

watch(
  commentPage,
  () => {
    getCommentList()
  },
  { immediate: true }
)
</script>

<template>
  <div class="container">
    <div class="my-3 fw-fold">
      <h3>{{ boardResult.content }}</h3>
      <br />
      <div class="d-flex justify-content-end text-muted">
        <p class="">총 {{ boardResult.totalCnt }}명 투표참여</p>
      </div>
    </div>

    <!-- Voting List -->
    <div>
      <div v-for="(boardItem, index) in boardResult.memberList" :key="boardItem.boardId">
        <VoteResultItem :item="boardItem" />
      </div>
    </div>
    <button class="btn btn-outline-secondary w-100">더보기</button>

    <hr />
    <div class="comments my-3">
      <div v-for="(comment, index) in commentList" :key="index">
        <Comment :comment="comment" />
      </div>
      <div v-for="(comment, index) in comments" :key="index"></div>
    </div>

    <div class="d-flex align-items-center">
      <input type="text" class="form-control" placeholder="댓글 달기" />
      <button class="btn btn-outline-secondary">
        입력
        <!-- <i class="fa fa-arrow-right"></i> -->
      </button>
    </div>
  </div>
</template>

<style scoped></style>
