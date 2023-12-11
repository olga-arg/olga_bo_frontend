<template>
  <div v-for="expenses in chunkedAllExpenses" className="grid grid-cols-2 grid-flow-col gap-6 my-8">
    <div v-for="expense in expenses" class="bg-white rounded-lg flex p-5 w-full">
      <CardExpensesMember
        :selectPayments="this.selectPayments"
        :isSelected="selectedExpenses.includes(expense)"
        :expense="expense"
        v-on:click="addToSelection(expense)"
      ></CardExpensesMember>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CardExpensesMember from '@/components/CardExpensesMember.vue'

const getAllExpenses = async () => {
  const response = await axios.get('https://api.olga.lat/api/payments')
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
    }
  },
  computed: {
    chunkedAllExpenses() {
      return this.chunk()
    },
  },
  components: {
    CardExpensesMember,
  },
  methods: {
    chunk() {
      const chunked = []
      if (this.allExpenses.payments) {
        this.allExpenses.payments = this.allExpenses.payments.reverse()
        for (let i = 0; i < this.allExpenses.payments.length; i += 2) {
          chunked.push(this.allExpenses.payments.slice(i, i + 2))
        }
      }
      return chunked
    },
    addToSelection(expense) {
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
  },
}
</script>
