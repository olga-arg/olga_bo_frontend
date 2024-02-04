<template>
  <Navbar></Navbar>
  <div className="bg-[#F4F4F4]">
    <Sidebar currentRouteName="teams"></Sidebar>
    <div class="p-4 sm:ml-64">
      <div class="px-24">
        <div class="flex justify-between h-20 mb-4 items-center">
          <div className="flex gap-4 items-center">
            <Input placeholder="Buscar gasto" class="w-72" v-on:keypress.enter.prevent="sendNameFilter" v-model="employeeNameFilter" />
            <DatePicker @date-selected="handleDateSelected" :reset-filters="resetFilters" />
            <FilterExpenseStatus @status-selected="handleStatusSelected" :reset-filters="resetFilters" />
            <FilterExpenseCategory v-if="Object.keys(categoriesMap).length" @category-selected="handleCategorySelected" :reset-filters="resetFilters" :categories="categoriesMap" />
            <div v-else class="flex items-center border py-1 px-3 rounded-md border-dashed border-gray-400 hover:bg-gray-200 text-sm text-muted-foreground cursor-not-allowed">
              Categoria
            </div>
            <div
              class="flex items-center py-1 px-3 rounded-md hover:bg-gray-200"
              v-if="this.filters.status != null || this.filters.category != '' || !this.filters.rangeDates || this.filters.rangeDates.end"
            >
              <button class="flex items-center" @click="handleReset">
                <p>Reset</p>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4">
                  <path
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

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
        </div>
        <Suspense>
          <template #default>
            <ExpenseMembersView :filters="filters" :selectPayments="this.selectPayments" :categories="categoriesMap" ref="expenseMembersView"></ExpenseMembersView>
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
import axios from '@/axios'
import FilterExpenseStatus from './components/FilterExpenseStatus.vue'
import FilterExpenseCategory from './components/FilterExpenseCategory.vue'
import Button from './components/ui/button/Button.vue'
import { ref } from 'vue'
import DatePicker from './components/DatePicker.vue'
import Input from './components/ui/input/Input.vue'
export default {
  name: 'App',
  data() {
    return {
      categoriesMap: {},
      categories: [],
      category: 'Categoria',
      monthName: '',
      lastMonthName: '',
      selectPayments: false,
      filters: {
        status: null,
        rangeDates: null,
        category: '',
      },
      resetFilters: ref(false),
    }
  },

  methods: {
    handleCategorySelected(selectedCategory) {
      // Realiza la lógica que deseas con la categoría seleccionada
      this.category = selectedCategory.value
      this.filters.category = selectedCategory.value
    },
    handleStatusSelected(selectedStatus) {
      // Realiza la lógica que deseas con la categoría seleccionada
      this.status = selectedStatus.value
      this.filters.status = selectedStatus.value
    },
    handleDateSelected(selectedDate) {
      // Realiza la lógica que deseas con la categoría seleccionada
      // this.date = selectedDate
      this.filters.rangeDates = selectedDate
    },
    async getCategories() {
      const response = await axios.get('/company/categories')
      this.categoriesMap = response.data
      this.categories = Object.keys(response.data) || []
    },
    selectPaymentsToggle() {
      this.selectPayments = !this.selectPayments
    },
    handleReset() {
      this.resetFilters = !this.resetFilters
      this.category = ''
      this.status = null
      this.filters.status = null
      this.filters.category = ''
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
  },
  async mounted() {
    await this.getCategories()
  },
  components: {
    Sidebar,
    Navbar,
    ExpenseMembersView,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    FilterExpenseStatus,
    FilterExpenseCategory,
    Button,
    DatePicker,
    Input,
  },
}
</script>
