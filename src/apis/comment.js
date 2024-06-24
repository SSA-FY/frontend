import { lambdaAxios } from '@/utils/axios'

const createCommentAPI = () => {
  const commentAxios = lambdaAxios()
  return {
    writeComment: (boardId, content, success, fail) => {
      commentAxios.post(`/comment/${boardId}`, { content }).then(success).catch(fail)
    },
    getComments: (boardId, page, success, fail) => {
      commentAxios.get(`/comment/${boardId}`, { params: { page } }).then(success).catch(fail)
    },
    editComment: (commentId, content, success, fail) => {
      commentAxios.put(`comment/${commentId}`, { content }).then(success).catch(fail)
    },
    deleteComment: (commentId, success, fail) => {
      commentAxios.delete(`comment/${commentId}`).then(success).catch(fail)
    }
  }
}

export default createCommentAPI
