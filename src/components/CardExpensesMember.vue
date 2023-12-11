<template>
  <div className="flex w-full">
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
      className="flex rounded-full w-10 h-10 text-white text-md items-center justify-center"
    >
      <p>{{ expense.shop_name[0].toUpperCase() + expense.shop_name[1].toUpperCase() }}</p>
    </div>
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <div className="flex items-center">
          <p class="text-[#1C2E3D] font-medium text-lg pl-4">{{ expense.shop_name ? expense.shop_name[0] + expense.shop_name.slice(1).toLowerCase() : 'No Detectado' }}</p>
        </div>
        <div className="flex justify-end gap-4">
          <div v-if="expense.tipo_pago == 'virtual'" className="border-red-200 border rounded-sm w-8 h-4 p-2.5 px-5 text-xs flex items-center justify-center">
            <p>{{ expense.tipo_pago.ultimos_4_digitos }}</p>
          </div>

          <div v-if="expense" className="border-[#E0EAE9] border bg-[#E0EAE9] rounded-sm w-8 h-4 p-2.5 px-5 text-xs flex items-center justify-center">
            <p>{{ '4060' }}</p>
          </div>

          <div v-if="expense.tipo_pago" className="border-[#1C2E3D] border rounded-md h-4 p-2.5 px-2 text-xs flex items-center justify-center">POCKET</div>

          <div v-if="expense.status == 1" className="border-[#92FD70] border h-4 bg-[#92FD70] rounded-full p-2.5 text-xs flex items-center justify-center">
            <p>APROBADO</p>
          </div>
          <div v-else className="border-[#E7E6E9] border h-4 bg-[#E7E6E9] rounded-full p-2.5 text-xs flex items-center justify-center">
            <p>PENDIENTE</p>
          </div>
        </div>
      </div>
      <div class="flex justify-between pl-4 gap-1">
        <div class="flex items-center">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12 6C10.34 6 9 7.34 9 9C9 10.66 10.34 12 12 12C13.66 12 15 10.66 15 9C15 7.34 13.66 6 12 6ZM12 14C9.79 14 8 15.79 8 18C8 18.55 8.45 19 9 19H15C15.55 19 16 18.55 16 18C16 15.79 14.21 14 12 14Z"
              fill="#8D8B96"
            />
          </svg>
          <p v-if="!expense.receipt" class="text-[#8D8B96] text-lg pl-1">
            {{
              ['Maria Perez', 'Jorge Miro', 'Pedro Farias', 'Julian Bayala', 'Pilar Fortina'][
                Math.floor(Math.random() * ['Maria Perez', 'Jorge Miro', 'Pedro Farias', 'Julian Bayala', 'Pilar Fortina'].length)
              ]
            }}
          </p>
          <p v-else class="text-[#8D8B96] text-lg pl-1">Valentin Vila</p>
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 4H5C3.9 4 3 4.9 3 6V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V6C21 4.9 20.1 4 19 4ZM19 18H5V8H19V18ZM19 6H5V6.01L5 6Z" fill="#8D8B96" />
          </svg>
          <p class="text-[#8D8B96] text-lg pl-1">{{ new Date(expense.created).toDateString('es-AR', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) }}</p>
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM13 11H11V7H13V11ZM13 17H11V13H13V17Z"
              fill="#8D8B96"
            />
          </svg>
          <p class="text-[#8D8B96] text-lg pl-1">1 hour ago</p>
        </div>
      </div>
      <div className="flex  mt-10">
        <div className="flex justify-between w-full pl-4">
          <div class="flex gap-8">
            <div className="flex items-center gap-2 border-blue-400 border-2 px-3 py-1 rounded-full">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM13 11H11V7H13V11ZM13 17H11V13H13V17Z"
                  fill="#8D8B96"
                />
              </svg>
              <p>{{ expense.category.charAt(0).toUpperCase() + expense.category.slice(1) }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <a @click="openImage(expense.receipt_image_key)"><img className="w-4 h-4" src="@/assets/comprobante.svg" alt="comprobante" /></a>
            <p className="text-right">$ {{ expense.amount || 0 }},00</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import exp from 'constants'
import { Storage } from 'aws-amplify'
defineProps({ expense: Object })
const openImage = async (key) => {
  try {
    key = key.replace('public/', '')
    const signedURL = await Storage.get(key, { expires: 300 }) // 300 segundos de expiración
    window.open(signedURL, '_blank') // Abre la imagen en una nueva ventana o pestaña
  } catch (error) {
    console.error('Error al obtener la URL firmada: ', error)
    // Handle the error appropriately
  }
}
</script>
