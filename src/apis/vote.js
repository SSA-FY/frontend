import { lambdaAxios } from '@/utils/axios'

const createVoteAPI = () => {
  const voteAxios = lambdaAxios()
  return {
    createVote: (teamName, formData, success, fail) => {
      voteAxios
        .post(`/vote?teamName=${teamName}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(success)
        .catch(fail)
    },
    getVoteList: (teamName, success, fail) => {
      voteAxios.get(`/vote/list`, { params: { teamName } }).then(success).catch(fail)
    },
    getMemberItems: (teamName, success, fail) => {
      voteAxios.get(`/team/member`, { params: { teamName } }).then(success).catch(fail)
    },
    getMemberResultItems: (voteId, success, fail) => {
      voteAxios.get(`/vote/${voteId}`).then(success).catch(fail)
    },
    doVote: (voteId, voteeTag, success, fail) => {
      voteAxios.post(`/vote/${voteId}`, null, { params: { voteeTag } }).then(success).catch(fail)
    },
    createReview: (voteInfoId, requestReviewDto, success, fail) => {
      voteAxios.post(`/vote/review/${voteInfoId}`, requestReviewDto).then(success).catch(fail)
    },
    getTodayInfo: (success, fail) => {
      voteAxios.get(`/voteinfo/today`).then(success).catch(fail)
    }
  }
}

export default createVoteAPI
