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
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
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
export default {
  name: 'App',
}
</script>
