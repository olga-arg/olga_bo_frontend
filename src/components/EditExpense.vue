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
                <input
                  v-on:keypress.enter.prevent="sendNameFilter"
                  v-model="expenseDate"
                  class="block w-44 h-4 appearance-none rounded-md bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
                  placeholder="Fecha"
                  aria-label="Search components"
                  role="combobox"
                  type="date"
                  aria-expanded="false"
                  aria-autocomplete="list"
                  style="caret-color: rgb(107, 114, 128)"
                  tabindex="0"
                  data-form-type=""
                  required
                />
                <div class="flex gap-3">
                  <input
                    v-on:keypress.enter.prevent="sendNameFilter"
                    v-model="total"
                    class="block w-44 h-4 appearance-none rounded-md bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
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
                  <input
                    v-on:keypress.enter.prevent="sendNameFilter"
                    v-model="currency"
                    class="block w-32 h-4 appearance-none rounded-md bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
                    placeholder="ARS AR$"
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
                <input
                  v-on:keypress.enter.prevent="sendNameFilter"
                  v-model="category"
                  class="block w-full h-14 appearance-none rounded-md bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
                  placeholder="Categoria"
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
                  <div class="flex justify-center items-center h-32 w-32">
                    <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                  </div>
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
import { Storage } from 'aws-amplify'
import AsyncImage from './AsyncImage.vue'
export default {
  name: 'Share',
  data() {
    return {
      imageUrl: '',
      loading: true,
      shopName: '',
      total: '',
      currency: 'ARS AR$',
      category: '',
      expenseDate: '',
    }
  },
  mounted() {
    this.shopName = this.expense.shop_name
    this.total = this.expense.amount
    this.category = this.expense.category
    this.expenseDate = this.expense.created.split('T')[0]
  },
  methods: {},
  watch: {
    $route() {
      this.originalRoute = this.$route.path
      this.activeRoute = this.$route.path.split('/').slice(-1)[0]
    },
  },
  components: {
    AsyncImage,
  },
  props: {
    expense: Object,
  },
}
</script>
