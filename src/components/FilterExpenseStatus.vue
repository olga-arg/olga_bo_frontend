<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from 'vue'
// import { ArrowUpCircle, CheckCircle2, Circle, HelpCircle, XCircle } from 'lucide-vue-next'
// import type { Icon } from 'lucide-vue-next'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import axios from '@/axios'

const props = defineProps({
  resetFilters: Boolean,
})

interface Status {
  value: string
  label: string
  // icon: Icon
}

// const statuses = ref<Status[]>([])

watch(
  () => props.resetFilters,
  () => {
    selectedStatus.value = []
  }
)

const statuses: Status[] = [
  {
    value: 'Pending',
    label: 'Pendiente',
    // icon: HelpCircle,
  },
  {
    value: 'Approved',
    label: 'Aprobado',
    // icon: Circle,
  },
  {
    value: 'Exported',
    label: 'Exportado',
    // icon: ArrowUpCircle,
  },
]

const toggleShow = () => {
  if (!open.value || selectedStatus.value != null) {
    open.value = true
  }
}

const open = ref(false)
const value = ref<(typeof statuses)[number]>()
const selectedStatus = ref<Status[]>([])
</script>
<template>
  <div class="flex items-center border py-1 px-3 rounded-md border-dashed border-gray-400 hover:bg-gray-200">
    <button class="flex" v-on:click="toggleShow">
      <p class="text-sm text-muted-foreground">Estado</p>
      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <template class="flex ml-0">
            <div v-if="selectedStatus[0]" class="flex items-center gap-1">
              <div class="shrink-0 bg-border w-[1px] ml-1 h-4"></div>
              <div class="flex text-sm bg-gray-200 px-1 rounded-sm font-light">
                <p>{{ selectedStatus[0] ? selectedStatus[0].label : '' }}</p>
              </div>
            </div>
            <div v-else></div>
          </template>
          <!-- <Button variant="outline" size="sm" class="w-[150px] justify-start py-1"> -->
          <!-- <template> -->
          <!-- <component :is="selectedStatus?.icon" class="mr-2 h-4 w-4 shrink-0" />
            {{ selectedStatus?.label }} -->
          <!-- </template> -->
          <!-- <template v-else> + Set status </template> -->
          <!-- </Button> -->
        </PopoverTrigger>

        <PopoverContent class="p-0 w-26" side="right" align="start">
          <Command>
            <!-- <CommandInput placeholder="Change status..." /> -->
            <CommandList>
              <CommandGroup>
                <CommandItem
                  v-for="status in statuses"
                  :key="status.value"
                  :value="status.value"
                  @select="
                    (value) => {
                      if (selectedStatus.includes(status)) {
                        selectedStatus = []
                        $emit('status-selected', '')
                      } else {
                        selectedStatus = [status]
                        $emit('status-selected', status)
                      }
                    }
                  "
                  class="hover:bg-gray-100"
                >
                  <Checkbox :checked="selectedStatus.includes(status)" class="mr-2" />
                  <!-- <component :key="status.value" :class="cn('', status.value === selectedStatus?. ? 'opacity-100' : 'opacity-40')" /> -->
                  <span>{{ status.label }}</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </button>
  </div>
</template>
