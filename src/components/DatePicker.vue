<script setup lang="ts">
import { addDays, format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { es } from 'date-fns/locale'

import { ref, watch, defineProps, defineEmits } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
const props = defineProps({
  resetFilters: Boolean,
})

watch(
  () => props.resetFilters,
  () => {
    date.value.start = null
    date.value.end = null
  }
)

const date = ref({
  start: null,
  end: null,
})
const esLocale = es
</script>
<template>
  <div :class="cn('grid gap-2', $attrs.class ?? '')">
    <Popover>
      <PopoverTrigger as-child>
        <Button id="date" :variant="'outline'" :class="cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')">
          <CalendarIcon class="mr-2 h-4 w-4" />
          <span v-if="!date.start || !date.end" class="text-sm text-muted-foreground"> Rango de fechas </span>
          <span v-else class="text-sm">
            {{ `${format(date.start, 'LLL dd, y', { locale: esLocale })} - ${format(date.end, 'LLL dd, y', { locale: esLocale })}` }}
          </span>
          {{ $emit('date-selected', date) }}
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0" align="start">
        <Calendar v-model.range="date" :columns="2" />
      </PopoverContent>
    </Popover>
  </div>
</template>
