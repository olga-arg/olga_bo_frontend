<template>
  <div className="flex flex-col w-full">
    <div className="items-center w-full grid grid-cols-2">
      <div className="flex items-center">
        <div className="flex flex-col">
          <div className="flex ">
            <p class="text-[#1C2E3D] font-medium text-lg">{{ expense.name }}</p>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-2 justify-end flex-wrap">
        <p>{{ (expense.monthly_spending * 100) / (expense.monthly_limit || 1) }}%</p>
      </div>
    </div>

    <div class="w-full h-4 mb-4 bg-[#D9D9D9] rounded-full my-5">
      <div class="h-4 bg-[#62948F] rounded-full" :style="`width: ${(expense.monthly_spending * 100) / (expense.monthly_limit || 1)}%`"></div>
    </div>

    <div className="flex justify-between">
      <div className="flex gap-6">
        <div className="flex flex-col ">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#62948F] rounded-full"></div>
            <p className="text-[#8A8891]">Utilizado</p>
          </div>
          <p>$ {{ expense.monthly_spending || 0 }}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#D9D9D9] rounded-full"></div>
            <p className="text-[#8A8891]">Disponible</p>
          </div>
          <p>$ {{ expense.annual_budget - expense.monthly_spending || 0 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import exp from 'constants'

defineProps({ expense: Object })
</script>
