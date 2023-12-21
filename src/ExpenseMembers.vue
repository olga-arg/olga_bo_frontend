<template>
  <Navbar></Navbar>

  <div className="bg-[#F4F4F4]">
    <Sidebar currentRouteName="teams"></Sidebar>
    <div class="p-4 sm:ml-64">
      <div class="px-24">
        <div class="flex justify-between h-20 mb-4 items-center">
          <div class="flex gap-2">
            <Menu v-if="!selectPayments" as="div" class="relative inline-block text-left">
              <div>
                <MenuButton class="inline-flex justify-center rounded-md text-sm font-semibold text-gray-900">
                  <img class="h-8 w-8" src="@/assets/selectPayments.svg" alt="arrow" />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems class="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }" v-on:click="selectPaymentsToggle">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Seleccionar gastos</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <div v-else v-on:click="selectPaymentsToggle" class="cursor-pointer">
              <button
                v-on:click="exportPayments"
                type="button"
                class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
              >
                Exportar
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <div className="flex gap-4 items-center">
              <button
                v-on:click="pendingFilter"
                className="w-36 border-[#DBDADF] border py-1 rounded-md  text-[#8D8B96]"
                :style="{ backgroundColor: this.filters.pending ? '#DE848B' : '#ffffff', color: this.filters.pending ? '#ffffff' : '#8D8B96' }"
              >
                Pendientes
              </button>
              <div class="w-72">
                <vue-date-picker v-model="date" auto-apply range :format="format" :preset-dates="presetDates">
                  <template #clear-icon="{ clear }">
                    <!-- Svg for X close icon -->
                    <svg v-on:click="clearDates" @click="clear" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </template>
                </vue-date-picker>
              </div>
              <Menu as="div" class="relative inline-block">
                <div>
                  <MenuButton class="inline-flex w-full px-4 py-2 text-base rounded-md bg-white text-gray-900 hover:bg-gray-50">
                    {{ category }}
                  </MenuButton>
                </div>

                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                      <MenuItem v-for="categorie in categories" v-slot="{ active }" v-on:click="selectCategory(categorie)">
                        <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{ categorie }}</a>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
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
              <input v-on:keypress.enter.prevent="sendNameFilter" v-model="employeeNameFilter" class="w-full p-2 pl-10 text-sm bg-[#F4F4F4]" placeholder="Buscar gasto" required />
              <div className="w-full h-0.5 bg-[#DE848B]"></div>
            </div>
          </form>
        </div>
        <Suspense>
          <template #default>
            <ExpenseMembersView :filters="filters" :selectPayments="this.selectPayments" ref="expenseMembersView"></ExpenseMembersView>
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
import ExpenseMembersView from './components/ExpenseMembersView.vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths } from 'date-fns'

