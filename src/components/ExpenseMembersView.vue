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
  const data = [
    {
      nombre_comercio: 'Supermercado ABC',
      realizado_por: 'Juan Perez',
      status: 'APROBADO',
      monto: 10,
      fecha_hora: '2022-03-01T13:30:00',
      tipo_pago: {
        con_tarjeta: true,
        ultimos_4_digitos: '1234',
        tipo: 'fisica',
      },
    },
    {
      nombre_comercio: 'Supermercado',
      realizado_por: 'Juan Perez',
      status: 'SIN REVISAR',
      monto: 2,
      fecha_hora: '2022-03-01T13:30:00',
      tipo_pago: {
        con_tarjeta: true,
        ultimos_4_digitos: '1234',
        tipo: 'fisica',
      },
    },
  ]
  return data
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
      for (let i = 0; i < this.allExpenses.length; i += 2) {
        chunked.push(this.allExpenses.slice(i, i + 2))
      }
      return chunked
    },
  },
}
</script>
