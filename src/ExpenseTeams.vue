<template>
  <div className="bg-[#F4F4F4]">
    <Sidebar currentRouteName="teams"></Sidebar>
    <div class="p-4 sm:ml-64">
      <div class="px-24">
        <div class="flex justify-between h-20 mb-4">
          <div class="flex flex-col gap-2">
            <p class="font-semibold text-2xl">Balance</p>
            <p className="text-lg">Gastos Totales $ 1.340.020,00</p>
          </div>
          <div class="flex flex-col gap-1">
            <p className="text-gray-500">Filtrar:</p>
            <div className="flex gap-4 items-center">
              <button v-if="this.sendFilters.isAdmin" v-on:click="sendAdminFilter" className="bg-red-300 border-red-300 border p-1 rounded-md px-6 text-white">Excedidos</button>
              <button v-else v-on:click="sendAdminFilter" className="bg-[rgb(248,247,250)] border-[#DBDADF] border p-1 rounded-md px-6 text-[#8D8B96]">Excedidos</button>
            </div>
          </div>
          <form>
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-[#DE848B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                v-on:keypress.enter.prevent="sendNameFilter"
                v-model="employeeNameFilter"
                class="w-full p-2 pl-10 text-sm bg-[#F4F4F4]"
                placeholder="Buscar empleado"
                required
              />
              <div className="w-full h-0.5 bg-[#DE848B]"></div>
            </div>
          </form>
        </div>

        <Suspense>
          <template #default>
            <ExpenseTeamsView></ExpenseTeamsView>
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
import ExpenseTeamsView from './components/ExpenseTeamsView.vue'

export default {
  name: 'App',
  data() {
    return {
      filters: {
        name: this.employeeNameFilter,
        isAdmin: false,
        isConfirmed: false,
      },
      sendFilters: {
        name: '',
        isAdmin: false,
        isConfirmed: false,
      }, // Could be done better
    }
  },
  components: {
    Sidebar,
    ExpenseTeamsView,
  },
}
</script>