export default {
  name: 'App',
  data() {
    return {
      category: 'Categoria',
      monthName: '',
      lastMonthName: '',
      date: '',
      selectPayments: false,
      filters: {
        pending: false,
        rangeDates: null,
        category: '',
        userEmails: [],
      },
      categories: [
        'Categoria',
        'Comidas y Bebidas',
        'Comisiones y Cargos',
        'Cuentas y Servicios',
        'Donaciones',
        'Educación',
        'Electrónica',
        'Entretenimiento',
        'Hogar',
        'Impuestos',
        'Indumentaria',
        'Inversiones',
        'Mascotas',
        'Otros',
        'Préstamos y financiación',
        'Salud y cuidado personal',
        'Servicios profesionales',
        'Shopping',
        'Supermercado',
        'Suscripciones',
        'Transporte',
        'Viajes',
      ],
    }
  },
  computed: {
    presetDates() {
      return [
        { label: 'Hoy', value: [new Date(), new Date()] },
        {
          label: 'Today (Slot)',
          value: [new Date(), new Date()],
          slot: 'preset-date-range-button',
        },
        { label: `${this.monthName}`, value: [startOfMonth(new Date()), endOfMonth(new Date())] },
        {
          label: `${this.lastMonthName}`,
          value: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
        },
        { label: `Año ${Date(new Date().getFullYear()).split(' ')[3]}`, value: [startOfYear(new Date()), endOfYear(new Date())] },
      ]
    },
  },
  methods: {
    loadExpensesBasedOnQueryParams() {
      const userEmails = this.$route.query.userEmails

      if (userEmails) {
        // Si userIds existe, conviértelo en un arreglo y úsalo para filtrar
        const userEmailsArray = userEmails.split(',')
        this.filterExpensesByUserEmails(userEmailsArray)
      }
    },
    filterExpensesByUserEmails(userEmails) {
      this.filters.userEmails = userEmails
    },
    pendingFilter() {
      this.filters.pending = !this.filters.pending
    },
    clearDates() {
      this.filters.rangeDates = null
    },
    getMonthName() {
      const date = new Date()
      const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Augosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
      return monthNames[date.getMonth()]
    },
    getLastMonthName() {
      const date = new Date()
      const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Augosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
      return monthNames[date.getMonth() - 1]
    },
    format([dateFrom, dateTo]) {
      const dayFrom = dateFrom.getDate()
      const monthFrom = dateFrom.getMonth()
      const yearFrom = dateFrom.getFullYear()

      const dayTo = dateTo.getDate()
      const monthTo = dateTo.getMonth()
      const yearTo = dateTo.getFullYear()

      const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

      this.filters.rangeDates = [dateFrom, dateTo]

      return `${dayFrom} ${monthNames[monthFrom]} ${yearFrom} - ${dayTo} ${monthNames[monthTo]} ${yearTo}`
    },
    selectPaymentsToggle() {
      this.selectPayments = !this.selectPayments
    },
    convertToCSV(arr) {
      if (arr.length === 0) {
        return ''
      }

      // Extraer los encabezados de la primera fila (asumiendo que todas las filas tienen la misma estructura)
      const headers = Object.keys(arr[0])
        .filter((key) => key !== 'User')
        .concat(['User_full_name', 'User_email'])

      // Transformamos los objetos para aplanar las propiedades anidadas de 'User'
      const flattenedData = arr.map((item) => {
        let flattenedItem = { ...item }
        flattenedItem['User_full_name'] = item.User.full_name // Aplanar propiedad 'full_name' de 'User'
        flattenedItem['User_email'] = item.User.email // Aplanar propiedad 'email' de 'User'
        delete flattenedItem['User'] // Eliminar el objeto 'User' original para evitar [object Object]
        return flattenedItem
      })

      // Construir la cadena CSV
      const csvArray = [headers].concat(
        flattenedData.map((row) => {
          return headers
            .map((fieldName) => {
              let field = row[fieldName]
              if (field == null) {
                // Verificar valores nulos o undefined
                field = ''
              } else if (typeof field === 'object') {
                // Verificar y convertir objetos a cadena
                field = JSON.stringify(field)
              } else if (typeof field === 'string' && field.includes(',')) {
                field = `"${field}"` // Encerrar campos con comas en comillas dobles
              }
              return field
            })
            .join(',')
        })
      )

      return csvArray.join('\r\n')
    },

    exportPayments() {
      let payments_info = this.$refs.expenseMembersView.selectedExpenses
      if (payments_info.length === 0) {
        return
      }
      // Convertir a CSV
      const csvData = this.convertToCSV(payments_info)
      console.log(csvData)

      const link = document.createElement('a')
      const file = new Blob([csvData], { type: 'text/csv' })
      link.href = URL.createObjectURL(file)
      link.download = 'Gastos.csv'
      link.click()
      URL.revokeObjectURL(link.href)
      this.$refs.expenseMembersView.selectedExpenses.forEach((expense) => {
        expense.isSelected = false
      })
      this.$refs.expenseMembersView.selectedExpenses = []
    },
    selectCategory(e) {
      this.category = e
      this.filters.category = e
    },
  },
  mounted: function () {
    this.loadExpensesBasedOnQueryParams()
    this.monthName = this.getMonthName()
    this.lastMonthName = this.getLastMonthName()
  },
  components: {
    Sidebar,
    Navbar,
    ExpenseMembersView,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  },
}
</script>
