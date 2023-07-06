<script>
import { Amplify, Auth } from 'aws-amplify'
import '@aws-amplify/ui-vue/styles.css'
import aws_exports from './aws-exports'
Amplify.configure(aws_exports)

Auth.configure({
  authenticationFlowType: 'CUSTOM_AUTH',
})
export default {
  name: 'HomePage',
  components: {},
  methods: {
    async login() {
      try {
        alert('Login', this.username)
        const res = await Auth.signIn(this.username, this.username)
        this.cognitoUser = res
        this.userState = 'OTP'
      } catch (e) {
        console.error(e)
      }
    },
    async otp() {
      alert('OTP', this.code)
      try {
        const res = await Auth.sendCustomChallengeAnswer(this.cognitoUser, this.code)
        this.userState = 'authenticated'
      } catch (e) {
        console.error(e)
      }
    },
    async current() {
      try {
        const res = await Auth.currentAuthenticatedUser()
        this.user = res
      } catch (e) {
        console.log(e)
      }
    },
    async logout() {
      try {
        await Auth.signOut()
        this.user = ''
        this.userState = 'unauthenticated'
      } catch (e) {
        console.log(e)
      }
    },
  },
  data() {
    return {
      username: '',
      code: '',
      userState: 'unauthenticated',
      cognitoUser: '',
      user: '',
    }
  },
}
</script>
<template>
  <h1>Amplify with OTP</h1>
  <div v-if="userState == 'unauthenticated'">
    <h2>Sign In</h2>
    <input v-model="username" type="email" placeholder="email" />
    <br />
    <button v-on:click="login">Log In</button>
  </div>
  <div v-if="userState == 'OTP'">
    <h2>OTP Code</h2>
    <input v-model="code" type="text" placeholder="OTP Code" />
    <br />
    <button v-on:click="otp">Send Code</button>
  </div>
  <div v-if="user">
    <h2 class="bg-green-200 w-max">Authenticated</h2>
    <a>{{ user }}</a>
    <button v-on:click="logout">Log Out</button>
  </div>
  <div v-else>
    <button v-on:click="current">Current</button>
  </div>
</template>
