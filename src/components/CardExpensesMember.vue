<template>
  <div className="flex flex-col w-full">
    <div className="items-center w-full grid grid-cols-2">
      <div className="flex items-center">
        <div className="flex rounded-full w-8 h-8 bg-violet-700 text-white text-xs items-center justify-center">
          <p>{{ expense.realizado_por[0] }}{{ expense.realizado_por[1].toUpperCase() }}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <p class="text-[#1C2E3D] font-medium text-lg pl-4">{{ expense.nombre_comercio ? expense.nombre_comercio : 'No Detectado' }}</p>
          </div>
          <p class="text-[#8D8B96] font-medium text-lg pl-4">{{ expense.realizado_por }}</p>
        </div>
      </div>
      <div className="flex w-full justify-end gap-4">
        <div
          v-if="expense.tipo_pago.con_tarjeta && expense.tipo_pago.tipo == 'virtual'"
          className="border-red-200 border rounded-sm w-8 h-4 p-2.5 px-5 text-xs flex items-center justify-center"
        >
          <p>{{ expense.tipo_pago.ultimos_4_digitos }}</p>
        </div>

        <div
          v-if="expense.tipo_pago.con_tarjeta && expense.tipo_pago.tipo == 'fisica'"
          className="border-[#E0EAE9] border bg-[#E0EAE9] rounded-sm w-8 h-4 p-2.5 px-5 text-xs flex items-center justify-center"
        >
          <p>{{ expense.tipo_pago.ultimos_4_digitos }}</p>
        </div>

        <div v-if="!expense.tipo_pago.con_tarjeta" className="border-[#1C2E3D] border rounded-md h-4 p-2.5 px-2 text-xs flex items-center justify-center">REEMBOLSO</div>

        <div
          :class="
            expense.categoria.estado.toUpperCase() === 'APROBADO'
              ? 'bg-[#E6FF9F] border-[#E6FF9F] border  rounded-full h-4 p-2.5 px-2 text-xs flex items-center justify-center'
              : expense.categoria.estado.toUpperCase() === 'CAMBIOS A REALIZAR'
              ? 'bg-[#FDF8CF] border-[#FDF8CF] border  rounded-full h-4 p-2.5 px-2 text-xs flex items-center justify-center'
              : expense.categoria.estado.toUpperCase() === 'RECHAZADO'
              ? 'bg-[#FDCFCF] border-[#FDCFCF] border  rounded-full h-4 p-2.5 px-2 text-xs flex items-center justify-center'
              : expense.categoria.estado.toUpperCase() === 'SIN RECIBO'
              ? 'bg-[#E7E6E9] border-[#E7E6E9] border  rounded-full h-4 p-2.5 px-2 text-xs flex items-center justify-center'
              : 'bg-[#E7E6E9] border-[#E7E6E9] border  rounded-full h-4 p-2.5 px-2 text-xs flex items-center justify-center'
          "
        >
          <p>{{ expense.categoria.estado.toUpperCase() }}</p>
        </div>
      </div>
    </div>

    <div className="flex justify-between mt-10">
      <div className="flex gap-6">
        <div className="flex gap-2 items-center">
          <font-awesome-icon class="text-[#CE6F00]" :icon="expense.categoria.category_icon" />
          <p>{{ expense.categoria.categoria_gasto }}</p>
        </div>
        <div className="flex gap-2 items-center">
          <font-awesome-icon class="text-[#CE6F00]" :icon="expense.categoria.tag_icon" />
          <p>{{ expense.categoria.tag }}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <img className="w-4 h-4" src="@/assets/comprobante.svg" alt="comprobante" />
        <p className="text-right">$ {{ expense.monto * 100 }},00</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import exp from 'constants'

defineProps({ expense: Object })
</script>
