<template>
  <div class="p-4 sm:ml-64">
    <div class="px-24">
      <div class="flex mb-4">
        <div v-if="this.$route.path.split('/')[1] != 'cards'" class="flex items-center h-24 rounded">
          <div className="pr-10 font-medium text-xl">
            <router-link :to="'/' + this.originalRoute.split('/')[1] + '/members'">
              <p :class="activeRoute === 'members' ? 'text-[#1C2E3D]' : 'text-[#8D8B96]'">Miembros</p>
              <div className="h-0.5 w-full bg-red-400 mt-2"></div>
            </router-link>
          </div>
          <div className="pr-10 font-regular text-[#8D8B96] text-xl">
            <router-link :to="'/' + this.originalRoute.split('/')[1] + '/teams'">
              <p :class="activeRoute === 'teams' ? 'text-[#1C2E3D]' : 'text-[#8D8B96]'">Equipos</p>
              <div className="h-0.5 w-full bg-red-400 mt-2"></div>
            </router-link>
          </div>
        </div>
        <div v-else class="flex items-center h-24 rounded">
          <div className="pr-10 font-medium text-xl">
            <router-link :to="'/' + this.originalRoute.split('/')[1] + '/members'">
              <p :class="activeRoute === 'members' ? 'text-[#1C2E3D]' : 'text-[#8D8B96]'">Mis Tarjetas</p>
              <div className="h-0.5 w-full bg-red-400 mt-2"></div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      originalRoute: this.$route.path,
      activeRoute: this.$route.path.split('/').slice(-1)[0],
    }
  },
  watch: {
    $route() {
      this.originalRoute = this.$route.path
      this.activeRoute = this.$route.path.split('/').slice(-1)[0]
    },
  },
}
</script>
