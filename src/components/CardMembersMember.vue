<template>
  <div className="flex flex-col w-full">
    <div className="items-center w-full grid grid-cols-2">
      <div className="flex items-center">
        <div className="flex rounded-full w-8 h-8 bg-violet-700 text-white text-xs items-center justify-center">
          <p>{{ member.name[0].toUpperCase() }}{{ member.surname[0].toUpperCase() }}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <p class="text-[#1C2E3D] font-medium text-lg pl-4">{{ member.name }} {{ member.surname }}</p>
            <button v-on:click="copyEmailToClipboard" class="flex items-center">
              <img class="pl-2 w-6 h-6" src="@/assets/email.svg" />
              <p v-if="copyToClipboard" class="mb-10 ml-[-12px] absolute text-[#62948F] font-medium text-xs pl-1">Copiado</p>
            </button>
          </div>
          <p v-if="member.teams" class="text-[#8D8B96] font-medium text-lg pl-4">{{ member.teams[0].team_name }}</p>
          <p v-else class="text-[#8D8B96] font-medium text-lg pl-4">Sin Equipo</p>
        </div>
      </div>
      <div className="flex w-full gap-2 justify-end flex-wrap">
        <div className="border-red-200 border rounded-sm w-8 h-4 p-2.5 px-5 text-xs flex items-center justify-center">
          <p>4231</p>
        </div>

        <div className="border-[#E0EAE9] border bg-[#E0EAE9] rounded-sm w-8 h-4 p-2.5 px-5 text-xs flex items-center justify-center">
          <p>5342</p>
        </div>

        <div v-if="member.isAdmin" className="border-[#F8E6E8] border bg-[#F8E6E8] rounded-full h-4 p-2.5 px-2 text-xs flex items-center justify-center">
          <p>ADMINISTRADOR</p>
        </div>

        <p>{{ (member.monthly_spending * 100) / (member.monthly_limit || 1) }}%</p>
      </div>
    </div>

    <div class="w-full h-4 mb-4 bg-[#D9D9D9] rounded-full my-5">
      <div class="h-4 bg-[#62948F] rounded-full" :style="`width: ${(member.monthly_spending * 100) / (member.monthly_limit || 1)}%`"></div>
    </div>

    <div className="flex justify-between">
      <div className="flex gap-6">
        <div className="flex flex-col ">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#62948F] rounded-full"></div>
            <p className="text-[#8A8891]">Utilizado</p>
          </div>
          <p>$ {{ member.monthly_spending }}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#D9D9D9] rounded-full"></div>
            <p className="text-[#8A8891]">Disponible</p>
          </div>
          <p>$ {{ member.monthly_limit - member.monthly_spending }}</p>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col">
          <p className="text-[#8A8891]">Limite de Compra</p>
          <p className="text-right">$ {{ member.purchase_limit }}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-[#8A8891]">Limite Mensual</p>
          </div>
          <p className="text-right">$ {{ member.monthly_limit }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    member: Object,
  },
  data() {
    return {
      copyToClipboard: false,
    }
  },
  methods: {
    copyEmailToClipboard() {
      navigator.clipboard.writeText(this.member.email)
      this.copyToClipboard = true
      setTimeout(() => {
        this.copyToClipboard = false
      }, 1000)
    },
  },
}
</script>
