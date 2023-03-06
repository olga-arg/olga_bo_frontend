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
        <img src="@/assets/logo.svg" class="h-6 mr-3 sm:h-14" alt="Olga Logo" />
      </a>
      <ul class="space-y-2 mt-10 mx-4">
        <li>
          <a href="#" class="flex items-center p-2 px-4 text-base font-normal text-[#8D8B96] rounded-lg hover:bg-[#091825]">
            <img src="@/assets/card.svg" alt="card icon" />
            <span class="ml-3">Tarjetas</span>
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center p-2 px-4 text-base font-normal text-[#8D8B96] rounded-lg hover:bg-[#091825]">
            <img src="@/assets/expenses.svg" alt="expenses icon" />
            <span class="flex-1 ml-3 whitespace-nowrap">Gastos</span>
            <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-white bg-[#62948F] rounded-full">Pro</span>
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center p-2 px-4 text-base font-normal text-gray-900 rounded-lg">
            <img src="@/assets/members.svg" alt="members icon" />
            <span class="flex-1 ml-3 whitespace-nowrap text-[#DE848B]">Miembros</span>
            <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">8</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
}
</script>
