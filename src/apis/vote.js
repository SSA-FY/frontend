import { lambdaAxios } from '@/utils/axios'

const voteAPI = lambdaAxios()

const createVote = (memberId, teamId, requestVoteDto, success, fail) => {
  voteAPI
    .post(`/vote?memberId=${memberId}&teamId=${teamId}`, requestVoteDto)
    .then(success)
    .catch(fail)
}

const getVoteList = (memberId, teamId, success, fail) => {
  voteAPI.get(`/vote/list`, { params: { memberId, teamId } }).then(success).catch(fail)
}

const getMemberItems = (teamId, success, fail) => {
  voteAPI.get(`/membership/team/${teamId}`).then(success).catch(fail)
}

const getMemberResultItems = (voteId, success, fail) => {
  voteAPI.get(`/vote/${voteId}`).then(success).catch(fail)
}

const doVote = (voteId, requestVoteDto, success, fail) => {
  voteAPI
    .post(`/vote/${voteId}`, null, {
      params: {
        voterId: requestVoteDto.voterId,
        voteeId: requestVoteDto.voteeId
      }
    })
    .then(success)
    .catch(fail)
}

export default { createVote, getVoteList, getMemberItems, getMemberResultItems, doVote }
