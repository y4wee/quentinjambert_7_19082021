<template>

<div class="article">
    <div class="articleUser">
        <img src="../assets/logo-compte.svg" alt="logo groupomania">
        <span> {{ userExt.prenomExt }} </span>
    </div>
    <h2> {{ article.titre }} </h2>

    <div class="articleMedia">
        <img :src="article.imageUrl" :alt="article.titre">
    </div>

    <div class="articleSocial">
        <div class="articleSocialLike">
            <i class="fas fa-thumbs-up"></i>
            <span> {{ article.likes }} </span>
        </div>
        <div class="articleSocialDislike">
            <i class="fas fa-thumbs-down"></i>
            <span> {{ article.dislikes }} </span>
        </div>
        <div class="articleSocialComment" @click="toggleComment" :class="{ commentActive: revele }">
            <i class="fas fa-comment-alt"></i>
        </div>
    </div>

    <Comment 
    v-if="revele"
    :revele="revele"
    :articleId="articleId"
    />
</div>

</template>

<script>
import Comment from '../components/Comment.vue';

export default {
    name: "Article",

    props: ["article"],
    components: {
        Comment
    },

    data() {
        return {
            userExt: {},
            articleId: this.article.id,
            revele: false
        }
    },

    mounted: function() {
        this.getArticleUser();
    },
    
    methods: {
        getArticleUser: function() {
            this.$store
                .dispatch("userGetOne", { id: this.article.UserId })
                .then((userExt) => {
                    this.userExt = userExt.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        toggleComment: function() {
            this.revele = !this.revele
        }
    }
};
</script>

<style scoped lang="scss">

.article {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;
    height: auto;
    margin-top: 70px;
    border-bottom: solid 1px #aeaeb1;
    //partie user du post
    &User {
        display: flex;
        align-items: center;
        width: 100%;
        color: #aeaeb1;
        & img {
            width: 35px;
            height: 35px;
        }
    }
    // partie titre du post
    & h2 {
        align-self: flex-start;
        margin: 5px 0 20px;
        padding-left: 10px;
    }
    &Media {
        display: flex;
        justify-content: center;
        width: 100%;
        height: auto;
        background-color: #F4F4F4;
        border-radius: 8px;
        & img {
            max-width: 500px;
            max-height: 500px;
        }
    }
    &Social {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin: 20px 0;
        & div {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            width: 125px;
            height: 40px;
            background-color: #F4F4F4;
            border-radius: 8px;
            margin: 0 10px;
            user-select: none;
            cursor: pointer;
            transition: all 0.1s ease-in-out;
            &:hover {
                background-color: #aeaeb1;
            }
        }
        & .fas {
            font-size: 1.2em;
        }
    }
}
.commentActive {
    color: #d1515a;
}

</style>
