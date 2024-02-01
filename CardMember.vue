<template>
  <Navbar></Navbar>
  <div className="bg-[#F4F4F4]">
    <Sidebar currentRouteName="teams"></Sidebar>
    <div class="p-4 sm:ml-64 flex justify-evenly">
      <div class="flex flex-col">
        <a class="text-2xl mb-4 font-bold">Tarjeta Virtual</a>
        <img class="rounded-2xl" src="@/assets/blue_card.png" />
        <div class="flex justify-between px-2">
          <button v-on:click="showData = !showData" className="flex items-center gap-2 text-white bg-[#1C2E3D] border-2 px-3 py-1 mt-10 rounded-full">
            <p v-if="!showData" class="p-1 px-2">Mostrar Tarjeta</p>
            <p v-else class="p-1 px-2">Ocultar Tarjeta</p>
          </button>
          <button className="flex items-center gap-2 border-[#1C2E3D] border-2 px-3 py-1 mt-10 rounded-full">
            <p class="p-1 px-2">Pausar Tarjeta</p>
          </button>
        </div>
        <div v-if="showData" class="grid grid-cols-2 grid-rows-1 mt-7">
          <div class="text-[#8D8B96]">Nro. de Tarjeta</div>
          <div class="text-right font-bold">4030 4030 4030 1234</div>
          <div class="text-[#8D8B96]">Vencimiento</div>
          <div class="text-right font-bold">12/25</div>
          <div class="text-[#8D8B96]">CVV</div>
          <div class="text-right font-bold">036</div>
        </div>
      </div>
      <div class="flex flex-col">
        <a class="text-2xl mb-4 font-bold">Tarjeta Fisica</a>
        <img class="rounded-2xl" src="@/assets/green_card.png" />
        <div class="flex justify-center px-2">
          <button className="flex items-center gap-2 border-[#1C2E3D] border-2 px-3 py-1 mt-10 rounded-full">
            <p class="p-1 px-2">Pausar Tarjeta</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  data() {
    return {
      showData: false,
    }
  },
  components: {
    Sidebar,
    Navbar,
  },
}
</script>
