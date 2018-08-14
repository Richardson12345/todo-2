<template>
  <div class="login-page">
    <label class="label"><h3>Login</h3></label>
    <div class="form">
      <form class="login-form">
        <input type="text" placeholder="username" v-model="username"/>
        <input type="password" placeholder="password" v-model="password" />
        <button @click.prevent="login(username, password)" >login</button>
        <span>or</span>
        <button @click.prevent="fbLogin">facebook login</button>
        <p class="message">Not registered? <a @click="register">Create an account</a></p>
      </form>
    </div>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import { auth, provider }  from '@/firebase.js'

export default {
  data () {
    return {
      username : "",
      password: "",
      token: localStorage.getItem( "token" )
    }
  },
  methods: {
     ...mapActions([
         'loginAcc',
         'fbLoginAcc'
     ]),
     login ( username, password ) {
       let credentials = {
         username,
         password
       }
       this.loginAcc(credentials)
     },
     register () {
       this.$router.push('/register')
     },
     fbLogin () {
      auth.signInWithPopup(provider).then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        this.fbLoginAcc(token)
        // console.log(this)
        var user = result.user
        // console.log(user)
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        console.log(error)
        var errorCode = error.code;
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
     }
  },
  computed: {
      ...mapState([
          "todo"
      ])
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
</style>