import { createRouter, createWebHashHistory } from 'vue-router'
import MembersMembers from '@/MembersMembers.vue'
import MembersTeams from '@/MembersTeams.vue'
import ExpenseMembers from '@/ExpenseMembers.vue'
import ExpenseTeams from '@/ExpenseTeams.vue'
import CardMember from '@/CardMember.vue'
import Login from '@/Login.vue'
import Logout from '@/Logout.vue'
import auth from './middleware/auth'
import Policy from '@/Policy.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { name: 'login', path: '/login', component: Login },
    { path: '/logout', component: Logout },
    { path: '/members', redirect: '/members/members' },
    { path: '/members/members', component: MembersMembers, meta: { middleware: [auth] } },
    { path: '/members/teams', component: MembersTeams },
    { path: '/expenses', redirect: '/expenses/members' },
    { path: '/expenses/members', component: ExpenseMembers, meta: { middleware: [auth] } },
    { path: '/expenses/teams', component: ExpenseTeams },
    { path: '/cards', redirect: '/cards/members' },
    { path: '/cards/members', component: CardMember, meta: { middleware: [auth] } },
    { path: '/policy', component: Policy },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]
    const context = { to, from, next, router }
    return middleware[0]({ ...context, next: middlewarePipeline(context, middleware, 1) })
  }
  return next()
})

function middlewarePipeline(context, middleware, index) {
  const nextMiddleware = middleware[index]
  if (!nextMiddleware) return context.next
  return (...parameters) => {
    context.next(...parameters)
    const nextPipeline = middlewarePipeline(context, middleware, index + 1)
    nextMiddleware({ ...context, next: nextPipeline })
  }
}
export default router
