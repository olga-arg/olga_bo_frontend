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
      console.log('hola')
      const filter = []
      const response = []
      for (let i = 0; i < this.allMembers.users.length; i++) {
        if (this.allMembers.users[i].name.toLowerCase().includes(this.filter.toLowerCase())) {
          filter.push(this.allMembers.users[i])
        }
      }
      for (let i = 0; i < filter.length; i += 2) {
        response.push(filter.slice(i, i + 2))
      }
      return response
    },
  },
  props: {
    filter: String,
  },
}
</script>
