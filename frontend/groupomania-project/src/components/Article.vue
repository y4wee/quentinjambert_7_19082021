<template>

<div class="article">
    <div class="articleDelete" v-if="authorised(this.article)" @click="articleDelete()">
        <i class="fas fa-trash-alt"></i>
    </div>

    <div class="articleUser">
        <img src="../assets/logo-compte.svg" alt="logo groupomania">
        <span> {{ userExt.prenomExt }} </span>
        <span class="articleUserDate"> {{ article.createdAt.split('T')[0] }} </span>
    </div>
    <h2> {{ article.titre }} </h2>

    <div class="articleMedia">
        <img :src="article.imageUrl" :alt="article.titre">
    </div>

    <div class="articleSocial">
        <button class="articleSocialLike" :disabled="disliked" :class="{ focused: liked }" @click="onLike">
            <i class="fas fa-thumbs-up"></i>
            <span> {{ article.likes }} </span>
        </button>
        <button class="articleSocialDislike" :disabled="liked" :class="{ focused: disliked }" @click="onDislike">
            <i class="fas fa-thumbs-down"></i>
            <span> {{ article.dislikes }} </span>
        </button>
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

    props: ["article", "user"],
    components: {
        Comment
    },

    data() {
        return {
            userExt: {},
            articleId: this.article.id,
            revele: false,
            liked: false,
            disliked: false,
            like: 0
        }
    },

    mounted: function() {
        this.getArticleUser();
        this.checkUserLike();
    },

    methods: {
        // recupere l'info du createur de l'article
        getArticleUser: function() {
            this.$store
                .dispatch("userGetOne", { id: this.article.UserId })
                .then((userExt) => {
                    this.userExt = userExt.data;
                })
                .catch(error => console.error(error))
        },
        // bouton pour delete article
        articleDelete: function() {
            console.log(this.article.id)
            if(confirm('voulez-vous vraiment supprimer cette publication ?')) {
                this.$store.dispatch("articleDelete", this.article.id)
                .then(() => {
                    this.$store.dispatch('articleGetAll');
                })
                .catch(error => console.error(error))
            }
        },
        // fonction click like
        onLike: function() {
            if(this.liked) {
                this.like = 0
            } else {
                this.like = 1
            }
            this.liked = !this.liked
            this.$store.dispatch("articleLike", {
                id: this.articleId,
                userId: this.user.userId,
                like: this.like
            })
            .then((res) => {
                console.log(res);
                this.$store.dispatch('articleGetAll');
            })
            .catch(error => console.error(error))
        },
        // fonction click dislike
        onDislike: function() {
            if(this.disliked) {
                this.like = 0
            } else {
                this.like = -1
            }
            this.disliked = !this.disliked
            this.$store.dispatch("articleLike", {
                id: this.articleId,
                userId: this.user.userId,
                like: this.like
            })
            .then((res) => {
                console.log(res);
                this.$store.dispatch('articleGetAll');
            })
            .catch(error => console.error(error))
        },
        // check chaque article si like ou dislike par le user
        checkUserLike: function() {
            let userId = this.user.userId.toString()
            if(this.article.userLiked.includes(userId)) {
                this.liked = true;
            }
            else if(this.article.userDisliked.includes(userId)) {
                this.disliked = true;
            }
        },
        // revele les commentaires
        toggleComment: function() {
            this.revele = !this.revele
        },
        // autorisation admin ou user 
        authorised: function(model) {
            if( this.user.userId == model.UserId || this.user.isAdmin ) {
                return true
            }
            return false
        }
    },
};
</script>

<style scoped lang="scss">

.article {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    max-width: 600px;
    height: auto;
    margin-top: 70px;
    border-bottom: solid 1px #aeaeb1;
    //bouton delete
    &Delete {
        position: absolute;
        right: 20px;
        top: 30px;
        font-size: 1.4em;
        cursor: pointer;
        transition: all 0.15s ease-in-out;
        &:hover {
            transform: scale(1.2);
            color: #d1515a;
        }
    }
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
        &Date {
            margin-left: 30px;
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
            max-width: 80%;
            max-height: 500px;
        }
    }
    &Social {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
        margin: 20px 0;
        & button {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            min-width: 100px;
            max-width: 125px;
            height: 40px;
            border: none;
            border-radius: 8px;
            user-select: none;
            cursor: pointer;
            outline: none;
            font-size: 1em;
        }
        &Like {
            background-color: #F4F4F4;
            color: #122441;
            &:disabled {
                color: #aeaeb1;
            }
        }
        &Dislike {
            background-color: #F4F4F4;
            color: #122441;
            &:disabled {
                color: #aeaeb1;
            }
        }
        &Comment {
            background-color: #F4F4F4;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            min-width: 100px;
            max-width: 125px;
            height: 40px;
            border-radius: 8px;
            user-select: none;
            cursor: pointer;
        }
        & .fas {
            font-size: 1.2em;
        }
    }
}
.commentActive {
    color: #d1515a;
    background-color: #aeaeb1;
}
.focused {
    color: #d1515a;
    background-color: #aeaeb1;
}

</style>
