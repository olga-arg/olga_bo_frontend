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
