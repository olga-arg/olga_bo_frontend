<template>
  <Navbar></Navbar>
  <div className="bg-[#F4F4F4]">
    <Sidebar></Sidebar>
    <div class="p-4 sm:ml-64">
      <div class="px-24">
        <div class="flex items-center justify-between h-20 mb-4">
          <button v-on:click="addMember" className="bg-[rgb(248,247,250)] border-[#DBDADF] border p-1 rounded-md px-6 text-[#8D8B96]">Añadir Miembro</button>
          <div className="flex gap-4 items-center">
            <p className="text-gray-500">Filtrar:</p>

            <Menu as="div" class="relative inline-block">
              <div>
                <MenuButton class="inline-flex w-full text-base py-1 bg-[rgb(248,247,250)] border-[#DBDADF] border p-1 rounded-md px-6 text-[#8D8B96]">
                  {{ teamSelected }}
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-for="team in teams" v-slot="{ active }" v-on:click="selectTeam(team)">
                      <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{ team }}</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
            <button v-if="this.sendFilters.isAdmin" v-on:click="sendAdminFilter" className="bg-red-300 border-red-300 border p-1 rounded-md px-6 text-white">Admin</button>
            <button v-else v-on:click="sendAdminFilter" className="bg-[rgb(248,247,250)] border-[#DBDADF] border p-1 rounded-md px-6 text-[#8D8B96]">Admin</button>
            <button v-if="this.sendFilters.isConfirmed" v-on:click="sendConfirmedFilter" className="bg-red-300 border-red-300 border p-1 rounded-md px-6 text-white">
              No Confirmado
            </button>
            <button v-else v-on:click="sendConfirmedFilter" className=" border-[#DBDADF] border p-1 rounded-md px-6 text-[#8D8B96]">No Confirmado</button>
          </div>
          <form>
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-[#DE848B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                v-on:keypress.enter.prevent="sendNameFilter"
                v-model="employeeNameFilter"
                class="w-full p-2 pl-10 text-sm bg-[#F4F4F4]"
                placeholder="Buscar empleado"
                required
              />
              <div className="w-full h-0.5 bg-[#DE848B]"></div>
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center">
          <div v-if="showAddMember" className="w-96 pt-10 px-10 pb-5 bg-[#1C2E3D] rounded-2xl">
            <div v-if="showSendInvite">
              <div className="flex justify-between">
                <p className="text-[#DE848B] text-xl font-medium">Invitar a Olga</p>
                <button v-on:click="addMember" className="text-[#DE848B] text-xl font-medium">
                  <svg class="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>
              <div v-if="bulkUserCreation" className="flex flex-col gap-2 my-5">
                <div class="flex items-center justify-center w-full h-max-10">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">CSV, XSL, XSLX</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" @change="onFileChange" />
                  </label>
                </div>
              </div>
              <div v-else className="flex flex-col gap-3 mt-5 mb-3">
                <input v-model="name" type="name" name="name" id="name" className="w-full h-14 rounded-md p-4 text-sm bg-[#F4F4F4]" placeholder="Nombre" required />
                <input v-model="surname" type="surname" name="surname" id="surname" className="w-full h-14 rounded-md p-4 text-sm bg-[#F4F4F4]" placeholder="Apellido" required />
                <input v-model="email" type="email" name="email" id="email" className="w-full h-14 rounded-md p-4 text-sm bg-[#F4F4F4]" placeholder="Email" required />
                <Menu as="div" class="relative inline-block text-left">
                  <div>
                    <MenuButton
                      class="inline-flex w-full justify-center rounded-md bg-white py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      {{ employeeCreationRole }}
                      <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </MenuButton>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div class="py-1">
                        <MenuItem v-slot="{ active }" v-on:click="roleNewMember('Empleado')">
                          <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Empleado</a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }" v-on:click="roleNewMember('Revisor')">
                          <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Revisor</a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
            <button v-if="showSendInvite" v-on:click="sendInvite" className="w-full h-14 rounded-md text-md font-medium bg-[#62948F] text-white">Crear Miembro</button>
            <div class="flex justify-center">
              <button class="text-blue-400 text-sm mt-2" v-on:click="bulkUserCreationToggle">Crear multiples usuarios</button>
            </div>

            <div v-if="showStatus200" v-on:click="addMember">
              <button className="w-full h-14 rounded-md p-4 text-md font-medium bg-[#62948F] text-white items-center justify-center flex">
                <svg class="w-6 h-6 mr-2 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                </svg>
              </button>
            </div>
            <div v-if="showStatus400" v-on:click="addMember" className="flex flex-col">
              <!-- <button className="w-full h-14 rounded-md p-4 text-md font-medium bg-[#EA394C] text-white items-center justify-center flex">
                <svg class="w-6 h-6 mr-2 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button> -->
              <p className="w-full rounded-md p-1 mt-2 text-md font-medium bg-[#41313E] border border-[#EA394C] text-[#EA394C] items-center justify-center flex">{{ error }}</p>
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
            <MembersMembersView :key="forceReload" :filters="sendFilters"></MembersMembersView>
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
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import MembersMembersView from './components/MembersMembersView.vue'
import axios from '@/axios'
import { ref } from 'vue'

