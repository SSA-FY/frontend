import { lambdaAxios } from '@/utils/axios'

const createInviteAPI = () => {
  const inviteAxios = lambdaAxios()
  return {
    searchMember: (tag, success, fail) => {
      inviteAxios.get(`/member/search?tag=${encodeURIComponent(tag)}`).then(success).catch(fail)
    },
    createInvites: (teamName, memberList, success, fail) => {
      inviteAxios
        .post(`/invitation`, memberList, { params: { teamName } })
        .then(success)
        .catch(fail)
    },
  }
}

export default createInviteAPI
