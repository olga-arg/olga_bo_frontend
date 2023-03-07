<template>
  <div v-for="expenses in chunkedAllExpenses" className="grid grid-cols-2 grid-flow-col gap-6 my-8">
    <div v-for="expense in expenses" class="h-max bg-white rounded-lg flex p-5 px-10">
      <CardExpensesMember :expense="expense"></CardExpensesMember>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CardExpensesMember from '@/components/CardExpensesMember.vue'

const getAllExpenses = async () => {
  //const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  //return response.data
  const data = [
    {
      nombre_comercio: 'Supermercado ABC',
      realizado_por: 'Juan Perez',
      fecha_hora: '2022-03-01T13:30:00',
      tipo_pago: {
        con_tarjeta: true,
        ultimos_4_digitos: '1234',
        tipo: 'fisica',
      },
      categoria: {
        estado: 'Aprobado',
        categoria_gasto: 'Comida',
        category_icon: 'utensils',
        tag: 'Almuerzo',
        tag_icon: 'utensil-spoon',
      },
      monto: 50.0,
    },
    {
      nombre_comercio: 'Gasolinera XYZ',
      realizado_por: 'Maria Garcia',
      fecha_hora: '2022-03-02T10:00:00',
      tipo_pago: {
        con_tarjeta: true,
        ultimos_4_digitos: '5678',
        tipo: 'virtual',
      },
      categoria: {
        estado: 'Sin Recibo',
        categoria_gasto: 'Transporte',
        category_icon: 'car',
        tag: null,
        tag_icon: null,
      },
      monto: 30.0,
      tag: 'Combustible',
      tag_icon: 'gas-pump',
    },
    {
      nombre_comercio: null,
      realizado_por: 'Pedro Hernandez',
      fecha_hora: '2022-03-03T18:15:00',
      tipo_pago: {
        con_tarjeta: false,
      },
      categoria: {
        estado: 'Cambios a Realizar',
        categoria_gasto: 'Otros',
        category_icon: 'question',
        tag: null,
        tag_icon: null,
      },
      monto: 20.0,
      tag: 'Gasto varios',
      tag_icon: 'shopping-bag',
    },
    {
      nombre_comercio: 'Tienda de ropa XYZ',
      realizado_por: 'Ana Torres',
      fecha_hora: '2022-03-04T15:30:00',
      tipo_pago: {
        con_tarjeta: true,
        ultimos_4_digitos: '9012',
        tipo: 'fisica',
      },
      categoria: {
        estado: 'Aprobado',
        categoria_gasto: 'Ropa',
        category_icon: 'tshirt',
        tag: 'Vestido',
        tag_icon: 'person-dress',
      },
      monto: 80.0,
    },
    {
      nombre_comercio: 'Cine ABC',
      realizado_por: 'Jorge Sanchez',
      fecha_hora: '2022-03-05T20:00:00',
      tipo_pago: {
        con_tarjeta: true,
        ultimos_4_digitos: '3456',
        tipo: 'virtual',
      },
      categoria: {
        estado: 'Rechazado',
        categoria_gasto: 'Entretenimiento',
        category_icon: 'film',
        tag: 'Cine',
        tag_icon: 'ticket-alt',
      },
      monto: 25,
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