export default {
  name: 'App',
  data() {
    return {
      teamSelected: 'Equipo',
      teams: [],
      showAddMember: ref(false),
      showSendInvite: ref(false),
      statusLoading: false,
      showStatus200: false,
      showStatus400: false,
      error: '',
      forceReload: false,
      bulkUserCreation: false,
      employeeNameFilter: '',
      employeeCreationRole: 'Empleado',
      filters: {
        name: this.employeeNameFilter,
        isAdmin: false,
        isConfirmed: false,
      },
      sendFilters: {
        name: '',
        isAdmin: false,
        isConfirmed: false,
        team: '',
      }, // Could be done better
    }
  },
  watch: {
    employeeNameFilter() {
      if (this.employeeNameFilter === '') {
        this.sendFilters.name = ''
      }
    },
  },
  methods: {
    selectTeam(team) {
      if (team === 'Equipo') {
        this.sendFilters.team = ''
        this.teamSelected = 'Equipo'
        return
      }
      this.sendFilters.team = team
    },
    roleNewMember(roleSelected) {
      this.employeeCreationRole = roleSelected
    },
    onFileChange(e) {
      const xslx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const xsl = 'application/vnd.ms-excel'
      const csv = 'text/csv'
      if (e.target.files[0].type === xslx || e.target.files[0].type === xsl || e.target.files[0].type === csv) {
        console.log('es un archivo valido')
      } else {
        console.log('no es un archivo valido')
      }
    },
    bulkUserCreationToggle() {
      this.bulkUserCreation = !this.bulkUserCreation
    },
    sendNameFilter() {
      this.sendFilters.name = this.employeeNameFilter
    },
    sendAdminFilter() {
      this.sendFilters.isAdmin = !this.sendFilters.isAdmin
    },
    sendConfirmedFilter() {
      this.sendFilters.isConfirmed = !this.sendFilters.isConfirmed
    },
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
      this.showStatus400 = false
      try {
        const response = await axios.post('/users', {
          name: this.name,
          surname: this.surname,
          email: this.email,
        })
      } catch (error) {
        this.statusLoading = false
        this.showStatus400 = true
        this.showSendInvite = true
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

      await new Promise((r) => setTimeout(r, 1500))
      // to close the modal
      this.addMember()
    },
  },
  async mounted() {
    this.teams = await axios.get('/teams').then((response) => {
      // this.teams must be an array of strings with the name of the teams
      return response.data.teams.map((team) => {
        return team.name
      })
    })
  },
  components: {
    Sidebar,
    Navbar,
    MembersMembersView,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  },
}
</script>

<style>
.container .vue-grid-item.vue-grid-placeholder {
  background: green;
}
.vue-grid-layout {
  background: #eee;
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
.vue-grid-item .static {
  background: #cce;
}
.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}
.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-grid-item .minMax {
  font-size: 12px;
}
.vue-grid-item .add {
  cursor: pointer;
}
.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
