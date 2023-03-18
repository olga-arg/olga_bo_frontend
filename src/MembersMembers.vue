<template>
  <div className="bg-[#F4F4F4]">
    <Sidebar currentRouteName="teams"></Sidebar>
    <div class="p-4 sm:ml-64">
      <div class="px-24">
        <div class="flex items-center justify-between h-20 mb-4">
          <button v-on:click="addMember" className="bg-[rgb(248,247,250)] border-[#DBDADF] border p-1 rounded-md px-6 text-[#8D8B96]">Añadir Miembro</button>
          <form>
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-[#DE848B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input class="w-full p-2 pl-10 text-sm bg-[#F4F4F4]" placeholder="Buscar empleado" required />
              <div className="w-full h-0.5 bg-[#DE848B]"></div>
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center">
          <div v-if="showAddMember" className="w-96 p-10 bg-[#1C2E3D] rounded-2xl">
            <div v-if="showSendInvite">
              <div className="flex justify-between">
                <p className="text-[#DE848B] text-xl font-medium">Invitar a Olga</p>
                <p className="text-white">X</p>
              </div>
              <div className="flex flex-col gap-2 my-10">
                <input v-model="name" type="name" name="name" id="name" className="w-full h-14 rounded-md p-4 text-sm bg-[#F4F4F4]" placeholder="Nombre" required />
                <input v-model="surname" type="surname" name="surname" id="surname" className="w-full h-14 rounded-md p-4 text-sm bg-[#F4F4F4]" placeholder="Apellido" required />
                <input v-model="email" type="email" name="email" id="email" className="w-full h-14 rounded-md p-4 text-sm bg-[#F4F4F4]" placeholder="Email" required />
              </div>
            </div>
            <div></div>
            <button v-if="showSendInvite" v-on:click="sendInvite" className="w-full h-14 rounded-md p-4 text-md font-medium bg-[#62948F] text-white">Enviar Invitación</button>
            <div v-if="showStatus200" v-on:click="addMember">
              <button className="w-full h-14 rounded-md p-4 text-md font-medium bg-[#62948F] text-white items-center justify-center flex">
                <svg class="w-6 h-6 mr-2 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                </svg>
              </button>
            </div>
            <div v-if="showStatus400" v-on:click="addMember" className="flex flex-col gap-1">
              <button className="w-full h-14 rounded-md p-4 text-md font-medium bg-[#EA394C] text-white items-center justify-center flex">
                <svg class="w-6 h-6 mr-2 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
              <p className="w-full rounded-md p-1 text-md font-medium bg-[#41313E] border border-[#EA394C] text-[#EA394C] items-center justify-center flex">{{ error }}</p>
            </div>
            <div v-if="statusLoading" className="w-full h-14 rounded-md p-4 text-md font-medium bg-gray-400 text-white flex items-center justify-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
        <Suspense>
          <template #default>
            <MembersMembersView :key="forceReload"></MembersMembersView>
          </template>
          <template #fallback>
            <div class="flex justify-center items-center h-96">
              <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import MembersMembersView from './components/MembersMembersView.vue'
import axios from 'axios'
import { ref } from 'vue'

export default {
  name: 'App',
  data() {
    return {
      showAddMember: ref(false),
      showSendInvite: ref(false),
      statusLoading: false,
      showStatus200: false,
      showStatus400: false,
      error: '',
      forceReload: false,
    }
  },
  methods: {
    addMember() {
      this.showAddMember = !this.showAddMember
      this.showSendInvite = this.showAddMember
      this.statusLoading = false
      this.showStatus200 = false
      this.showStatus400 = false
    },
    async sendInvite() {
      if (this.name === undefined || this.surname === undefined || this.email === undefined) {
        return
      }
      this.showSendInvite = false
      this.statusLoading = true
      try {
        const response = await axios.post('https://api.olga.lat/api/users', {
          name: this.name,
          surname: this.surname,
          email: this.email,
        })
      } catch (error) {
        this.statusLoading = false
        this.showStatus400 = true
        this.showSendInvite = false
        this.name = ''
        this.surname = ''
        this.email = ''
        console.log(error.response.data)
        this.error = error.response.data
        return
      }
      this.forceReload = !this.forceReload
      this.statusLoading = false
      this.showStatus200 = true
      this.showSendInvite = false
      this.name = ''
      this.surname = ''
      this.email = ''
    },
  },
  components: {
    Sidebar,
    MembersMembersView,
  },
}
</script>
