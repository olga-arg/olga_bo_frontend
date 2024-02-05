<template>
  <div class="grid grid-cols-2">
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="h-12 mr-2" src="@/assets/logo.svg" alt="logo" />
        </a>

        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Welcome</h1>
            <a class="text-xs leading-tight tracking-tight text-gray-900 md:text-sm dark:text-white">Enter your email to get a one-time passcode.</a>
            <form class="space-y-4 md:space-y-6 flex-col" action="#">
              <div>
                <div v-if="this.loading" class="flex justify-center items-center h-14 rounded-md p-4 text-md font-medium text-white">
                  <div role="status">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin fill-red-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd" fill-rule="evenodd" d="M0 0h24v24H0z" fill="none" />
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </div>
                </div>
                <input
                  v-if="userState === 'unauthenticated' && this.loading === false"
                  v-model="username"
                  type="email"
                  name="email"
                  id="email"
                  class="pl-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
                <OTPPad class="flex justify-between" v-else-if="userState === 'OTP' && this.loading === false" :length="6" @entered="(v) => (optValue = v)" />
                <a v-if="this.error" class="text-red-400">{{ this.error }}</a>
              </div>
              <button
                v-if="userState === 'unauthenticated' && this.loading === false"
                type="submit"
                v-on:click.prevent="login"
                class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <button
                v-else-if="userState === 'unauthenticated'"
                class="w-full cursor-not-allowed text-white bg-gray-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <button
                v-else-if="userState === 'OTP' && this.loading === false"
                type="submit"
                v-on:click.prevent="otp"
                class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Send Code
              </button>
              <button
                v-else-if="userState === 'OTP'"
                class="w-full cursor-not-allowed text-white bg-gray-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Send Code
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    <section class="relative text-center bg-[#DE848B]">
      <img class="h-screen object-cover" src="@/assets/login.png" alt="login" />
      <div class="absolute bottom-20 left-24 text-left">
        <a class="text-4xl text-white font-regular">Di adiós al estrés financiero<br />con la ayuda de Olga.</a>
        <br />
        <br />
        <a class="text-xl font-light text-white"
          >Toma el control de las finanzas de tu empresa con Olga, la<br />
          forma más rápida y sencilla.</a
        >
      </div>
    </section>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
import router from '@/router'
import { Amplify, Auth } from 'aws-amplify'
import '@aws-amplify/ui-vue/styles.css'
import aws_exports from './aws-exports'
import { ref } from 'vue'
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
    await this.current()
    if (VueCookies.get('accessToken') && VueCookies.get('refreshToken') && VueCookies.get('idToken')) {
      router.push('/expenses/members')
    }
  },
  methods: {
    async login() {
      this.loading = true
      const email = this.username
      this.username = ''
      this.error = ''
      try {
        const res = await Auth.signIn(email)
        this.cognitoUser = res
        this.userState = 'OTP'
      } catch (e) {
        this.error = e.message
        console.error(e)
      }
      this.loading = false
    },
    async otp() {
      this.loading = true
      try {
        this.error = ''
        const res = await Auth.sendCustomChallengeAnswer(this.cognitoUser, this.optValue)
        this.optValue = ref('')
        VueCookies.set('accessToken', res.signInUserSession.accessToken.jwtToken, '1h')
        VueCookies.set('refreshToken', res.signInUserSession.refreshToken.token, '1h')
        VueCookies.set('idToken', res.signInUserSession.idToken.jwtToken, '1h')
        router.push('/expenses/members')
      } catch (e) {
        this.userState = 'unauthenticated'
        this.error = 'OTP Incorrecto'
        console.error(e)
      }
      this.loading = false
    },
    async current() {
      try {
        const res = await Auth.currentAuthenticatedUser()
        VueCookies.set('accessToken', res.signInUserSession.accessToken.jwtToken, '1h')
        VueCookies.set('refreshToken', res.signInUserSession.refreshToken.token, '1h')
        VueCookies.set('idToken', res.signInUserSession.idToken.jwtToken, '1h')
      } catch (e) {
        console.log(e)
      }
    },
  },
  data() {
    return {
      loading: false,
      username: '',
      code: '',
      userState: 'unauthenticated',
      cognitoUser: '',
      optValue: ref(''),
      error: '',
    }
  },
}
</script>
