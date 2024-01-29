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
            ][Math.floor(team.id.replace(/[^0-9]/g, '') % 10)],
          }"
          className="flex rounded-full w-8 h-8 text-white text-xs items-center justify-center"
        >
          <p>{{ team.name[0] }}{{ team.name[1] }}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <p class="text-[#1C2E3D] font-medium text-lg pl-4">{{ team.name.substring(0, 23) }}</p>
          </div>
          <!-- <p class="text-[#8D8B96] font-medium text-lg pl-4">{{ team.name }}</p> -->
        </div>
      </div>
      <div className="flex w-full text-right items-center gap-2 justify-end">
        <svg v-if="team.reviewer.id" class="w-4 h-4 text-[#ED7B65] fill-current" viewBox="0.5586 -0.0999 6.347 9.754">
          <path
            d="M 5.9276 2.1953 C 5.9276 3.4077 4.9447 4.3906 3.7323 4.3906 C 2.5199 4.3906 1.5371 3.4077 1.5371 2.1953 C 1.5371 0.983 2.5199 0.0001 3.7323 0.0001 C 4.9447 0.0001 5.9276 0.983 5.9276 2.1953 Z Z M 6.8052 8.3419 C 6.8052 8.7728 6.7176 9.0007 6.6298 9.1269 C 6.547 9.246 6.4156 9.3445 6.1761 9.4186 C 5.9245 9.4964 5.5935 9.5345 5.164 9.5478 C 4.8752 9.5568 4.575 9.5545 4.2473 9.5519 C 4.0831 9.5506 3.9119 9.5492 3.7319 9.5492 C 3.5518 9.5492 3.3807 9.5506 3.2164 9.5519 C 2.8888 9.5545 2.5886 9.5568 2.2998 9.5478 C 1.8702 9.5345 1.5392 9.4964 1.2876 9.4186 C 1.0482 9.3445 0.9168 9.246 0.8339 9.1269 C 0.7462 9.0007 0.6586 8.7728 0.6586 8.3419 C 0.6586 6.6445 2.0345 5.2686 3.7319 5.2686 C 5.4292 5.2686 6.8052 6.6445 6.8052 8.3419 Z"
          />
        </svg>
        <svg v-else class="w-4 h-4 text-[#8A8891] fill-current" viewBox="0.5586 -0.0999 6.347 9.754">
          <path
            d="M 5.9276 2.1953 C 5.9276 3.4077 4.9447 4.3906 3.7323 4.3906 C 2.5199 4.3906 1.5371 3.4077 1.5371 2.1953 C 1.5371 0.983 2.5199 0.0001 3.7323 0.0001 C 4.9447 0.0001 5.9276 0.983 5.9276 2.1953 Z Z M 6.8052 8.3419 C 6.8052 8.7728 6.7176 9.0007 6.6298 9.1269 C 6.547 9.246 6.4156 9.3445 6.1761 9.4186 C 5.9245 9.4964 5.5935 9.5345 5.164 9.5478 C 4.8752 9.5568 4.575 9.5545 4.2473 9.5519 C 4.0831 9.5506 3.9119 9.5492 3.7319 9.5492 C 3.5518 9.5492 3.3807 9.5506 3.2164 9.5519 C 2.8888 9.5545 2.5886 9.5568 2.2998 9.5478 C 1.8702 9.5345 1.5392 9.4964 1.2876 9.4186 C 1.0482 9.3445 0.9168 9.246 0.8339 9.1269 C 0.7462 9.0007 0.6586 8.7728 0.6586 8.3419 C 0.6586 6.6445 2.0345 5.2686 3.7319 5.2686 C 5.4292 5.2686 6.8052 6.6445 6.8052 8.3419 Z"
          />
        </svg>
        <p v-if="team.reviewer.id">{{ team.reviewer.name }} {{ team.reviewer.surname }}</p>
        <p v-else className="text-[#8A8891]">Sin Revisor</p>
      </div>
    </div>
    <div class="flex w-full h-4 mb-4 rounded-full my-10 gap-1 items-center justify-between">
      <div class="flex gap-0.5" v-if="team.users">
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
            ][Math.floor(user.email.charCodeAt(2) % 10)],
          }"
          v-for="user in team.users.slice(0, 3)"
          class="flex h-8 w-8 rounded-full justify-center items-center text-white"
        >
          <p v-if="user.name && user.surname">{{ user.name[0].toUpperCase() }}{{ user.surname[0].toUpperCase() }}</p>
        </div>
        <div v-if="team.users.length > 3" class="flex h-8 w-8 rounded-full bg-[#8A8891] justify-center items-center text-white">
          <p>+{{ team.users.length - 3 }}</p>
        </div>
      </div>
      <div v-else className="text-[#8D8B96] font-xs text-lg ">Sin Miembros</div>
      <div className="flex flex-col justify-end">
        <div className="flex items-center gap-2">
          <p className="text-[#8A8891]">Limite Mensual</p>
        </div>
        <p className="text-right">${{ team.annual_budget || 0 }},00</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ team: Object })
</script>
