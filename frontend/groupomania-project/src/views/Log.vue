<template>
  <div class="user">
    <div class="logLogo">
      <img alt="Vue logo" src="../assets/logo-log-white.svg">
    </div>
    <p class="presentationSite">
      Bienvenue sur le réseau social interne de groupomania, créez, partagez et commentez afin de mieux vous connaitre au sain de l'entreprise !
    </p>

    <div class="userData">
        <h2 v-if="mode == 'login'">Connectez vous</h2>
        <h2 v-else>Inscrivez vous</h2>

        <div class="logForm">
          <div class="formInput" v-if="mode == 'signup'">    
            <input v-model="nom" type="text" name="name" placeholder="Nom" required>
          </div>

          <div class="formInput" v-if="mode == 'signup'">
            <input v-model="prenom" type="text" name="firstName" placeholder="Prénom" required>
          </div>

          <div class="formInput">
            <input v-model="email" type="email" name="email" placeholder="Email" required>
          </div>

          <div class="formInput">
            <input v-model="password" type="password" name="password" placeholder="Mot de passe" required>
          </div>

          <button class="formButton" v-if="mode == 'login'" type="button" @click="userLogin()">
            Login
          </button>
          <button class="formButton" v-else type="button" @click="userCreating()">
            Login
          </button>

          <p v-if="mode == 'login'">
            Vous n'êtes pas inscrit, <span @click="toggleMode()">cliquez ici</span>
          </p>
          <p v-else>
            Vous êtes déja inscrit, <span @click="toggleMode()">cliquez ici</span>
          </p>
        </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Log',
  components: {
    
  },
  data (){
    return {
      mode: 'login',
      nom: "",
      prenom: "",
      email: "",
      password: ""
    }
  },
  mounted: function() {
    if(this.$store.state.user.userId != 0) {
        this.$router.push('/home');
        return;
    }
  },
  methods: {
    toggleMode: function() {
      if(this.mode == 'login') {
        this.mode = 'signup'
      } else {
        this.mode = 'login'
      }
    },

    userCreating: function() {
      this.$store.dispatch('userCreating', {
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        password: this.password
      })
      .then((res) => {
        console.log(res);
        this.userLogin();
      })
      .catch((error) => {
        console.error(error);
      })
    },

    userLogin: function() {
      this.$store.dispatch('userLogin', {
        email: this.email,
        password: this.password
      })
      .then((res) => {
        console.log(res);
        this.$router.push('/home');
      })
      .catch((error) => {
        console.log(error);
      })
    },

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.user {
  width: 100%;
  min-height: calc(100vh - 50px);
  background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(249,249,249,1) 46%, #aeaeb1 100%);
  padding-bottom: 50px;
}
//banniere page log
.logLogo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #122441;
  height: 250px;
  width: 100%;
  border-radius: 0% 100% 43% 57% / 100% 0% 100% 0% ;
  box-shadow: 100px -20px 0px 15px #d1515a;

  img {
      width: 45%;
      margin-left: 200px;
  }
}

.presentationSite {
  font-size: 1.5em;
  width: 700px;
  margin: 40px auto;
  text-align: center;
}

// fenetre de login/signup
.userData {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 700px;
  margin: 0 auto;
  background-color: #122441;
  border: solid #122441 5px;
  border-radius: 12% 88% 12% 88% / 100% 0% 100% 0% ;
  overflow: hidden;
  box-shadow: -5px 2px 0px 2px #d1515a,
              -2px 2px 0px 0px #d1515a;
}
.logForm {
    width: 100%;
    padding: 30px 0;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & p {
      margin: 30px 0 0 0;
    }
    & span {
      color: black;
      font-weight: bold;
      cursor: pointer;
      user-select: none;
      transition: color 0.1s ease-in-out;
      &:hover {
        color: #d1515a;
      }
    }
}
// h2 connexion et inscription
h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 50px;
  margin: 0;
  color: white;
}

//aspect des input formulaire
.formInput {
  display: flex;
  align-items: center;
  height: 45px;
  width: 400px;
  margin: 10px 0;
  background-color: rgb(230, 230, 230);
  padding-left: 15px;
  border-radius: 15px;
  & input {
    width: max-content;
    font-size: 1.2em;
    outline: none;
    border: none;
    background-color: inherit;
  }
}
// boutons de validation formulaire
.formButton {
  width: 80px;
  height: 80px;
  margin-top: 20px;
  border: dotted 4px #122441;
  border-radius: 50%;
  background-color: white;
  font-size: 1em;
  font-weight: bold;
  color: #122441;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
    &:hover {
      transform: scale(1.1);
      border-color: #d1515a;
    }
}

</style>
