<template>
  <EditExpense @close="callback" v-if="editExpense" :expense="expenseSelected" :categories="Object.keys(this.categories)"></EditExpense>
  <div v-for="expenses in chunkedAllExpenses" className="grid grid-cols-2 grid-flow-col gap-6 my-8">
    <div v-for="expense in expenses" :key="expense.created" class="bg-white rounded-lg flex p-5 w-full">
      <CardExpensesMember
        :selectPayments="this.selectPayments"
        :isSelected="selectedExpenses.includes(expense)"
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
      expenseSelected: null,
      editExpense: false,
    }
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
      if (!this.selectPayments) this.editExpense = !this.editExpense
    },
    chunk() {
      let response = []
      // Hacer una copia del arreglo original para evitar modificarlo directamente
      let filter = [...this.allExpenses.payments]

      // Ordenar los elementos según la fecha de creación
      filter.sort((a, b) => new Date(b.created) - new Date(a.created))

      // Aplicar los demás filtros
      if (this.filters.category && this.filters.category != 'Categoria') {
        filter = filter.filter((expense) => expense.category == this.filters.category)
      }
      if (this.filters.rangeDates) {
        filter = filter.filter((expense) => {
          return new Date(expense.created) >= new Date(this.filters.rangeDates[0]) && new Date(expense.created) <= new Date(this.filters.rangeDates[1])
        })
      }
      if (this.filters.pending) {
        filter = filter.filter((expense) => expense.status === 0)
      }

      if (this.filters.userEmails && this.filters.userEmails.length > 0) {
        // We are filtering via users, not if the expense corresponds to that team (We must change this)
        filter = filter.filter((expense) => {
          return this.filters.userEmails.includes(expense.User.email)
        })
      }

      // Agrupar los elementos en pares
      for (let i = 0; i < filter.length; i += 2) {
        response.push(filter.slice(i, i + 2))
      }

      return response
    },
    addToSelection(expense) {
      this.callback(expense)
      if (this.selectPayments && !this.selectedExpenses.includes(expense)) {
        expense.isSelected = true
        this.selectedExpenses.push(expense)
      } else if (this.selectPayments && this.selectedExpenses.includes(expense)) {
        expense.isSelected = false
        this.selectedExpenses.splice(this.selectedExpenses.indexOf(expense), 1)
      }
    },
  },
  props: {
    selectPayments: Boolean,
    filters: Object,
    categories: Object,
  },
}
</script>
