import { defineStore } from 'pinia'
import { lambdaAxios } from '@/utils/axios'

export const useMemberStore = defineStore({
  id: 'member',
  state: () => ({
    token: null,
    memberId: null,
    email: null,
    social: null,
    name: null,
    tag: null,
    profileImgUrl: null
  }),
  actions: {
    async login() {
      try {
        const res = await lambdaAxios().get(`/token`)
        const data = res.data
        this.token = data.token
        this.memberId = data.memberId
        this.email = data.email
        this.social = data.social
        this.name = data.name
        this.tag = data.tag
        this.profileImgUrl = data.profileImgUrl
      } catch (err) {
        return false
      }
      return true
    },
    logout() {
      this.token = null
      this.memberId = null
      this.email = null
      this.social = null
      this.name = null
      this.tag = null
      this.profileImgUrl = null
    }
  }
})
