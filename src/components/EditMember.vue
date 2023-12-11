<template>
  <div class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24" id="headlessui-dialog-19" role="dialog" aria-modal="true" data-headlessui-state="open">
    <div class="fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100"></div>
    <div class="relative w-full max-w-lg transform px-4 transition-all opacity-100 scale-100">
      <div class="overflow-hidden rounded-lg bg-white shadow-md" id="headlessui-dialog-panel-20" data-headlessui-state="open">
        <div class="relative" data-form-type="">
          <div class="flex-col p-5">
            <div class="flex items-center pb-5 justify-between">
              <div class="">{{ user.name }} {{ user.surname }}</div>

              <button class="text-gray-600 font-bold" v-on:click="$emit('close')">X</button>
            </div>

            <div class="flex items-center justify-between pt-5">
              <div class="">Limite mensual</div>
              <div class="flex gap-4 items-center">
                <a v-if="monthly_limit_difference > 0" class="text-green-500">+{{ this.formatNumberWithDots(monthly_limit_difference) }}</a>
                <a v-else-if="monthly_limit_difference == 0"></a>
                <a v-else="monthly_limit_difference < 0" class="text-red-500">{{ this.formatNumberWithDots(monthly_limit_difference) }}</a>
                <input v-model="new_monthly_limit" @input="formatLimit" class="border border-gray-300 font-medium rounded-lg text-center" />
              </div>
            </div>
            <div class="flex items-center justify-between pt-5">
              <div class="">Limite por Compra</div>
              <div class="flex gap-4 items-center">
                <a v-if="purchase_limit_difference > 0" class="text-green-500">+{{ this.formatNumberWithDots(purchase_limit_difference) }}</a>
                <a v-else-if="purchase_limit_difference == 0"></a>
                <a v-else="purchase_limit_difference < 0" class="text-red-500">{{ this.formatNumberWithDots(purchase_limit_difference) }}</a>
                <input v-model="new_purchase_limit" @input="formatLimit" class="border border-gray-300 font-medium rounded-lg text-center" />
              </div>
            </div>
            <div class="flex items-center justify-between pt-5">
              <div class="">Rol</div>
              <button
                v-if="user.isAdmin"
                v-on:click="changeRol"
                class="ring-pink-300 inline-flex w-24 justify-center rounded-md bg-white py-2 text-sm font-semibold text-gray-900 shadow-sm ring-2 ring-inset hover:bg-gray-50"
              >
                Admin
              </button>
              <button
                v-else
                v-on:click="changeRol"
                class="inline-flex w-24 justify-center rounded-md bg-white py-2 text-sm font-semibold text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Miembro
              </button>
            </div>
            <div class="flex justify-center gap-10 pt-4">
              <button
                v-on:click="$emit('close')"
                type="button"
                class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Cancelar
              </button>
              <button
                type="button"
                class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditMember',
  data() {
    return {
      new_monthly_limit: this.formatNumberWithDots(this.user.monthly_limit.toString()),
      new_purchase_limit: this.formatNumberWithDots(this.user.purchase_limit.toString()),
      originalRoute: this.$route.path,
      activeRoute: this.$route.path.split('/').slice(-1)[0],
      usersNotInTeam: this.users,
      monthly_limit_difference: '',
      purchase_limit_difference: '',
      filters: {
        name: this.employeeNameFilter,
      },
      sendFilters: {
        name: '',
      }, // Could be done better
    }
  },
  methods: {
    changeRol() {
      this.user.isAdmin = !this.user.isAdmin
    },
    async toReviewer(team, user) {
      let url = 'https://api.olga.lat/api/teams/' + team.id
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
        return fullname.toLowerCase().includes(this.sendFilters.name.toLowerCase())
      })
    },
    async addToTeam(team, user) {
      let url = 'https://api.olga.lat/api/teams/' + team.id
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
      let url = 'https://api.olga.lat/api/teams/' + team.id
      const response = await axios.patch(url, {
        remove_users: [user.id],
      })
      // delete the user from the list of usersNotInTeam
      this.usersNotInTeam = this.usersNotInTeam.filter((userNotInTeam) => {
        return userNotInTeam.id !== user.id
      })
      // and add the user to the list of users inside the team
      team.users.splice(team.users.indexOf(user), 1)
    },
    formatLimit() {
      let raw_new_monthly_limit = this.new_monthly_limit.replace(/[^\d]/g, '')
      let numeric_new_monthly_limit = parseInt(raw_new_monthly_limit)

      if (!isNaN(numeric_new_monthly_limit) && raw_new_monthly_limit !== '') {
        this.monthly_limit_difference = numeric_new_monthly_limit - parseInt(this.user.monthly_limit)
        this.new_monthly_limit = this.formatNumberWithDots(numeric_new_monthly_limit)
      } else {
        this.monthly_limit_difference = ''
        this.new_monthly_limit = ''
      }

      let raw_new_purchase_limit = this.new_purchase_limit.replace(/[^\d]/g, '')
      let numeric_new_purchase_limit = parseInt(raw_new_purchase_limit)

      if (!isNaN(numeric_new_purchase_limit) && raw_new_purchase_limit !== '') {
        this.purchase_limit_difference = numeric_new_purchase_limit - parseInt(this.user.purchase_limit)
        this.new_purchase_limit = this.formatNumberWithDots(numeric_new_purchase_limit)
      } else {
        this.purchase_limit_difference = ''
        this.new_purchase_limit = ''
      }
    },
    formatNumberWithDots(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
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
    user: Object,
  },
}
</script>
