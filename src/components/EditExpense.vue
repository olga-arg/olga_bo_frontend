<template>
  <div class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24" id="headlessui-dialog-19" role="dialog" aria-modal="true" data-headlessui-state="open">
    <div class="fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100"></div>
    <div class="relative transform px-4 transition-all opacity-100 scale-100">
      <div class="overflow-hidden rounded-lg bg-white shadow-md" id="headlessui-dialog-panel-20" data-headlessui-state="open">
        <div class="relative" data-form-type="">
          <div class="flex-col p-5">
            <div class="flex items-center pb-5 justify-between pr-4">
              <div class="flex flex-col">
                <div class="">{{ expense.User.full_name }}</div>
                <div class="text-sm text-gray-400">{{ expense.User.email }}</div>
              </div>
              <div class="flex gap-5 items-center">
                <button class="text-gray-600 font-bold" v-on:click="$emit('close')">X</button>
              </div>
            </div>
            <div class="flex gap-5">
              <div class="flex flex-col gap-3">
                <input
                  v-model="shopName"
                  class="block w-full h-14 border focus:outline-none rounded-md bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 sm:text-sm sm:leading-6"
                  :class="{ 'border-yellow-300 border-2': shopName !== changedFields.shopName }"
                  placeholder="Negocio"
                  aria-label="Search components"
                  role="combobox"
                  aria-expanded="false"
                  aria-autocomplete="list"
                  tabindex="0"
                  data-form-type=""
                  required
                />

                <DatePickerDate
                  :expenseDate="expenseDate"
                  v-model="expenseDate"
                  :class="{ 'border-yellow-300 border-2 rounded-md': expenseDate !== changedFields.expenseDate }"
                  @date-selected="handleDateSelected"
                />
                <div class="flex">
                  <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton
                        class="flex-shrink-0 z-10 inline-flex items-center h-4 py-4 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300"
                        :class="{ 'border-yellow-300 border-2': currency !== changedFields.currency }"
                      >
                        {{ currency }}
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
                      <MenuItems class="left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1">
                          <MenuItem v-slot="{ active }" v-on:click="selectCurrency('ARS $')">
                            <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">ARS $</a>
                          </MenuItem>
                          <MenuItem v-slot="{ active }" v-on:click="selectCurrency('USD $')">
                            <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">USD $</a>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>
                  <input
                    @input="validateNumberInput"
                    v-model="total"
                    class="focus:outline-none block w-44 h-4 py-4 pl-4 pr-12 z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border dark:placeholder-gray-400 dark:text-white"
                    :class="{ 'border-yellow-300 border-2 rounded-md': total != changedFields.total }"
                    placeholder="Monto"
                    required
                  />
                </div>
                <Menu as="div" class="relative inline-block text-left">
                  <div>
                    <MenuButton
                      class="inline-flex w-full h-14 py-4 pl-4 pr-12 text-base rounded-md bg-white font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      :class="{ 'border-yellow-300 border-2 rounded-md': category != changedFields.category }"
                    >
                      {{ category }}
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
                    <MenuItems
                      class="absolute max-h-40 overflow-y-auto left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div class="py-1">
                        <MenuItem v-for="categorie in categories" v-slot="{ active }" v-on:click="selectCategory(categorie)">
                          <a :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{ categorie }}</a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
                <Button
                  v-if="this.status == 0"
                  v-on:click="changeStatus"
                  class="inline-flex justify-center rounded-md bg-white py-2 text-sm font-semibold text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  PENDIENTE
                </Button>
                <Button
                  v-else-if="this.status == 1"
                  v-on:click="changeStatus"
                  class="blue- inline-flex justify-center rounded-md bg-white py-2 text-sm font-semibold text-gray-900 shadow-sm ring-2 ring-inset hover:bg-gray-50"
                >
                  APROBADO
                </Button>
                <Button
                  v-else-if="this.status == 4"
                  v-on:click="changeStatus"
                  class="ring-pink-300 inline-flex justify-center rounded-md bg-white py-2 text-sm font-semibold text-gray-900 shadow-sm ring-2 ring-inset hover:bg-gray-50"
                >
                  EXPORTADO
                </Button>

                <div v-if="expense.status == 4" class="flex justify-center gap-10 pt-4">
                  <button
                    v-on:click="$emit('close')"
                    type="button"
                    class="text-red-700 cursor-not-allowed hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Cancelar
                  </button>
                  <button
                    v-on:click="$emit('close')"
                    type="button"
                    class="text-green-700 cursor-not-allowed hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                  >
                    Guardar
                  </button>
                </div>
                <div v-else class="flex justify-center gap-10 pt-4">
                  <button
                    v-on:click="$emit('close')"
                    type="button"
                    class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Cancelar
                  </button>
                  <button
                    v-on:click="updateExpense"
                    type="button"
                    class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                  >
                    Guardar
                  </button>
                </div>
                <Alert v-if="expense.status == 4" class="bg-yellow-100">
                  <AlertDescription> No se puede editar un gasto <br />que ya ha sido exportado.</AlertDescription>
                </Alert>
              </div>

              <Suspense>
                <template #default>
                  <AsyncImage :receiptImageKey="expense.receipt_image_key" />
                </template>
                <template #fallback>
                  <!-- Indicador de carga mientras se carga la imagen -->
                  <div class="flex justify-center items-center h-32 w-32"></div>
                </template>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import DatePickerDate from './DatePickerDate.vue'
