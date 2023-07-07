<template></template>

<script>
import VueCookies from 'vue-cookies'
import router from '@/router'
import { Amplify, Auth } from 'aws-amplify'
import '@aws-amplify/ui-vue/styles.css'
import aws_exports from './aws-exports'
import OTPPad from '@/components/OTPPad.vue'
Amplify.configure(aws_exports)

Auth.configure({
  authenticationFlowType: 'CUSTOM_AUTH',
})
export default {
  name: 'App',
  components: {
    OTPPad,
  },
  async mounted() {
    await this.logout()
  },
  methods: {
    async logout() {
      try {
        await Auth.signOut()
        const cookies = VueCookies.keys()
        for (const cookie of cookies) {
          VueCookies.remove(cookie)
        }
      } catch (e) {
        console.log(e)
      }
      router.push('/')
    },
  },
  data() {
    return {}
  },
}
</script>
