import { lambdaAxios } from '@/utils/axios'

const createGroupAPI = () => {
  const groupAxios = lambdaAxios()
    return {
      createGroup: (data, success, fail) => {
        groupAxios
          .post(`/team`, data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(success)
          .catch(fail)
      },
      updateGroup: (data, success, fail) => {
        groupAxios
          .put(`/team`, data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(success)
          .catch(fail)
      },
      getGroupInfo: (teamName, success, fail) => {
        groupAxios.get(`/team/info`, { params: { teamName } }).then(success).catch(fail)
      },
      changeMyname: (data, success, fail) => {
        groupAxios.put(`/team/nickname`, data).then(success).catch(fail)
      },
      getMembers: (teamName, success, fail) => {
        groupAxios.get(`/team/member`, { params: { teamName } }).then(success).catch(fail)
      },
      leaveGroup: (teamName, success, fail) => {
        groupAxios.delete(`/team`, { params: { teamName } }).then(success).catch(fail)
      }
    }
}

export default createGroupAPI
