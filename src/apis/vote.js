import { lambdaAxios } from '@/utils/axios'

const createVoteAPI = () => {
  const voteAxios = lambdaAxios()
  console.log('createVoteAPI 호출')
  return {
    createVote: (teamId, requestVoteDto, success, fail) => {
      voteAxios.post(`/vote?teamId=${teamId}`, requestVoteDto).then(success).catch(fail)
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
    doVote: (voteId, requestVoteDto, success, fail) => {
      voteAxios
        .post(`/vote/${voteId}`, null, {
          params: {
            voterId: requestVoteDto.voterId,
            voteeId: requestVoteDto.voteeId
          }
        })
        .then(success)
        .catch(fail)
    }
  }
}

export default createVoteAPI
