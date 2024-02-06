<template>
  <EditExpense @close="callback" v-if="editExpense" :expense="expenseSelected" :categories="Object.keys(this.categories)"></EditExpense>
  <div v-for="expenses in chunkedAllExpenses" className="grid grid-cols-2 grid-flow-col gap-6 my-8">
    <div v-for="expense in expenses" :key="expense.id" class="bg-white rounded-lg flex p-5 w-full">
      <CardExpensesMember
        :selectPayments="this.selectPayments"
        :isSelected="this.selectedExpenses.some((selectedExpense) => selectedExpense.id == expense.id)"
        :expense="expense"
        :category="this.categories[expense.category]"
        v-on:click="addToSelection(expense)"
      ></CardExpensesMember>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
import CardExpensesMember from '@/components/CardExpensesMember.vue'
import EditExpense from './EditExpense.vue'

const getAllExpenses = async () => {
  const response = await axios.get('/payments')
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
      selectedExpenses: [],
      paymentsFiltered: [],
      expenseSelected: null,
      editExpense: false,
    }
  },
  watch: {
    'filters.search': function (newSearch, oldSearch) {
      this.chunk()
    },
  },
  computed: {
    chunkedAllExpenses() {
      return this.chunk()
    },
  },
  components: {
    CardExpensesMember,
    EditExpense,
  },
  methods: {
    callback(expense) {
      this.expenseSelected = expense
      // only change the editExpense if not in selectPayments mode
      console.log('selectPayments', this.selectPayments)
      console.log('editExpense', this.editExpense)

      if (!this.selectPayments) this.editExpense = !this.editExpense
    },
    chunk() {
      let response = []
      // Hacer una copia del arreglo original para evitar modificarlo directamente
      let filter = [...this.allExpenses.payments]
      // Ordenar los elementos según la fecha de creación
      filter.sort((a, b) => new Date(b.created) - new Date(a.created))

      // Aplicar los demás filtros
      if (this.filters.category && this.filters.category.length > 0) {
        filter = filter.filter((expense) => this.filters.category.includes(expense.category))
      }
      if (this.filters.rangeDates.start && this.filters.rangeDates.end) {
        filter = filter.filter((expense) => {
          const formattedDate = new Date(expense.date)
          // Obtén las fechas sin tener en cuenta las horas
          const expenseDate = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate())
          const startDate = new Date(this.filters.rangeDates.start.getFullYear(), this.filters.rangeDates.start.getMonth(), this.filters.rangeDates.start.getDate())
          const endDate = new Date(this.filters.rangeDates.end.getFullYear(), this.filters.rangeDates.end.getMonth(), this.filters.rangeDates.end.getDate())

          return expenseDate >= startDate && expenseDate <= endDate
        })
      }
      if (this.filters.status) {
        if (this.filters.status === 'Pending') filter = filter.filter((expense) => expense.status === 0)
        else if (this.filters.status === 'Approved') filter = filter.filter((expense) => expense.status === 1)
        else if (this.filters.status === 'Exported') filter = filter.filter((expense) => expense.status === 4)
      }

      if (this.filters.search) {
        filter = filter.filter((expense) => {
          return expense.User.full_name.toLowerCase().includes(this.filters.search.toLowerCase()) || expense.shop_name.toLowerCase().includes(this.filters.search.toLowerCase())
        })
      }
      this.paymentsFiltered = [...filter]
      // Agrupar los elementos en pares
      for (let i = 0; i < filter.length; i += 2) {
        response.push(filter.slice(i, i + 2))
      }

      return response
    },
    addToSelection(expense) {
      this.callback(expense)
      // verify if the expense.id == expenseSelected any id in selectedExpenses
      if (this.selectPayments) {
        if (this.selectedExpenses.some((selectedExpense) => selectedExpense.id == expense.id)) {
          const expenseIndex = this.selectedExpenses.findIndex((selectedExpense) => selectedExpense.id === expense.id)
          if (expenseIndex !== -1) {
            this.selectedExpenses.splice(expenseIndex, 1)
          }
        } else {
          this.selectedExpenses.push(expense)
        }
      }
    },
  },
  watch: {
    exportAll() {
      this.selectedExpenses = [...this.paymentsFiltered]
    },
  },
  props: {
    exportAll: Boolean,
    selectPayments: Boolean,
    filters: Object,
    categories: Object,
  },
}
</script>
