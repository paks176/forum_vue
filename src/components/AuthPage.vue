<template>
  <div class="main-auth">
    <section class="container-auth">
      <div class="container-auth__logo">
        <img src="../assets/img/authlogo.svg" alt="">
      </div>
      <form id="loginForm">
        <input id="loginName" type="text" placeholder="Введите почту">
        <input id="loginPassword" type="text" placeholder="Введите пароль">
        <a href="#">Забыли пароль?</a>
        <button type="submit" class="bright-button" style="margin-top: 32px" id="loginButton" @click="logInPress">Вход</button>
      </form>
    </section>
    <div class="auth-message">
      <p></p>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {mapGetters} from "vuex";
import router from '@/router/index'

export default {
  name: "AuthPage",
  data() {
    return {
      login: '',
      password: '',
    }
  },
  methods: {
    ...mapActions(['logIn']),
    logInPress() {
      event.preventDefault();
      const loginData = {
        'username': this.login,
        'password': this.password
      };
      this.logIn(loginData).then(() => {
        if (this.getLoginStatus) {
          router.push('/')
        }
      })
    },
  },
  computed: {
    ...mapGetters(['getLoginStatus'])
  }
}
</script>

<style scoped>

</style>