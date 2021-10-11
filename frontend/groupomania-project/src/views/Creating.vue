<template>

    <div class="creating">
        <Nav />

        <div class="creatingMain">

            <h1>Créez une publication </h1>
            
            <form class="creatingMainForm" enctype="multipart/form-data">
                <div class="creatingMainFormTitre">
                    <input v-model="titre" type="text" name="titre" placeholder="Titre..." aria-required="true" @input="formValid()">
                </div>

                <div class="creatingMainFormMedia">
                    <input type="file" name="file" ref="file" accept=".png, .jpg, .jpeg, .gif" @change="fileSetting" aria-required="true">
                </div>

                <img v-if="image.length > 0" :src="image" alt="aperçu media publication">

                <button type="button" :disabled="!validated" @click.prevent="articleCreating()">Créer</button>
            </form>

        </div>
    </div>

</template>

<script>
import Nav from '../components/Nav.vue';
import { mapState } from 'vuex';

export default {
    name: 'Creating',
    components: {
        Nav
    },
    mounted: function() {
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
            titre: '',
            file: {},
            image: '',
            validated: false
        }
    },
    computed: {
        ...mapState({
            user: 'user'
        })
    },
    methods: {
        fileSetting: function(event) {
            this.file = event.target.files[0] || event.dataTransfer.files;
            if (this.file == null) {
                this.image = '';
                return;
            }
            this.createImage(this.file);
        },
        // creation image permet l'apperçu de l'image pour la publication 
        createImage: function(file) {
            let reader = new FileReader();

            reader.onload = (event) => {
                this.image = event.target.result;
                this.formValid();
            };
            reader.readAsDataURL(file);
        },
        // fonction creation article 
        articleCreating: function() {
            const formData = new FormData
            formData.append("file", this.file)
            formData.append("titre", this.titre)
            formData.append("UserId", this.user.userId)
            console.log(this.file);
            this.$store.dispatch('articleCreating', formData)
            .then((res) => {
                console.log(res);
                this.$router.push('/home');
            })
            .catch((error) => {
                console.log(error);
            })
        },
        // validation formulaire 
        formValid: function() {
            if(this.titre.length > 0 && this.image.length > 0) {
                this.validated = true;
                return
            }
            this.validated = false;
        }
    }
}
</script>

<style scoped lang="scss">
.creating {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(249,249,249,1) 46%, #aeaeb1 100%);

    &Main {
        position: relative;
        width: 100%;
        min-height: calc(100vh - 70px);
        background-color: white;
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            width: 6px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #aeaeb1;
            border-radius: 30px;
        }
        & h1 {
            text-align: center;
            color: #aeaeb1;
        }
        // aspect formulaire post publication
        &Form {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #F4F4F4;
            max-width: 550px;
            margin: 50px auto;
            padding: 20px;
            border-radius: 8px;
            & input {
                outline: none;
                border: none;
                font-size: 1.1em;
                width: 80%;
            }
            &Titre {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 80%;
                height: 50px;
                border-radius: 8px;
                background-color: white;
                margin: 10px 0;
            }
            &Media {
                width: 80%;
                margin: 10px 0;
                & input {
                    color: #122441;
                }
            }
            & img {
                max-height: 400px;
                max-width: 350px;
                margin: 15px auto;
                border-radius: 8px;
            }
            & button {
                margin-top: 10px;
                width: 80px;
                height: 35px;
                border: none;
                border-radius: 8px;
                background-color: #d1515a;
                color: white;
                cursor: pointer;
                font-size: 1em;
                transition: all 0.15s ease-out;
                &:hover {
                    transform: scale(1.1);
                    box-shadow: 0 0 5px 0 #aeaeb1;
                }
                &:disabled {
                    transform: scale(1);
                    box-shadow: none;
                    background-color: #aeaeb1;
                }
            }
        }
    }
}
@media all and (min-width: 1023px) {
    .creating {
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