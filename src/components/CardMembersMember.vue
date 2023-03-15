<template>
  <div className="flex flex-col w-full">
    <div className="items-center w-full grid grid-cols-2">
      <div className="flex items-center">
        <div className="flex rounded-full w-8 h-8 bg-violet-700 text-white text-xs items-center justify-center">
          <p>{{ member.name[0] }}{{ member.name.split(' ')[1][0] }}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <p class="text-[#1C2E3D] font-medium text-lg pl-4">{{ member.name.substring(0, 23) }}</p>
            <img class="pl-2 w-6 h-6" src="@/assets/email.svg" />
          </div>
          <p class="text-[#8D8B96] font-medium text-lg pl-4">{{ member.company.bs.split(' ').slice(-1)[0] }}</p>
        </div>
      </div>
      <div className="flex w-full gap-2 justify-end ">
        <div className="border-red-200 border rounded-sm w-8 h-4 p-2.5 px-5 text-xs flex items-center justify-center">
          <p>4231</p>
        </div>

        <div className="border-[#E0EAE9] border bg-[#E0EAE9] rounded-sm w-8 h-4 p-2.5 px-5 text-xs flex items-center justify-center">
          <p>5342</p>
        </div>

        <div v-if="Math.random() < 0.5 ? true : false" className="border-[#F8E6E8] border bg-[#F8E6E8] rounded-full h-4 p-2.5 px-2 text-xs flex items-center justify-center">
          <p>ADMINISTRADOR</p>
        </div>

        <p>80%</p>
      </div>
    </div>

    <div class="w-full h-4 mb-4 bg-[#D9D9D9] rounded-full my-5">
      <div class="h-4 bg-[#62948F] rounded-full" style="width: 80%"></div>
    </div>

    <div className="flex justify-between">
      <div className="flex gap-6">
        <div className="flex flex-col ">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#62948F] rounded-full"></div>
            <p className="text-[#8A8891]">Utilizado</p>
          </div>
          <p>$ 80.000,00</p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#D9D9D9] rounded-full"></div>
            <p className="text-[#8A8891]">Disponible</p>
          </div>
          <p>$ 20.000,00</p>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col">
          <p className="text-[#8A8891]">Limite de Compra</p>
          <p className="text-right">$ 1.000,00</p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-[#8A8891]">Limite Mensual</p>
          </div>
          <p className="text-right">$ 100.000,00</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ member: Object })
</script>
