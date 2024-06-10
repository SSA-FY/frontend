import axios from 'axios'

import { useMemberStore } from '@/stores/memberStore'

const { VITE_API_BASE_URL } = import.meta.env

const lambdaAxios = () => {
  const member = useMemberStore()

  return axios.create({
    baseURL: VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${member.token}`
    }
  })
}

export { lambdaAxios }
