import VueCookies from 'vue-cookies'

export default function auth({ to, from, next }) {
  if (!VueCookies.get('accessToken') && !VueCookies.get('idToken') && !VueCookies.get('refreshToken')) {
    return next({ name: 'login' })
  }

  return next()
}
