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
              <Popover v-model:open="open">
                <PopoverTrigger as-child>
                  <Button variant="outline" class="ml-auto w-48 h-6">
                    {{ userRole }}
                    <ChevronDownIcon class="ml-2 h-4 w-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="p-0" align="end">
                  <!-- <Command v-model="sofiaRole"> -->
                  <Command>
                    <CommandInput placeholder="Select new role..." />
                    <CommandList>
                      <CommandEmpty>No roles found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          v-on:click="changeRol('Empleado')"
                          value="Empleado"
                          class="teamaspace-y-1 flex flex-col items-start px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <p>Empleado</p>
                          <p class="text-sm text-muted-foreground">Can only access the mobile app.</p>
                        </CommandItem>
                        <CommandItem v-on:click="changeRol('Revisor')" value="Revisor" class="teamaspace-y-1 flex flex-col items-start px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          <p>Revisor</p>
                          <p class="text-sm text-muted-foreground">Can view users, teams, and edit expenses.</p>
                        </CommandItem>
                        <CommandItem
                          v-on:click="changeRol('Contador')"
                          value="Contador"
                          class="teamaspace-y-1 flex flex-col items-start px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <p>Contador</p>
                          <p class="text-sm text-muted-foreground">Can only export expenses.</p>
                        </CommandItem>
                        <CommandItem v-on:click="changeRol('Admin')" value="Admin" class="teamaspace-y-1 flex flex-col items-start px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          <p>Admin</p>
                          <p class="text-sm text-muted-foreground">Admin-level access to all resources.</p>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <!-- <button
                v-if="new_is_admin"
                v-on:click="changeRol"
                class="ring-pink-300 inline-flex w-24 justify-center rounded-md bg-white py-2 text-sm font-semibold text-gray-900 shadow-sm ring-2 ring-inset hover:bg-gray-50"
              >
                Revisor
              </button>
              <button
                v-else
                v-on:click="changeRol"
                class="inline-flex w-24 justify-center rounded-md bg-white py-2 text-sm font-semibold text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Miembro
              </button> -->
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
                v-on:click="updateUser(user)"
                class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
              >
                Guardar
              </button>
            </div>
            <div v-if="error" class="text-red-500 text-center pt-5">{{ error }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import Button from '@/components/ui/button/Button.vue'

export default {
  name: 'EditMember',
  data() {
    return {
      userRole: '',
      new_monthly_limit: this.formatNumberWithDots(this.user.monthly_limit.toString()),
      new_purchase_limit: this.formatNumberWithDots(this.user.purchase_limit.toString()),
      new_role: this.user.role,
      originalRoute: this.$route.path,
      activeRoute: this.$route.path.split('/').slice(-1)[0],
      usersNotInTeam: this.users,
      monthly_limit_difference: '',
      purchase_limit_difference: '',
      sendFilters: {
        name: '',
      }, // Could be done better
      error: '',
    }
  },
  methods: {
    changeRol(newRole) {
      this.userRole = newRole
      if (newRole === 'Revisor') {
        this.new_role = 1
      } else if (newRole === 'Admin') {
        this.new_role = 2
      } else if (newRole === 'Contador') {
        this.new_role = 3
      } else {
        this.new_role = 0
      }
    },
    async updateUser(user) {
      let url = '/users/' + user.id
      // validate if the values are different from the original ones to make the request
      if (
        this.new_monthly_limit == this.formatNumberWithDots(user.monthly_limit.toString()) &&
        this.new_purchase_limit == this.formatNumberWithDots(user.purchase_limit.toString()) &&
        this.new_role == user.role
      ) {
        this.$emit('close')
        return
      }
      try {
        console.log('nR: ', this.userRole)
        const response = await axios.patch(url, {
          purchase_limit: Number(this.new_purchase_limit.replace(/[^\d]/g, '')),
          monthly_limit: Number(this.new_monthly_limit.replace(/[^\d]/g, '')),
          role: this.userRole == 'Revisor' ? 'Reviewer' : this.userRole == 'Admin' ? 'Admin' : this.userRole == 'Contador' ? 'Accountant' : 'Employee',
        })
      } catch (error) {
        console.log('eee', error)
        this.error = error.response.data
        return
      }

      this.user.purchase_limit = Number(this.new_purchase_limit.replace(/[^\d]/g, ''))
      this.user.monthly_limit = Number(this.new_monthly_limit.replace(/[^\d]/g, ''))
      this.user.role = this.new_role
      this.$emit('close')
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
  mounted() {
    if (this.user.role === 1) {
      this.userRole = 'Revisor'
    } else if (this.user.role === 2) {
      this.userRole = 'Admin'
    } else if (this.user.role === 3) {
      this.userRole = 'Contador'
    } else {
      this.userRole = 'Empleado'
    }
  },
  watch: {
    $route() {
      this.originalRoute = this.$route.path
      this.activeRoute = this.$route.path.split('/').slice(-1)[0]
    },
  },
  props: {
    user: Object,
  },
  components: {
    Popover,
    PopoverContent,
    PopoverTrigger,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Button,
  },
}
</script>
