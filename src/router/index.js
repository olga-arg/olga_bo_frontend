import { createRouter, createWebHistory } from 'vue-router'
import MembersMembers from '@/MembersMembers.vue'
import MembersTeams from '@/MembersTeams.vue'
import ExpenseMembers from '@/ExpenseMembers.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/members/members', component: MembersMembers },
    { path: '/members/teams', component: MembersTeams },
    { path: '/expenses/members', component: ExpenseMembers },
  ],
})

export default router
