<template>
  <div className="flex flex-col w-full">
    <div className="items-center w-full grid grid-cols-2">
      <div className="flex items-center">
        <div
          :style="{
            backgroundColor: [
              '#F44336', // Rojo
              '#E91E63', // Rosa
              '#9C27B0', // Púrpura
              '#673AB7', // Morado
              '#3F51B5', // Azul
              '#2196F3', // Azul claro
              '#00BCD4', // Cian
              '#009688', // Verde
              '#4CAF50', // Verde claro
              '#FF5722', // Naranja
              '#FF9800', // Naranja claro
              '#FFC107', // Ámbar
              '#FFEB3B', // Amarillo
              '#CDDC39', // Lima
              '#8BC34A', // Verde lima
              '#4CAF50', // Verde
              '#009688', // Verde azulado
              '#00BCD4', // Cian claro
              '#03A9F4', // Azul claro
              '#2196F3', // Azul
            ][Math.floor(Math.random() * 10)],
          }"
          className="flex rounded-full w-8 h-8 text-white text-xs items-center justify-center"
        >
          <p>{{ member.name[0].toUpperCase() }}{{ member.surname[0].toUpperCase() }}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex ">
            <p class="text-[#1C2E3D] font-medium text-lg pl-4">
              {{ member.name.split(' ').length > 1 ? `${member.name.split(' ')[0]} ${member.name.split(' ')[1][0]}.` : member.name }} {{ member.surname }}
            </p>
            <button v-if="member.status != 0" v-on:click="copyEmailToClipboard" class="flex items-center">
              <img class="ml-2 w-4 h-4" src="@/assets/email.svg" />
              <p v-if="copyToClipboard" class="mb-10 ml-[-12px] absolute text-[#62948F] font-medium text-xs pl-1">Copiado</p>
            </button>
            <button v-else v-on:click="copyEmailToClipboard" class="flex items-center">
              <img class="ml-2 w-4 h-4" src="@/assets/emailNotConfirmed.svg" />
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
          <p>ADMIN</p>
        </div>

        <p v-if="(member.monthly_spending * 100) / (member.monthly_limit || 1) <= 100">{{ Math.ceil((member.monthly_spending * 100) / (member.monthly_limit || 1)) }}%</p>
        <p v-else class="font-bold text-[#DE848B]">{{ Math.ceil((member.monthly_spending * 100) / (member.monthly_limit || 1)) }}%</p>
      </div>
    </div>

    <div v-if="(member.monthly_spending * 100) / (member.monthly_limit || 1) <= 100" class="w-full h-4 mb-4 bg-[#D9D9D9] rounded-full my-5">
      <div class="h-4 bg-[#62948F] rounded-full" :style="`width: ${(member.monthly_spending * 100) / (member.monthly_limit || 1)}%`"></div>
    </div>
    <div v-else class="w-full h-4 mb-4 bg-[#D9D9D9] rounded-full my-5">
      <div class="h-4 bg-[#DE848B] rounded-full" :style="`width: 100%`"></div>
    </div>

    <div className="flex justify-between">
      <div className="flex gap-6">
        <div className="flex flex-col ">
          <div className="flex items-center gap-2">
            <div v-if="(member.monthly_spending * 100) / (member.monthly_limit || 1) <= 100" className="w-3 h-3 bg-[#62948F] rounded-full"></div>
            <div v-else className="w-3 h-3 bg-[#DE848B] rounded-full"></div>
            <p className="text-[#8A8891]">Utilizado</p>
          </div>
          <p>$ {{ member.monthly_spending }}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div v-if="(member.monthly_spending * 100) / (member.monthly_limit || 1) <= 100" className="w-3 h-3 bg-[#D9D9D9] rounded-full"></div>
            <img v-else class="w-3 h-3 rounded-full" src="@/assets/comprometido.png" />
            <p v-if="(member.monthly_spending * 100) / (member.monthly_limit || 1) <= 100" className="text-[#8A8891]">Disponible</p>
            <p v-else className="text-[#8A8891]">Excedido</p>
          </div>
          <p v-if="(member.monthly_spending * 100) / (member.monthly_limit || 1) <= 100">$ {{ member.monthly_limit - member.monthly_spending }}</p>
          <p v-else class="text-[#DE848B]">$ {{ member.monthly_limit - member.monthly_spending * -1 }} (excedido)</p>
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
