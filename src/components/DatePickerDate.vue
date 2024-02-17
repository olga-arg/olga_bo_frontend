<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { es } from 'date-fns/locale'

import { ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const props = defineProps({
  expenseDate: Date,
})
const date = ref<Date | null>(props.expenseDate ? props.expenseDate : null)

watch(
  () => props.expenseDate,
  () => {
    date.value = props.expenseDate ? props.expenseDate : null
  }
)
const esLocale = es
</script>

<template>
  {{ $emit('date-selected', date) }}
  <Popover>
    <PopoverTrigger as-child>
      <Button :variant="'outline'" :class="cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')">
        <CalendarIcon class="mr-2 h-4 w-4" />
        <span>{{ date ? format(date, 'LLL dd, y', { locale: esLocale }) : 'Pick a date' }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="date" />
    </PopoverContent>
  </Popover>
</template>
