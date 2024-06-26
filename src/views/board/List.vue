<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import createBoardAPI from '@/apis/board'
import NavBar from '@/components/common/NavBar.vue'
import TopBackward from '@/components/vote/vote/TopBackward.vue'

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
  <TopBackward></TopBackward>

  <div class="container">
    <div class="text-left mt-5 ms-2 main-title">
      <p>My Board</p>
    </div>
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
              <hr class="my-3" :style="index == boardList.length - 1 ? 'border: 2px solid;' : ''" />
            </div>
          </div>
        </div>
      </div>
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
</style>
