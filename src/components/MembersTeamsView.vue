<template>
  <div v-for="teams in chunkedAllTeams" className="grid grid-cols-2 grid-flow-col gap-6 my-8">
    <div v-for="team in teams" class="h-max bg-white rounded-lg flex p-5 px-10">
      <CardMembersTeam :team="team"></CardMembersTeam>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CardMembersTeam from './CardMembersTeam.vue'

const getAllTeams = async () => {
  //const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  const data = [
    {
      nombre_del_equipo: 'Desarrollo de software',
      presupuesto_mensual: '10.000',
      administrador: '',
      miembros: ['Jim Smith', 'Jane Doe', 'Jack Johnson', 'Jack Johnson', 'Jack Johnson', 'Jack Johnson'],
      area: 'Software',
    },
    {
      nombre_del_equipo: 'Soporte de IT',
      presupuesto_mensual: '7.500',
      administrador: 'Jane Doe',
      miembros: ['Fred Jones', 'Tim Miller', 'Sally Smith', 'Jack Johnson', 'Jack Johnson'],
      area: 'Soporte',
    },
    {
      nombre_del_equipo: 'Marketing',
      presupuesto_mensual: '15.000',
      administrador: 'John Doe',
      miembros: ['Bob Williams', 'Karen Johnson'],
      area: 'Ventas',
    },
    {
      nombre_del_equipo: 'Ventas Equipo 1',
      presupuesto_mensual: '20.000',
      administrador: '',
      miembros: ['Adam Jones', 'Linda Miller', 'Samantha Smith'],
      area: 'Ventas',
    },
    {
      nombre_del_equipo: 'Investigación Equipo 1',
      presupuesto_mensual: '30.000',
      administrador: 'Jack Johnson',
      miembros: ['John Smith'],
      area: 'Investigación y desarrollo',
    },
  ]
  //return response.data
  return data
}

export default {
  name: 'MyAsyncComponent',
  async setup() {
    const allTeams = await getAllTeams()
    return { allTeams }
  },
  data() {
    return {
      allTeams: [],
    }
  },
  computed: {
    chunkedAllTeams() {
      return this.chunk()
    },
  },
  components: {
    CardMembersTeam,
  },
  methods: {
    chunk() {
      const chunked = []
      for (let i = 0; i < this.allTeams.length; i += 2) {
        chunked.push(this.allTeams.slice(i, i + 2))
      }
      return chunked
    },
  },
}
</script>
