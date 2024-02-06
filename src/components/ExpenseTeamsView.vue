<template>
  <div v-for="expenses in chunkedAllExpenses" className="grid grid-cols-2 grid-flow-col gap-6 my-8">
    <div v-for="expense in expenses" class="bg-white rounded-lg flex p-5 w-full">
      <CardExpensesTeam :expense="expense"></CardExpensesTeam>
    </div>
  </div>
</template>

<script>
import CardExpensesTeam from '@/components/CardExpensesTeam.vue'
import ExpenseMembers from '../ExpenseMembers.vue'

export default {
  name: 'MyAsyncComponent',
  async setup() {},
  data() {
    return {}
  },
  computed: {
    chunkedAllExpenses() {
      return this.chunk(this.expenses)
    },
  },
  components: {
    CardExpensesTeam,
    ExpenseMembers,
  },
  methods: {
    chunk(allExpenses) {
      const chunked = []
      if (!allExpenses || allExpenses.length == 0) return chunked
      for (let i = 0; i < allExpenses.length; i += 2) {
        chunked.push(allExpenses.slice(i, i + 2))
      }
      return chunked
    },
  },
  props: {
    expenses: {
      type: Array,
      required: true,
    },
  },
}
</script>
