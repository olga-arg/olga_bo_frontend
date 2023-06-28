import { createRouter, createWebHistory } from 'vue-router'
import MembersMembers from '@/MembersMembers.vue'
import MembersTeams from '@/MembersTeams.vue'
import ExpenseMembers from '@/ExpenseMembers.vue'
import ExpenseTeams from '@/ExpenseTeams.vue'
import CardMember from '@/CardMember.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/expenses/members' },
    { path: '/members/members', component: MembersMembers },
    { path: '/members/teams', component: MembersTeams },
    { path: '/expenses/members', component: ExpenseMembers },
    { path: '/expenses/teams', component: ExpenseTeams },
    { path: '/cards/members', component: CardMember },
  ],
})

export default router
