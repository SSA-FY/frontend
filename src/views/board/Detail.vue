<script setup>
import { ref, watch } from 'vue'
import VoteResultItem from '@/components/board/VoteResultItem.vue'
import Comment from '@/components/board/Comment.vue'
import createCommentAPI from '@/apis/comment'
import createBoardAPI from '@/apis/board'
import NavBar from '@/components/common/NavBar.vue'
import TopBackward from '@/components/vote/vote/TopBackward.vue'
import InfiniteLoading from 'v3-infinite-loading'

const props = defineProps({
  boardId: String
})
const commentAPI = createCommentAPI()
const boardAPI = createBoardAPI()

const hasNext = ref(true)
const boardResult = ref({ content: null })
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
    },
    () => {
      console.log('error')
    }
  )
}

//투표에 대한 코멘트 페이징으로 가져오기
const getCommentList = () => {
  console.log(commentPage.value)
  commentAPI.getComments(
    props.boardId,
    commentPage.value,
    ({ data }) => {
      if (data.length == 0) {
        hasNext.value = false
        return
      }
      if (commentList.value == null) {
        commentList.value = data
      } else {
        commentList.value = [...commentList.value, ...data]
      }
      commentPage.value++

      console.log('comment', data)
    },
    () => {
      console.log('error')
    }
  )
}

watch(
  detailPage,
  () => {
    getBoardDetail()
  },
  { immediate: true }
)

const reload = () => {
  commentPage.value = 0
  commentList.value = null
  hasNext.value = true
}

const writeContent = ref(null)
const writeComment = () => {
  console.log(typeof writeContent.value)
  console.log(writeContent.value)
  if (writeContent.value) {
    commentAPI.writeComment(
      props.boardId,
      writeContent.value,
      () => {
        reload()
        writeContent.value = ''
      },
      () => {
        console.log('error')
      }
    )
  }
}
const nextCommentPage = () => {
  if (!hasNext.value) {
    return
  }
  getCommentList()
}
</script>

<template>
  <TopBackward></TopBackward>
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
        <Comment :comment="comment" @reload-comment="reload()" />
      </div>
      <InfiniteLoading @infinite="nextCommentPage" />
    </div>

    <div class="d-flex align-items-center">
      <input type="text" v-model="writeContent" class="form-control" placeholder="댓글 달기" />
      <button class="btn btn-outline-secondary" @click="writeComment()">
        입력
        <!-- <i class="fa fa-arrow-right"></i> -->
      </button>
    </div>
  </div>
  <NavBar></NavBar>
</template>

<style scoped>
.container {
  min-height: 90vh;
}

.comments {
  overflow-y: auto;
  max-height: 40vh;
}
</style>
