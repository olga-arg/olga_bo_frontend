<template>
  <EditMember @close="callback" v-if="editMember" :user="userSelected"></EditMember>
  <div v-for="members in chunkedAllMembers" className="grid grid-cols-2 grid-flow-col gap-6 my-8">
    <div v-for="member in members" class="h-max bg-white rounded-lg flex p-5 px-10">
      <CardMembersMember v-on:click="callback(member)" :member="member"></CardMembersMember>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
import CardMembersMember from './CardMembersMember.vue'
import EditMember from './EditMember.vue'

const getAllMembers = async () => {
  const response = await axios.get('/users')
  return response.data
}

export default {
  name: 'MyAsyncComponent',
  async setup() {
    const allMembers = await getAllMembers()
    return { allMembers }
  },
  data() {
    return {
      userSelected: null,
      editMember: false,
      allMembers: [],
    }
  },
  computed: {
    chunkedAllMembers() {
      return this.chunk()
    },
  },
  components: {
    CardMembersMember,
    EditMember,
  },
  methods: {
    callback(member) {
      this.userSelected = member
      this.editMember = !this.editMember
    },
    chunk() {
      let response = []
      let filter = []

      if (this.filters.team && this.filters.team.length > 0) {
        this.teams.forEach((team) => {
          if (this.filters.team.includes(team.name)) {
            team.users.forEach((teamUser) => {
              const matchingUser = this.allMembers.users.find((member) => member.id === teamUser.id)
              if (matchingUser) {
                filter.push(matchingUser)
              }
            })
          }
        })
      } else {
        filter = this.allMembers.users
      }
      if (this.filters.isAdmin) {
        filter = filter.filter((member) => {
          return member.role === 2
        })
      }
      if (this.filters.isNotConfirmed) {
        filter = filter.filter((member) => {
          return member.status === 0
        })
      } else {
        filter = filter.filter((member) => {
          return member.status === 5
        })
      }
      if (this.filters.name) {
        filter = filter.filter((member) => {
          return member.name.toLowerCase().includes(this.filters.name.toLowerCase())
        })
      }
      for (let i = 0; i < filter.length; i += 2) {
        response.push(filter.slice(i, i + 2))
      }
      return response
    },
  },
  props: {
    filters: Object,
    teams: Array,
  },
}
</script>
