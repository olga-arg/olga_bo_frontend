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
                <div class="flex gap-1 items-center text-gray-400">
                  <font-awesome-icon icon="credit-card" class="" />
                  <div className="text-sm  ">Card</div>
                </div>
                <button class="text-gray-600 font-bold" v-on:click="$emit('close')">X</button>
              </div>
            </div>
            <div class="flex gap-5">
              <div class="flex flex-col gap-3">
                <input
                  v-on:keypress.enter.prevent="sendNameFilter"
                  v-model="shopName"
                  class="block w-full h-14 appearance-none rounded-md bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
                  placeholder="Negocio"
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
                <vue-date-picker v-model="expenseDate" auto-apply :format="format" />

                <div class="flex">
                  <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton
                        class="flex-shrink-0 z-10 inline-flex items-center h-4 py-4 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300"
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
                      <MenuItems class="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                    v-on:keypress.enter.prevent="sendNameFilter"
                    v-model="total"
                    class="block w-44 h-4 py-4 pl-4 pr-12 z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Total"
                    aria-label="Search components"
                    role="combobox"
                    type="number"
                    aria-expanded="false"
                    aria-autocomplete="list"
                    style="caret-color: rgb(107, 114, 128)"
                    tabindex="0"
                    data-form-type=""
                    required
                  />
                </div>
                <Menu as="div" class="relative inline-block text-left">
                  <div>
                    <MenuButton
                      class="inline-flex w-full h-14 py-4 pl-4 pr-12 text-base rounded-md bg-white font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
import AsyncImage from './AsyncImage.vue'

export default {
  name: 'Share',
  data() {
    return {
      imageUrl: '',
      loading: true,
      shopName: '',
      total: '',
      currency: 'ARS $',
      category: '',
      expenseDate: '',
      categories: [
        'Categoria',
        'Comidas y Bebidas',
        'Comisiones y Cargos',
        'Cuentas y Servicios',
        'Donaciones',
        'Educación',
        'Electrónica',
        'Entretenimiento',
        'Hogar',
        'Impuestos',
        'Indumentaria',
        'Inversiones',
        'Mascotas',
        'Otros',
        'Préstamos y financiación',
        'Salud y cuidado personal',
        'Servicios profesionales',
        'Shopping',
        'Supermercado',
        'Suscripciones',
        'Transporte',
        'Viajes',
      ],
    }
  },
  mounted() {
    this.shopName = this.expense.shop_name
    this.total = this.expense.amount
    this.category = this.expense.category
    this.expenseDate = this.expense.created.split('T')[0]
  },
  methods: {
    markAsChanged(field) {
      this.changedFields[field] = true
    },
    format(date) {
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()

      const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
      return `${day} ${monthNames[month]} ${year}`
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
  },
  props: {
    expense: Object,
  },
}
</script>
