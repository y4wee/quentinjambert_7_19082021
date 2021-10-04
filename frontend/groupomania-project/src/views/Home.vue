<template>

    <div class="home">
        <Nav />

        <div class="homeList">
            <div class="homeListHead">
                <h2>Quoi de neuf {{ user.prenom }} ?</h2>
            </div>

            <Article 
            v-for="article in articles"
            :key="article.id"
            :article="article"
            />

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
    mounted: function() {
        if(this.$store.state.user.userId === 0) {
            this.$router.push('/');
            return;
        }
        this.$store.dispatch('articleGetAll');
    },
    computed: {
        ...mapState({
            user: 'user',
            articles: 'articles'
        }),
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

    &List {
        position: relative;
        z-index: 2;
        width: 800px;
        min-height: calc(100vh - 100px);
        background-color: white;
        margin-top: 100px;
        box-shadow: 0 10px 10px 6px #d1515a;
        &Head {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100px;
            background-color: rgba(249,249,249,0.97);
            position: absolute;
            left: 0;
            right: 0;
            & h2 {
                width: fit-content;
                user-select: none;
            }
        }
    }
}
</style>
