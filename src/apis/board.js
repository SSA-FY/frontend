import { lambdaAxios } from '@/utils/axios'

const createBoardAPI = () => {
  const boardAxios = lambdaAxios()
  return {
    getBoardList: (teamName, page, success, fail) => {
      boardAxios.get(`/boards`, { params: { teamName, page } }).then(success).catch(fail)
    },
    getBoardDetail: (boardId, page, success, fail) => {
      boardAxios.get(`/board/${boardId}`, { params: { page } }).then(success).catch(fail)
    }
  }
}

export default createBoardAPI
