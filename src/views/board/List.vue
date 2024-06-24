<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import createBoardAPI from '@/apis/board'

const boardAPI = createBoardAPI()
const teamId = ref(1)
const boardListPage = ref(0)
const dailyBoardList = ref(new Array())
watch(
  teamId,
  () => {
    boardAPI.getBoardList(
      teamId.value,
      boardListPage.value, //page
      ({ data }) => {
        if (data == null) {
          return
        }
        let responseData = data
        var pre = responseData[0].time
        var boardItems = new Array()
        for (let i = 0; i < responseData.length; i++) {
          let board = responseData[i]
          if (board.time == pre) {
            boardItems.push(board)
            pre = board.time
            continue
          }
          //(2차원 배열 : 날짜별로 묶어서 관리)
          let dailyBoards = { time: pre, boardItems }
          dailyBoardList.value.push(dailyBoards)
          boardItems = new Array()
          pre = board.time
        }
        if (boardItems.length != 0) {
          let dailyBoards = { time: pre, boardItems }
          dailyBoardList.value.push(dailyBoards)
        }
      },
      ({ message }) => {
        console.log(message)
      }
    )
  },
  { immediate: true }
)

const router = useRouter()
const detailPage = (boardId) => {
  console.log(boardId)
  router.push(`/board/${boardId}`)
}
</script>
<template>
  <div class="container">
    <h1>지난 투표 리스트</h1>
    <div v-for="boardList in dailyBoardList" :key="boardList.time">
      <div class="row">
        <div class="col-12">
          <div class="my-2 text-decoration-underline fw-bold">
            {{ boardList.time }}
          </div>
          <div>
            <div v-for="(board, index) in boardList.boardItems" :key="board.id" class="row my-1">
              <div class="row">
                <p class="fw-bold">{{ board.content }}</p>
              </div>
              <div class="row my-1">
                <div class="col-9 d-flex align-items-center">
                  <img
                    v-for="(imgUrl, index) in board.memberList"
                    :key="index"
                    :src="imgUrl"
                    class="rounded-circle mx-2"
                    style="width: 40px; height: 40px"
                  />
                </div>
                <div
                  class="col-3 d-flex align-items-center justify-content-end"
                  @click="detailPage(board.boardId)"
                >
                  댓글 보기
                  <!-- <i class="fa-solid fa-message fa-2x orange"></i> -->
                </div>
              </div>
              <hr class="my-3" :style="index == boardList.length - 1 ? 'border: 2px solid;' : ''" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-header {
  background-color: #f8f9fa;
  font-weight: bold;
}

img {
  object-fit: cover;
}
.orange {
  color: orange;
}
</style>
