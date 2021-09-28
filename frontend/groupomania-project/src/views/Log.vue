<template>
  <div class="user">
    <div class="logLogo">
      <img alt="Vue logo" src="../assets/logo-log-white.svg">
    </div>
    <p>
      Bienvenue sur le réseau social interne de groupomania, créez, partagez et commentez afin de mieux vous connaitre au sain de l'entreprise !
    </p>

    <div class="userData">
      <div class="userDataLogin">
        <h2>Connectez vous</h2>
        <form class="loginForm" method="post">
          <div class="loginFormInput">
            <label for="connectionEmail">Email :</label>
            <input type="email" id="connectionEmail" name="connectionEmail" required>
          </div>

          <div class="loginFormInput">
            <label for="connectionPassword">Password :</label>
            <input type="password" id="connectionPassword" name="connectionPassword" required>
          </div>
          
          <input type="submit" value="Connection">
        </form>
      </div>

      <div class="userDataSignup">
        <h2>Inscrivez vous</h2>
        <form class="signupForm" method="post">
          <label for="inscriptionName">Nom</label>
          <input type="text" id="inscriptionName" name="inscriptionName" required>

          <label for="inscriptionFirstname">Prénom</label>
          <input type="text" id="inscriptionFirstname" name="inscriptionFirstname" required>

          <label for="inscriptionEmail">Email</label>
          <input type="email" id="inscriptionEmail" name="inscriptionEmail" required>

          <label for="inscriptionPassword">Password</label>
          <input type="text" id="inscriptionPassword" name="inscriptionPassword" required>

          <input type="submit" value="Validation">
        </form>
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
      logHidden: true,
      logins: [
        {
          name: "Email",
          type: "email"
        },
        {
          name: "Password",
          type: "Password"
        }
      ],
      signups: [
        {
          name: "Nom",
          type: "text"
        },
        {
          name: "Prénom",
          type: "text"
        },
        {
          name: "Email",
          type: "email"
        },
        {
          name: "Password",
          type: "Password"
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
//banniere page log
.logLogo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #FFD7D7;
  height: 300px;
  width: 100%;
  border-radius: 0% 100% 43% 57% / 100% 0% 100% 0% ;

  img {
      width: 45%;
      margin-left: 200px;
  }
}

p {
  font-size: 1.5em;
  width: 700px;
  margin: 80px auto;
  text-align: center;
}

// fenetre de login/signup
.userData {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 700px;
  margin: 0 auto 50px;
  background-color: #FFD7D7;
  border: solid #FFD7D7 5px;
  border-radius: 12% 88% 12% 88% / 100% 0% 100% 0% ;
  overflow: hidden;

  &Login {
    
  }

  &Signup {

  }

  & form {
    padding: 40px 0;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}

h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 50px;
  margin: 0;
}

.loginFormInput {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 40px;
  width: 400px;
  margin: 10px 0;
  border-bottom: solid 3px #FFD7D7;

  & label {
    width: 90px;
    font-weight: bold;
  }

  & input {
    width: 290px;
    font-size: 1.2em;
    outline: none;
    border: none;
    border-top: solid 3px #FFD7D7;
    border-right: solid 3px #FFD7D7;
    padding-top: 10px;
  }
}

</style>
