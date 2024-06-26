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
        getGroupInfo: (teamName, success, fail) => {
            groupAxios.get(`/team/info`, { params: { teamName } }).then(success).catch(fail)
        },
        changeMyname: (myName, teamName, success, fail) => {
            groupAxios.patch(`/team/nickname`, null).then(success).catch(fail)
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
