<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
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
  teamsName: Array,
})

interface Status {
  value: string
  label: string
  // icon: Icon
}

const teams = ref<Status[]>([])

watch(
  () => props.resetFilters,
  () => {
    selectedStatus.value = []
  }
)

onMounted(async () => {
  try {
    if (props.teamsName) {
      teams.value = props.teamsName.map((team: any) => ({
        value: team.name,
        label: team.name,
      }))
    }
  } catch (error) {
    console.error('Error fetching teamsName:', error)
  }
})
// const teams: Status[] = [
//   {
//     value: 'pending',
//     label: 'Pendiente',
//     // icon: HelpCircle,
//   },
//   {
//     value: 'aproved',
//     label: 'Aprobado',
//     // icon: Circle,
//   },
//   {
//     value: 'exported',
//     label: 'Exportado',
//     // icon: ArrowUpCircle,
//   },
// ]

const toggleShow = () => {
  if (!open.value || selectedStatus.value != null) {
    open.value = true
  }
}

const open = ref(false)
const value = ref<(typeof teams)[number]>()
const selectedStatus = ref<Status[]>([])
</script>
<template>
  <div class="flex items-center border py-1 px-3 rounded-md border-dashed border-gray-400 hover:bg-gray-200">
    <button class="flex" v-on:click="toggleShow">
      <p class="text-sm text-muted-foreground">Equipos</p>
      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <template class="flex ml-0">
            <div v-if="selectedStatus.length > 2" class="flex items-center gap-1">
              <div class="shrink-0 bg-border w-[1px] ml-1 h-4"></div>
              <div class="flex text-sm bg-gray-200 px-1 rounded-sm font-light">
                <p>{{ selectedStatus.length }} elegidos</p>
              </div>
            </div>
            <div v-else-if="selectedStatus.length > 0" class="flex items-center gap-1">
              <div class="shrink-0 bg-border w-[1px] ml-1 h-4"></div>
              <div class="flex text-sm bg-gray-200 px-1 rounded-sm font-light" v-for="selected in selectedStatus">
                <p class="truncate">{{ selected ? selected.label : '' }}</p>
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
                  v-for="status in teams"
                  :key="status.value"
                  :value="status.value"
                  @select="
                    (value) => {
                      if (selectedStatus.includes(status)) {
                        $emit('team-deselected', status)
                        selectedStatus = selectedStatus.filter((s) => s !== status)
                      } else {
                        $emit('team-selected', status)
                        selectedStatus.push(status)
                      }
                      // selectedStatus.push(status)
                      open = false
                    }
                  "
                  class="hover:bg-gray-100"
                  :class="`${selectedStatus.includes(status) ? 'bg-gray-100' : ''}`"
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
