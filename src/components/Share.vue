<template>
  <div class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24" id="headlessui-dialog-19" role="dialog" aria-modal="true" data-headlessui-state="open">
    <div class="fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100"></div>
    <div class="relative w-full max-w-lg transform px-4 transition-all opacity-100 scale-100">
      <div class="overflow-hidden rounded-lg bg-white shadow-md" id="headlessui-dialog-panel-20" data-headlessui-state="open">
        <div class="relative" data-form-type="">
          <div class="flex-col p-5">
            <div class="flex items-center pb-5 justify-between pr-4">
              <div class="">Añadir miembros a {{ team?.name }}</div>
              <button class="text-gray-600 font-bold" v-on:click="$emit('close')">X</button>
            </div>
            <div class="flex">
              <input
                v-on:keypress.enter.prevent="sendNameFilter"
                v-on:click="toggleUsers"
                v-model="employeeNameFilter"
                class="block w-full appearance-none rounded-md bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
                placeholder="Añadir miembro"
                aria-label="Search components"
                role="combobox"
                type="text"
                aria-expanded="false"
                aria-autocomplete="list"
                style="caret-color: rgb(107, 114, 128)"
                tabindex="0"
                data-form-type=""
                required
              />
            </div>
            <!-- Empieza -->
            <div
              class="relative z-10 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div v-if="showUsers" class="py-1" role="none">
                <div v-for="user in usersNotInTeam.slice(0, 5)" class="cursor-pointer flex justify-between items-center py-2 hover:bg-slate-50" v-on:click="addToTeam(team, user)">
                  <div class="flex items-center">
                    <div class="h-8 w-8 bg-red-300 rounded-full mx-4"></div>
                    <div class="flex-col">
                      <a class="text-gray-700 block text-sm">{{ user.name }} {{ user.surname }}</a>
                      <a class="text-gray-700 block text-sm">{{ user.email }}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Termina -->
            <div class="py-2">Miembros</div>
            <a v-if="!this.team.users" class="flex justify-center text-gray-400 text-sm">Sin miembros</a>
            <div v-for="user in team?.users" class="flex justify-between items-center pt-2">
              <div class="flex items-center">
                <div class="h-8 w-8 bg-red-300 rounded-full mr-5"></div>
                <div class="flex-col">
                  <a class="text-gray-700 block text-sm">{{ user.name }} {{ user.surname }}</a>
                  <a class="text-gray-700 block text-sm">{{ user.email }}</a>
                </div>
              </div>
              <div class="flex items-center p-1">
                <button v-if="user.id !== team.reviewer.id" class="mr-5 text-red-600 font-bold" v-on:click="removeFromTeam(team, user)">X</button>
                <div v-if="user.id === team.reviewer.id">
                  <svg class="w-4 h-4 text-[#ED7B65] fill-current" viewBox="0.5586 -0.0999 6.347 9.754">
                    <path
                      d="M 5.9276 2.1953 C 5.9276 3.4077 4.9447 4.3906 3.7323 4.3906 C 2.5199 4.3906 1.5371 3.4077 1.5371 2.1953 C 1.5371 0.983 2.5199 0.0001 3.7323 0.0001 C 4.9447 0.0001 5.9276 0.983 5.9276 2.1953 Z Z M 6.8052 8.3419 C 6.8052 8.7728 6.7176 9.0007 6.6298 9.1269 C 6.547 9.246 6.4156 9.3445 6.1761 9.4186 C 5.9245 9.4964 5.5935 9.5345 5.164 9.5478 C 4.8752 9.5568 4.575 9.5545 4.2473 9.5519 C 4.0831 9.5506 3.9119 9.5492 3.7319 9.5492 C 3.5518 9.5492 3.3807 9.5506 3.2164 9.5519 C 2.8888 9.5545 2.5886 9.5568 2.2998 9.5478 C 1.8702 9.5345 1.5392 9.4964 1.2876 9.4186 C 1.0482 9.3445 0.9168 9.246 0.8339 9.1269 C 0.7462 9.0007 0.6586 8.7728 0.6586 8.3419 C 0.6586 6.6445 2.0345 5.2686 3.7319 5.2686 C 5.4292 5.2686 6.8052 6.6445 6.8052 8.3419 Z"
                    />
                  </svg>
                </div>
                <div class="flex" v-else>
                  <button v-on:click="toReviewer(team, user)">
                    <svg class="w-4 h-4 text-gray-500 fill-current" viewBox="0.5586 -0.0999 6.347 9.754">
                      <path
                        d="M 5.9276 2.1953 C 5.9276 3.4077 4.9447 4.3906 3.7323 4.3906 C 2.5199 4.3906 1.5371 3.4077 1.5371 2.1953 C 1.5371 0.983 2.5199 0.0001 3.7323 0.0001 C 4.9447 0.0001 5.9276 0.983 5.9276 2.1953 Z Z M 6.8052 8.3419 C 6.8052 8.7728 6.7176 9.0007 6.6298 9.1269 C 6.547 9.246 6.4156 9.3445 6.1761 9.4186 C 5.9245 9.4964 5.5935 9.5345 5.164 9.5478 C 4.8752 9.5568 4.575 9.5545 4.2473 9.5519 C 4.0831 9.5506 3.9119 9.5492 3.7319 9.5492 C 3.5518 9.5492 3.3807 9.5506 3.2164 9.5519 C 2.8888 9.5545 2.5886 9.5568 2.2998 9.5478 C 1.8702 9.5345 1.5392 9.4964 1.2876 9.4186 C 1.0482 9.3445 0.9168 9.246 0.8339 9.1269 C 0.7462 9.0007 0.6586 8.7728 0.6586 8.3419 C 0.6586 6.6445 2.0345 5.2686 3.7319 5.2686 C 5.4292 5.2686 6.8052 6.6445 6.8052 8.3419 Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  name: 'Share',
  data() {
    let usersInsideTeam = JSON.parse(JSON.stringify(this.team?.users))
    if (!this.team?.users) {
      this.team.users = []
    }
    if (usersInsideTeam != null) {
      // remove users from this.users that are already inside the team
      let usersNotInTeam = this.users.filter((user) => {
        return !usersInsideTeam.some((userInsideTeam) => {
          return user.id === userInsideTeam.id
        })
      })

      return {
        originalRoute: this.$route.path,
        activeRoute: this.$route.path.split('/').slice(-1)[0],
        usersNotInTeam: usersNotInTeam,
        employeeNameFilter: '',
        filters: {
          name: this.employeeNameFilter,
        },
        sendFilters: {
          name: '',
        },
        showUsers: false,
      }
    }
    return {
      originalRoute: this.$route.path,
      activeRoute: this.$route.path.split('/').slice(-1)[0],
      usersNotInTeam: this.users,
      filters: {
        name: this.employeeNameFilter,
      },
      sendFilters: {
        name: '',
      }, // Could be done better
      showUsers: false,
    }
  },
  methods: {
    toggleUsers() {
      this.showUsers = true
    },
    async toReviewer(team, user) {
      let url = '/teams/' + team.id
      const response = await axios.patch(url, {
        reviewer_id: user.id,
      })
      this.team.reviewer = user
    },
    sendNameFilter() {
      this.sendFilters.name = this.employeeNameFilter
      // filter users names that match the name filter
      this.usersNotInTeam = this.usersNotInTeam.filter((user) => {
        let fullname = user.name + ' ' + user.surname
        return fullname.toLowerCase().includes(this.sendFilters.name.toLowerCase()) || user.email.toLowerCase().includes(this.sendFilters.name.toLowerCase())
      })
    },
    async addToTeam(team, user) {
      let url = '/teams/' + team.id
      const response = await axios.patch(url, {
        add_users: [user.id],
      })
      // delete the user from the list of usersNotInTeam
      this.usersNotInTeam = this.usersNotInTeam.filter((userNotInTeam) => {
        return userNotInTeam.id !== user.id
      })
      // and add the user to the list of users inside the team
      team.users.push(user)
    },
    async removeFromTeam(team, user) {
      let url = '/teams/' + team.id
      const response = await axios.patch(url, {
        remove_users: [user.id],
      })
      // add the user from the list of usersNotInTeam
      this.usersNotInTeam.push(user)

      // and add the user to the list of users inside the team
      team.users.splice(team.users.indexOf(user), 1)
    },
  },
  watch: {
    employeeNameFilter() {
      if (this.employeeNameFilter === '') {
        this.sendFilters.name = ''
        // get the users back into usersNotInTeam
        this.usersNotInTeam = this.users.filter((user) => {
          return !this.team.users.some((userInsideTeam) => {
            return user.id === userInsideTeam.id
          })
        })
      }
    },
    $route() {
      this.originalRoute = this.$route.path
      this.activeRoute = this.$route.path.split('/').slice(-1)[0]
    },
  },
  props: {
    team: Object,
    users: Array,
  },
}
</script>
