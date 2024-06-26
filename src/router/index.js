import { createRouter, createWebHistory } from 'vue-router'
import { useMemberStore } from '@/stores/memberStore'

// Pages in folder 'views'
import Index from '@/views/Index.vue'
import NotFound from '@/views/NotFound.vue'
// in folder 'member'
import Login from '@/views/member/Login.vue'
import Signup from '@/views/member/Signup.vue'
import SignupSuccess from '@/views/member/SignupSuccess.vue'
import Mypage from '@/views/member/Mypage.vue'
import Edit from '@/views/member/Edit.vue'
// in folder 'group'
import Group from '@/views/group/Group.vue'
import GroupCreate from '@/views/group/Create.vue'
import GroupCreateSuccess from '@/views/group/CreateSuccess.vue'
import GroupDetail from '@/views/group/Detail.vue'
import GroupEdit from '@/views/group/Edit.vue'
// in folder 'notification'
import Notification from '@/views/notification/Notification.vue'
import NotificationVote from '@/views/notification/Vote.vue'
import NotificationInvitation from '@/views/notification/Invitation.vue'
// in folder 'vote'
import Vote from '@/views/vote/Vote.vue'
import VoteCreate from '@/views/vote/Create.vue'
// in folder 'board'
import BoardList from '@/views/board/List.vue'
import BoardDetail from '@/views/board/Detail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Index },
    // member
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/signup-success', component: SignupSuccess },
    { path: '/mypage', component: Mypage },
    { path: '/edit', component: Edit },
    // group
    { path: '/group', component: Group },
    { path: '/group/create', component: GroupCreate },
    { path: '/group/create-success', component: GroupCreateSuccess },
    { path: '/group/detail', component: GroupDetail },
    { path: '/group/edit', component: GroupEdit },
    // notification
    { path: '/notification', component: Notification },
    { path: '/notification/vote', component: NotificationVote },
    { path: '/notification/invitation', component: NotificationInvitation },
    // vote
    { path: '/vote', component: Vote },
    // { path: '/vote/finish', component: VoteFinish },
    { path: '/vote/create', component: VoteCreate },
    // board
    { path: '/boards', component: BoardList },
    { path: '/board/:boardId', component: BoardDetail, props: true },
    // etc
    { path: '/:anything(.*)', component: NotFound }
  ]
})

const publicPage = ['/', '/login']

// const signupPage = ['/signup', '/signup-success']

router.beforeEach(async (to) => {
  const member = useMemberStore()

  if (publicPage.includes(to.path)) {
    return
  }

  if (!member.token) {
    const isSuccess = await member.login()

    if (!isSuccess) {
      return '/login'
    }
  }

  if (!member.tag && to.path !== '/signup') {
    return '/signup'
  }

  // if (member.tag && signupPage.includes(to.path)) {
  //   return '/group'
  // }
})

export default router
