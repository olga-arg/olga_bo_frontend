<template>
  <Navbar></Navbar>
  <div className="bg-[#F4F4F4]">
    <Sidebar currentRouteName="teams"></Sidebar>
    <div class="p-4 sm:ml-64">
      <div class="px-24">
        <div class="flex justify-between h-20 mb-4 items-center">
          <div className="flex gap-4 items-center">
            <Input placeholder="Buscar gasto" class="w-46 text-sm" v-on:keypress.enter.prevent="sendNameFilter" v-model="search" />
            <DatePicker @date-selected="handleDateSelected" :reset-filters="resetFilters" />
            <FilterExpenseStatus @status-selected="handleStatusSelected" :reset-filters="resetFilters" />
            <FilterExpenseCategory
              v-if="Object.keys(categoriesMap).length"
              @category-selected="handleCategorySelected"
              @category-deselected="handleCategoryDeselected"
              :reset-filters="resetFilters"
              :categories="categoriesMap"
            />
            <div v-else class="flex items-center border py-1 px-3 rounded-md border-dashed border-gray-400 hover:bg-gray-200 text-sm text-muted-foreground cursor-not-allowed">
              Categoria
            </div>
            <div
              class="flex items-center py-1 px-3 rounded-md hover:bg-gray-200"
              v-if="this.filters.status != null || this.filters.category.length > 0 || !this.filters.rangeDates || this.filters.rangeDates.end"
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

          <div v-if="!selectPayments" class="flex items-center border rounded-md border-dashed border-gray-400 hover:bg-gray-200">
            <Button class="bg-gray-100 h-7 px-3 py-1 text-sm text-muted-foreground" v-on:click="selectPaymentsToggle">Seleccionar</Button>
          </div>
          <div v-else class="flex gap-4">
            <div class="flex items-center border rounded-md border-blue-500 hover:bg-gray-200">
              <Button class="bg-gray-100 h-7 px-3 py-1 text-sm text-muted-foreground text-blue-500" v-on:click="selectAllPayments">Seleccionar todos</Button>
            </div>
            <div class="flex items-center border rounded-md border-red-500 hover:bg-gray-200">
              <Button class="bg-gray-100 h-7 px-3 py-1 text-sm text-muted-foreground text-red-500" v-on:click="selectPaymentsToggle">Cancelar</Button>
            </div>
            <div class="flex items-center border rounded-md border-green-500 hover:bg-gray-200">
              <Button class="bg-gray-100 h-7 px-3 py-1 text-sm text-muted-foreground text-green-500" v-on:click="exportPayments">Exportar</Button>
            </div>
          </div>
        </div>
        <Suspense :key="updateKey">
          <template #default>
            <ExpenseMembersView
              :filters="filters"
              :selectPayments="this.selectPayments"
              :exportAll="this.selectAllPaymentsToExport"
              :categories="categoriesMap"
              ref="expenseMembersView"
            ></ExpenseMembersView>
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
      selectAllPaymentsToExport: false,
      categoriesMap: {},
      categories: [],
      selectPayments: false,
      search: '',
      filters: {
        status: null,
        rangeDates: null,
        category: [],
        search: '',
      },
      resetFilters: ref(false),
      updateKey: 0, // para actualizar el componente ExpenseMembersView cuando se exportan los gastos
    }
  },
  // watch for when this.search becomes empty
  watch: {
    search: function (newSearch, oldSearch) {
      if (newSearch === '') {
        this.sendNameFilter()
      }
    },
  },
  methods: {
    selectAllPayments() {
      this.selectAllPaymentsToExport = !this.selectAllPaymentsToExport
    },
    sendNameFilter() {
      this.filters.search = this.search
    },
    handleCategorySelected(selectedCategory) {
      this.filters.category.push(selectedCategory.value)
    },
    handleCategoryDeselected(selectedCategory) {
      this.filters.category.splice(this.filters.category.indexOf(selectedCategory.value), 1)
    },
    handleStatusSelected(selectedStatus) {
      // Realiza la lógica que deseas con la categoría seleccionada
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
      if (this.selectPayments) {
        this.$refs.expenseMembersView.selectedExpenses.forEach((expense) => {
          expense.isSelected = false
        })
        this.$refs.expenseMembersView.selectedExpenses = []
      }
      this.selectPayments = !this.selectPayments
    },
    handleReset() {
      this.resetFilters = !this.resetFilters
      this.filters.status = null
      this.filters.category = []
    },
    async exportPayments() {
      let payments_info = this.$refs.expenseMembersView.selectedExpenses
      if (payments_info.length === 0) {
        return
      }
      // enviar un array con los ids de los gastos seleccionados
      const response = await axios.post('/payments/export', { payments: [...payments_info.map((payment) => payment.id)] })
      const fileContent = await axios.get(response.data, { responseType: 'arraybuffer' })

      // Crear un Blob con el contenido del archivo
      const blob = new Blob([fileContent.data])

      // Crear un enlace <a> para descargar el archivo
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'nombre_del_archivo.xlsx'

      // Añadir el enlace al documento
      document.body.appendChild(link)

      // Hacer clic en el enlace para iniciar la descarga
      link.click()

      // Eliminar el enlace del documento
      document.body.removeChild(link)

      this.$refs.expenseMembersView.selectedExpenses = []
      this.selectPayments = false
      this.updateKey += 1
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
