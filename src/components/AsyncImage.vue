<!-- AsyncImageComponent.vue -->
<template>
  <div v-if="!loading" class="zoom-container relative overflow-hidden h-96 w-60 rounded-lg select-none" @mousemove="handleMouseMove" @mouseleave="resetZoom" @click="toggleZoom">
    <img class="zoom-image absolute pointer-events-none" :src="imageUrl" />
  </div>
  <div v-else class="animate-pulse bg-gray-300 h-96 w-60 rounded-lg"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Storage } from 'aws-amplify'

const props = defineProps({
  receiptImageKey: String,
})

const imageUrl = ref('')
const loading = ref(true)
const zoomed = ref(false)

onMounted(async () => {
  try {
    if (!props.receiptImageKey || props.receiptImageKey === '' || !props.receiptImageKey.includes('public/')) {
      throw new Error('No se ha proporcionado una clave de imagen')
    }
    const key = props.receiptImageKey.replace('public/', '')
    const signedURL = await Storage.get(key, { expires: 300 }) // 300 segundos de expiración
    imageUrl.value = signedURL
    loading.value = false
  } catch (error) {
    console.error('Error al obtener la URL firmada: ', error)
    loading.value = false
  }
})
const handleMouseMove = (e) => {
  const zoomContainer = e.currentTarget
  const zoomImage = zoomContainer.querySelector('.zoom-image')

  const { offsetX, offsetY } = e
  const { clientWidth, clientHeight } = zoomContainer

  // Calcular el porcentaje de la posición del cursor sobre el contenedor
  const scale = zoomed.value ? 4 : 2
  const factor = zoomed.value ? 300 : 100
  const xPercent = (offsetX / clientWidth) * factor
  const yPercent = (offsetY / clientHeight) * factor

  zoomImage.style.transform = `translate(-${xPercent}%, -${yPercent}%) scale(${scale})`
}

const resetZoom = () => {
  const zoomImage = document.querySelector('.zoom-image')
  if (zoomImage) {
    zoomImage.style.transform = 'translate(0%, 0%) scale(1)'
  }
}

const toggleZoom = (e) => {
  zoomed.value = !zoomed.value
  handleMouseMove(e)
}
</script>

<style>
.zoom-container {
  /* Ajusta estas propiedades según tus necesidades */
  width: 100%; /* Ancho del contenedor */
  height: 100%; /* Alto del contenedor */
  cursor: zoom-in;
}

.zoom-image {
  transition: transform 0.1s;
  transform-origin: 0 0;
  transform: translate(0%, 0%) scale(1);
  width: 100%; /* Asegúrate de que la imagen sea lo suficientemente grande para el zoom */
  height: 100%;
}
</style>
