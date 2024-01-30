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
  console.log(response.data)
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
      filter = this.allMembers.users
      console.log(filter)
      if (this.filters.isAdmin) {
        filter = filter.filter((member) => {
          return member.isAdmin
        })
      }
      if (this.filters.isConfirmed) {
        filter = filter.filter((member) => {
          return member.status === 0
        })
      } else {
        filter = filter.filter((member) => {
          return member.status !== 0
        })
      }
      if (this.filters.name) {
        filter = filter.filter((member) => {
          return member.name.toLowerCase().includes(this.filters.name.toLowerCase())
        })
      }
      if (this.filters.team) {
        // One user can have multiple teams or null
        filter = filter.filter((member) => {
          if (!member.teams) {
            return false
          }
          return member.teams.some((team) => {
            return team.name.toLowerCase().includes(this.filters.team.toLowerCase())
          })
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
  },
}
</script>
