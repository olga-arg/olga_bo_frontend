<template>
  <Navbar></Navbar>
  <div className="bg-[#F4F4F4]">
    <Sidebar currentRouteName="teams"></Sidebar>
    <div class="p-4 sm:ml-64">
      <div class="px-24">
        <div class="flex justify-between h-20 mb-4">
          <div class="flex flex-col gap-2">
            <p class="font-semibold text-2xl">Balance</p>
            <p className="text-lg">Gastos Totales $ {{ totalBalance() }}</p>
          </div>
          <form>
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-[#DE848B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input v-on:keypress.enter.prevent="sendNameFilter" v-model="employeeNameFilter" class="w-full p-2 pl-10 text-sm bg-[#F4F4F4]" placeholder="Buscar equipo" required />
              <div className="w-full h-0.5 bg-[#DE848B]"></div>
            </div>
          </form>
        </div>
        <Suspense>
          <template #default>
            <ExpenseTeamsView :expenses="this.expensesFiltered"></ExpenseTeamsView>
          </template>
          <template #fallback>
            <div class="flex justify-center items-center h-96">
              <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import ExpenseTeamsView from './components/ExpenseTeamsView.vue'
import axios from '@/axios'
export default {
  name: 'App',
  data() {
    return {
      employeeNameFilter: '',
      expenses: [],
      expensesFiltered: [],
    }
  },
  watch: {
    employeeNameFilter() {
      if (this.employeeNameFilter === '') {
        this.expensesFiltered = this.expenses
      }
    },
  },
  methods: {
    async sendNameFilter() {
      const response = await axios.get('/teams?name=' + this.employeeNameFilter)
      if (response.data.teams) {
        this.expensesFiltered = response.data.teams
      } else {
        this.expensesFiltered = []
      }
    },
    async getAllExpenses() {
      const response = await axios.get('/teams')
      return response.data.teams
    },
    totalBalance() {
      if (this.expenses && this.expenses.length > 0) {
        return this.expenses.reduce((acc, expense) => acc + expense.monthly_spending, 0)
      } else {
        return 0
      }
      // return balance
    },
  },
  async mounted() {
    this.expenses = await this.getAllExpenses()
    this.expensesFiltered = this.expenses
  },

  components: {
    Sidebar,
    Navbar,
    ExpenseTeamsView,
  },
}
</script>
