<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import createBoardAPI from '@/apis/board'
import NavBar from '@/components/common/NavBar.vue'
import TopBackward from '@/components/vote/vote/TopBackward.vue'
import InfiniteLoading from 'v3-infinite-loading'

const route = useRoute()
const boardAPI = createBoardAPI()
const teamName = ref(route.query.name)
const boardListPage = ref(0)
const dailyBoardList = ref(new Array())
const hasNext = ref(true)
const lastDay = ref(null)

const getBoardList = () => {
  if (!hasNext) {
    return
  }
  console.log(boardListPage.value)
  boardAPI.getBoardList(
    teamName.value,
    boardListPage.value, //page
    ({ data }) => {
      if (data == null || data.length == 0) {
        hasNext.value = false
        return
      }
      let responseData = data
      lastDay.value = responseData[0].time
      console.log(lastDay.value)
      var boardItems = new Array()
      for (let i = 0; i < responseData.length; i++) {
        let board = responseData[i]
        if (board.time == lastDay.value) {
          if (boardItems.length == 0 && dailyBoardList.value.length != 0) {
            dailyBoardList.value[dailyBoardList.value.length - 1].boardItems.push(board)
            continue
          }
          boardItems.push(board)
          lastDay.value = board.time
          continue
        }
        //(2차원 배열 : 날짜별로 묶어서 관리)
        let dailyBoards = { time: board.time, boardItems }
        dailyBoardList.value.push(dailyBoards)
        boardItems = new Array()
        lastDay.value = board.time
        i--
      }
      if (boardItems.length != 0) {
        let dailyBoards = { time: lastDay.value, boardItems }
        dailyBoardList.value.push(dailyBoards)
      }
      boardListPage.value++
    },
    ({ message }) => {
      console.log(message)
    }
  )
}

const router = useRouter()
const detailPage = (boardId) => {
  console.log(boardId)
  router.push(`/board/${boardId}`)
}

const nextPage = () => {
  getBoardList()
}
</script>
<template>
  <TopBackward></TopBackward>

  <div class="container">
    <div class="text-left mt-5 ms-2 main-title">
      <p>My Board</p>
    </div>
    <div class="wrap-infinite">
      <div v-for="boardList in dailyBoardList" :key="boardList.time" class="ms-4 mt-3 me-4">
        <div class="row">
          <div class="col-12">
            <div class="row my-2 text-decoration-underline fw-bold">
              {{ boardList.time }}
              <hr class="my-3" style="border: 2px solid" />
            </div>

            <div>
              <div v-for="(board, index) in boardList.boardItems" :key="board.id" class="row my-1">
                <div class="bg-orange-opacity pb-3 rounded pt-2">
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
                      댓글
                      <!-- <i class="fa-solid fa-message fa-2x orange"></i> -->
                    </div>
                  </div>
                </div>
                <hr
                  class="my-3"
                  :style="index == boardList.length - 1 ? 'border: 2px solid;' : ''"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <InfiniteLoading @infinite="nextPage" />
    </div>
  </div>
  <NavBar></NavBar>
</template>

<style scoped>
.container {
  min-height: 90vh;
}

img {
  object-fit: cover;
}
.orange {
  color: #ff7a00;
}
.bg-orange {
  background-color: #ff7a00;
}

.bg-orange-opacity {
  background-color: #ff7a00;
}

.main-title {
  border-bottom: 1px solid #ff7a00;
  font-size: 32px;
  font-weight: 500;
}

.wrap-infinite {
  overflow-y: auto;
  max-height: 70vh;
}
</style>
