<template>
  <div class="main-auth">
    <section class="container-auth">
      <div class="container-auth__logo">
        <img src="../assets/img/authlogo.svg" alt="">
      </div>
      <form id="loginForm">
        <input id="loginName" type="text" placeholder="Введите почту" v-model="login">
        <input id="loginPassword" type="text" placeholder="Введите пароль" v-model="password">
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
  watch: {
    
  },
  methods: {
    ...mapActions(['logIn']),
    logInPress() {
      event.preventDefault();
      const data = new FormData();
      const userName = this.login;
      const password = this.password;
      data.append('username', userName)
      data.append('password', password)
      this.logIn(data).then(() => {
        if (this.getLoginStatus === true) {
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