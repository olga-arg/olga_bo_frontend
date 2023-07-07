<template>
  <div v-for="members in chunkedAllMembers" className="grid grid-cols-2 grid-flow-col gap-6 my-8">
    <div v-for="member in members" class="h-max bg-white rounded-lg flex p-5 px-10">
      <CardMembersMember :member="member"></CardMembersMember>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CardMembersMember from './CardMembersMember.vue'

const getAllMembers = async () => {
  const response = await axios.get('https://api.olga.lat/api/users')
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
  },
  methods: {
    chunk() {
      let response = []
      let filter = []
      filter = this.allMembers.users
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