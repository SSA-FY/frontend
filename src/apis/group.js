import { lambdaAxios } from '@/utils/axios'

const createGroupAPI = () => {
  const groupAxios = lambdaAxios()
  return {
    createGroup: (formData, success, fail) => {
      groupAxios
        .post(`/team`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(success)
        .catch(fail)
    },
    getGroupInfo: (teamId, success, fail) => {
      groupAxios.get(`/team/${teamId}`).then(success).catch(fail)
    }
  }
}

export default createGroupAPI
