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
  const response = await axios.get('https://jsonplaceholder.typicode.com/users')
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
      const chunked = []
      for (let i = 0; i < this.allMembers.length; i += 2) {
        chunked.push(this.allMembers.slice(i, i + 2))
      }
      return chunked
    },
  },
}
</script>