import Button from './ui/button/Button.vue'
import AsyncImage from './AsyncImage.vue'
import moment from 'moment'
import axios from '@/axios'
import Alert from '@/components/ui/alert/Alert.vue'
export default {
  name: 'Share',
  data() {
    return {
      changedFields: {
        shopName: '',
        // cuit: '',
        total: '',
        category: '',
        expenseDate: '',
        currency: '',
      },
      imageUrl: '',
      loading: true,
      shopName: '',
      // cuit: '',
      total: '',
      currency: 'ARS $',
      category: '',
      expenseDate: '',
      status: 0,
      id: '',
    }
  },
  mounted() {
    this.shopName = this.expense.shop_name
    this.changedFields.shopName = this.expense.shop_name
    // this.cuit = this.expense.cuit
    // this.changedFields.cuit = this.expense.cuit
    this.total = this.expense.amount
    this.changedFields.total = this.expense.amount
    this.category = this.expense.category
    this.changedFields.category = this.expense.category
    this.expenseDate = this.expense.date
    this.changedFields.expenseDate = this.expense.date
    this.changedFields.currency = this.currency
    this.status = this.expense.status
    this.id = this.expense.id
  },
  methods: {
    changeStatus() {
      if (this.status == 1) this.status = 0
      else this.status = 1
    },
    async updateExpense() {
      // make a request if the fields are different from the changedFields
      if (
        this.shopName == this.changedFields.shopName &&
        // this.cuit == this.changedFields.cuit &&
        this.total == this.changedFields.total &&
        this.category == this.changedFields.category &&
        this.expenseDate == this.changedFields.expenseDate &&
        this.currency == this.changedFields.currency &&
        this.status == this.expense.status
      ) {
        this.$emit('close')
        return
      }
      // only send the fields that have changed
      let data = {}
      if (this.shopName != this.changedFields.shopName) data.shop_name = this.shopName
      // if (this.cuit != this.changedFields.cuit) data.cuit = this.cuit
      // total is a string, should be a float
      if (this.total != this.changedFields.total) data.amount = parseFloat(this.total)
      if (this.category != this.changedFields.category) data.category = this.category
      if (this.expenseDate != this.changedFields.expenseDate) data.date = this.changedFields.expenseDate
      if (this.currency != this.changedFields.currency) data.currency = this.currency
      // if status = 0 send Pending, if status = 1 send Approved
      if (this.status != this.expense.status) data.status = this.status == 0 ? 'Pending' : 'Approved'
      let response = await axios.patch(`/payments/${this.id}`, data)
      // if status was changed, modify data from Pending to 0 and Approved to 1
      if (data.status) data.status = data.status == 'Pending' ? 0 : 1
      // update the expense that we receive via props with the new values
      if (response.status == 200) Object.assign(this.expense, data)
      this.$emit('updateExpense', this.expense)
      this.$emit('close')
    },
    validateNumberInput(e) {
      this.total = this.total.replace(/[^0-9]/g, '')
    },
    handleDateSelected(selectedDate) {
      this.changedFields.expenseDate = selectedDate
    },
    selectCategory(e) {
      this.category = e
    },
    selectCurrency(e) {
      this.currency = e
    },
  },
  watch: {
    $route() {
      this.originalRoute = this.$route.path
      this.activeRoute = this.$route.path.split('/').slice(-1)[0]
    },
  },
  components: {
    AsyncImage,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Alert,
    Button,
    DatePickerDate,
  },
  props: {
    expense: Object,
    categories: Array,
  },
}
</script>
