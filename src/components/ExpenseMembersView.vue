<template>
  <div v-for="expenses in chunkedAllExpenses" className="grid grid-cols-2 grid-flow-col gap-6 my-8">
    <div v-for="expense in expenses" class="bg-white rounded-lg flex p-5 w-full">
      <CardExpensesMember :expense="expense"></CardExpensesMember>
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
  },
}
</script>
