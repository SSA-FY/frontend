import { lambdaAxios } from '@/utils/axios'

const createBoardAPI = () => {
  const boardAxios = lambdaAxios()
  return {
    getBoardList: (teamId, page, success, fail) => {
      boardAxios.get(`/boards/${teamId}`, { params: { page } }).then(success).catch(fail)
    },
    getBoardDetail: (boardId, page, success, fail) => {
      boardAxios.get(`/board/${boardId}`, { params: { page } }).then(success).catch(fail)
    }
  }
}

export default createBoardAPI
