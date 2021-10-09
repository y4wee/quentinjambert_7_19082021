<template>

    <div class="home">

        <Nav />

        <div class="homeMain">
            <div class="homeMainHead">
                <h2 v-if="scrollMode == false">Quoi de neuf {{ user.prenom }} ?</h2>
            </div>
            <div class="homeMainScrollback" v-if="scrollMode" @click="goBackTop()">
                <i class="fas fa-arrow-up"></i>
            </div>

            <div class="homeMainList" @scroll="scrollbackMode()">
                <Article 
                v-for="article in articles"
                :key="article.id"
                :article="article"
                :user="user"
                />
            </div>

            
        </div>


    </div>

</template>

<script>
import Nav from '../components/Nav.vue';
import Article from '../components/Article.vue';
import { mapState } from 'vuex';

export default {
    name: 'Home',
    components: {
        Nav,
        Article
    },
    data() {
        return {
            scrollMode: false,
        }
    },
    beforeMounted: function() {
        console.log(this.$store.state.user.userId)
        this.$store.dispatch("userGetOne", { id: 0 })
        .then((user) => {
            console.log(user)
            this.$store.commit('userOn', user)
        })
        .catch(error => console.error(error))
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
        this.$store.dispatch('articleGetAll');
    },
    computed: {
        ...mapState({
            user: 'user',
            articles: 'articles'
        }),
    },
    methods: {
        // fait apparaitre le bouton scrollback 
        scrollbackMode: function() {
            if ( document.querySelector(".homeMainList").scrollTop > 400) {
                this.scrollMode = true;
            } else {
                this.scrollMode = false;
            }
        },
        // permet de remonter au top de la page grace au scrollback
        goBackTop: function() {
            document.querySelector(".homeMainList").scrollTop = 0;
        },
    }
}
</script>

<style scoped lang="scss">
.home {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(249,249,249,1) 46%, #aeaeb1 100%);

    &Main {
        display: flex;
        align-items: center;
        flex-direction: column;
        position: relative;
        z-index: 2;
        width: 800px;
        height: calc(100vh - 70px);
        background-color: white;
        margin-top: 70px;
        box-shadow: 0 8px 4px 1px #d1515a;
        overflow: hidden;
        &Head {
            z-index: 3;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
            box-shadow: 0 10px 10px 6px rgba(249,249,249,0.97);
            background-color: rgba(249,249,249,0.97);
            position: absolute;
            left: 0;
            right: 0;
            & h2 {
                width: fit-content;
                user-select: none;
            }
        }
        &List {
            display: flex;
            align-items: center;
            flex-direction: column;
            width: 800px;
            overflow-y: scroll;
            overflow-x: hidden;
            &::-webkit-scrollbar {
                width: 6px;
            }
            &::-webkit-scrollbar-thumb {
                background-color: #aeaeb1;
                border-radius: 30px;
            }
        }
        &Scrollback {
            z-index: 3;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 5px;
            height: 50px;
            width: 50px;
            border-radius: 50%;
            background-color: #122441;
            color: white;
            font-size: 1.5em;
            cursor: pointer;
        }
    }
}
</style>
