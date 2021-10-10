<template>

    <div class="compte">
        <Nav />

        <div class="compteMain">

            <h1>Votre compte</h1>

            <img src="../assets/logo-compte.svg" alt="logo groupomania">

            <div class="compteMainInfo">
                <div class="compteMainInfoDetail">
                    <span>Nom:</span> {{ user.nom }}
                </div>
                
                <div class="compteMainInfoDetail">
                    <span>Prénom:</span> {{ user.prenom }}
                </div>

                <div class="compteMainInfoDetail" v-if="user.isAdmin">
                    <span>Role:</span> Entitée supèrieure
                </div>
                <div class="compteMainInfoDetail" v-else>
                    <span>Role:</span> simple Hummain
                </div>
                

                <div class="compteMainInfoDelete">
                    <div v-if="confirmation" class="compteMainInfoDeleteOff" @click="confirmationDelete()">Annuler</div>
                    <div v-else class="compteMainInfoDeleteOn" @click="confirmationDelete()">Supprimer ce compte</div>

                    <input v-if="confirmation" v-model="password" type="password" placeholder="password to confirm" autofocus @input="passwordValid()">

                    <button v-if="confirmation" type="button" :disabled="!validated" @click="userDelete()">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            
        </div>

    </div>

</template>

<script>
import Nav from '../components/Nav.vue';
import { mapState } from 'vuex';

export default {
    name: 'Compte',
    components: {
        Nav
    },
    mounted: function() {
        // renvoies a la page log aucun user connecté
        if(this.$store.state.user.userId === 0) {
            this.$store.dispatch("userGetOne", { id: 0 })
            .then((user) => {
                this.$store.commit('userOn', user.data)
            })
            .catch((error) => {
                console.error(error);
                this.$store.commit('logout')
                this.$router.push('/');
            })
        }
    },
    data() {
      return {
          confirmation: false,
          password: '',
          validated: false
      }
    },
    methods: {
        // permet de montrer l'input password 
        confirmationDelete: function() {
            this.confirmation = !this.confirmation;
        },
        // fonction pour supprimer le compte
        userDelete: function(){
            if(confirm('Etes vous sûr de vouloir supprimer votre compte ?')) {
                this.$store.dispatch('userDelete', {
                    id: this.user.userId,
                    password: this.password
                })
                .then((res) => {
                    console.log(res);
                    this.$store.commit('logout');
                    this.$router.push('/');
                })
                .catch((error) => {
                    console.log(error);
                    this.password = '';
                })
            }
        },
        // validation password
        passwordValid: function() {
            let passwordRgex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/;
            if(!passwordRgex.test(this.password)) {
                this.validated = false;
                return
            }
            this.validated = true;
        },
    },
    computed: {
        // recuperation du state vuex
        ...mapState({
            user: 'user'
        }),
    }
}
</script>

<style scoped lang="scss">
.compte {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(249,249,249,1) 46%, #aeaeb1 100%);
    &Main {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: calc(100vh - 70px);
        background-color: white;
        & h1 {
            color: #aeaeb1;
            margin-bottom: 0;
        }
        & img {
            width: 200px;
        }

        &Info {
            display: flex;
            flex-direction: column;
            background-color: #F4F4F4;
            width: calc(100% - 40px);
            max-width: 550px;
            padding: 20px;
            border-radius: 8px;

            &Detail {
                display: flex;
                align-items: baseline;
                width: auto;
                height: 30px;
                margin: 10px 0 20px 10px;
                font-size: 1.2em;
                & span {
                    color: #d1515a;
                    font-weight: bold;
                    font-size: 1.3em;
                    margin-right: 25px;
                }
            }

            &Delete {
                display: flex;
                align-items: center;
                flex-direction: column;
                width: 100%;
                height: auto;
                margin: 20px 0;
                & div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 40px;
                    width: 70%;
                    margin: 20px 0;
                    background-color: #d1515a;
                    color: white;
                    font-size: 1.2em;
                    border-radius: 8px;
                    cursor: pointer;
                }
                & input {
                    width: calc(70% - 30px);
                    height: 40px;
                    border: none;
                    border-radius: 8px;
                    outline: none;
                    font-size: 1.2em;
                    padding: 0 15px;
                }
                & button {
                    border: none;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    margin: 30px 0 0 0;
                    background-color: white;
                    color: #d1515a;
                    font-size: 1.2em;
                    cursor: pointer;
                    &:disabled {
                        color: #aeaeb1;
                        cursor: not-allowed;
                    }
                }
            }
        }
    }
}
@media all and (min-width: 1023px) {
    .compte {
        &Main {
            z-index: 2;
            max-width: 800px;
            margin-top: 70px;
            box-shadow: 0 8px 4px 1px #d1515a;
            overflow: hidden;
            height: calc(100vh - 70px);
            &Head {
                box-shadow: 0 10px 10px 6px rgba(249,249,249,0.97);
            }
            &List {
                width: 800px;
            }
        }
    }
}
</style>