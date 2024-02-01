<template>
  <div v-for="expenses in chunkedAllExpenses" className="grid grid-cols-2 grid-flow-col gap-6 my-8">
    <div v-for="expense in expenses" class="bg-white rounded-lg flex p-5 w-full">
      <CardExpensesTeam :expense="expense" v-on:click="filterExpensesByTeamUsers(expense)"></CardExpensesTeam>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
import CardExpensesTeam from '@/components/CardExpensesTeam.vue'
import ExpenseMembers from '../ExpenseMembers.vue'
const getAllExpenses = async () => {
  const response = await axios.get('/teams')
  return response.data
}

export default {
  name: 'MyAsyncComponent',
  async setup() {
    const allExpenses = await getAllExpenses()
    return { allExpenses }
  },
  data() {
    return {
      allExpenses: [],
    }
  },
  computed: {
    chunkedAllExpenses() {
      return this.chunk()
    },
  },
  components: {
    CardExpensesTeam,
    ExpenseMembers,
  },
  methods: {
    filterExpensesByTeamUsers(expense) {
      if (expense.users) {
        const userEmails = expense.users.map((user) => user.email).join(',') // must use userIDs instead of emails
        this.$router.replace({ path: '/expenses/members', query: { userEmails } })
      }
    },
    chunk() {
      const chunked = []
      for (let i = 0; i < this.allExpenses.teams.length; i += 2) {
        chunked.push(this.allExpenses.teams.slice(i, i + 2))
      }
      return chunked
    },
  },
}
</script>
