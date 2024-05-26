<template>
  <button
    data-drawer-target="logo-sidebar"
    data-drawer-toggle="logo-sidebar"
    aria-controls="logo-sidebar"
    type="button"
    class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  >
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>

  <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-[#1C2E3D] flex flex-col">
      <a href="/" class="flex items-center pl-2.5 self-center my-5">
        <img src="@/assets/rendilo_i.png" class="h-4 mr-3 sm:h-10" alt="Olga Logo" />
      </a>
      <div class="flex flex-col justify-between h-full">
        <ul class="space-y-2 mt-10 mx-4">
          <li>
            <router-link to="/expenses/members" class="flex items-center p-2 px-4 text-base font-normal text-[#8D8B96] rounded-lg hover:bg-[#091825]">
              <img v-if="activeRoute == 'expenses'" src="@/assets/expenses-selected.svg" alt="expenses icon" />
              <img v-else src="@/assets/expenses-unselected.svg" alt="expenses icon" />
              <span :class="activeRoute === 'expenses' ? 'text-[#DE848B]' : 'text-[#8D8B96]'" class="flex-1 ml-3 whitespace-nowrap">Gastos</span>
              <!-- <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-white bg-[#62948F] rounded-full">0</span> -->
            </router-link>
          </li>
          <li>
            <router-link to="/members/members" class="flex items-center p-2 px-4 text-base font-normal text-gray-900 rounded-lg hover:bg-[#091825]">
              <img v-if="activeRoute == 'members'" src="@/assets/members-selected.svg" alt="members icon" />
              <img v-else src="@/assets/members-unselected.svg" alt="members icon" />
              <span :class="activeRoute === 'members' ? 'text-[#DE848B]' : 'text-[#8D8B96]'" class="flex-1 ml-3 whitespace-nowrap">Miembros</span>
              <!-- <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">2</span> -->
            </router-link>
          </li>
        </ul>
        <ul class="space-y-2 mt-10 mx-4">
          <li>
            <router-link to="/logout" class="flex items-center p-2 px-4 text-base font-normal text-[#8D8B96] rounded-lg hover:bg-[#091825]">
              <img src="@/assets/logout.svg" alt="logout" />
              <span class="ml-3">Cerrar Sesión</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      activeRoute: this.$route.path.split('/')[1] || '/',
      users: 0,
    }
  },
  watch: {
    $route() {
      this.activeRoute = this.$route.path.split('/')[1] || '/'
    },
  },
}
</script>
