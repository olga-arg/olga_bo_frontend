<template>
  <Share @close="shareToggle" v-if="share" :team="teamSelected" :users="this.allUsers.users"></Share>
  <div v-for="teams in chunkedAllTeams" className="grid grid-cols-2 grid-flow-col gap-6 my-8">
    <div v-for="team in teams" class="h-max bg-white rounded-lg flex p-5 px-10">
      <CardMembersTeam v-on:click="shareToggle(team)" :team="team"></CardMembersTeam>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
import CardMembersTeam from './CardMembersTeam.vue'
import Share from './Share.vue'

const getTeams = async () => {
  const response = await axios.get('/teams')
  return response.data
}
const getUsers = async () => {
  const response = await axios.get('/users')
  return response.data
}

export default {
  name: 'MyAsyncComponent',
  async setup() {
    const allTeams = await getTeams()
    const allUsers = await getUsers()
    return { allTeams, allUsers }
  },
  data() {
    return {
      allTeams: [],
      allUsers: [],
      share: false,
      teamSelected: null,
    }
  },
  computed: {
    chunkedAllTeams() {
      return this.chunk()
    },
  },
  components: {
    CardMembersTeam,
    Share,
  },
  methods: {
    callback() {
      this.share = !this.share
    },
    chunk() {
      const chunked = []
      for (let i = 0; i < this.allTeams.teams.length; i += 2) {
        chunked.push(this.allTeams.teams.slice(i, i + 2))
      }
      return chunked
    },
    shareToggle(team) {
      this.teamSelected = team
      this.share = !this.share
    },
  },
  props: {
    filters: Object,
  },
}
</script>
