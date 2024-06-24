import { lambdaAxios } from '@/utils/axios'

const createVoteAPI = () => {
  const voteAxios = lambdaAxios()
  return {
    createVote: (teamId, formData, success, fail) => {
      voteAxios
        .post(`/vote?teamId=${teamId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(success)
        .catch(fail)
    },
    getVoteList: (teamId, success, fail) => {
      voteAxios.get(`/vote/list`, { params: { teamId } }).then(success).catch(fail)
    },
    getMemberItems: (teamId, success, fail) => {
      voteAxios.get(`/membership/team/${teamId}`).then(success).catch(fail)
    },
    getMemberResultItems: (voteId, success, fail) => {
      voteAxios.get(`/vote/${voteId}`).then(success).catch(fail)
    },
    doVote: (voteId, voteeId, success, fail) => {
      voteAxios.post(`/vote/${voteId}`, { params: voteeId }).then(success).catch(fail)
    },
    createReview: (voteInfoId, requestReviewDto, success, fail) => {
      voteAxios.post(`/vote/review/${voteInfoId}`, requestReviewDto).then(success).catch(fail)
    }
  }
}

export default createVoteAPI
