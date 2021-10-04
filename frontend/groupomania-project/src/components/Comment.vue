<template>
    <div class="comment">
        <div class="commentList">
            <div class="commentListCarte" v-for="comment in comments" :key="comment.id">
                <div class="commentListCarteUser">
                    <img src="../assets/logo-compte.svg" alt="logo groupomania">
                    <span> {{ comment.prenom }} </span>
                </div>
                
                <div class="commentListCarteText">
                    <span> {{ comment.commentaire }} </span>
                </div>
            </div>
        </div>

        <div class="commentPost">
            <textarea v-model="commentaire" name="comment" required placeholder="Ecrivez un commentaire..."></textarea>
            <button type="button" @click="commentPost">
                <i class="fas fa-plus"></i>
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "Comment",
    props: ["revele", "articleId", "toggleComment"],

    mounted: function() {
        console.log(this.user.prenom);
        this.commentGetAll();
    },

    data() {
        return {
            commentaire: "",
        };
    },
    computed: {
        ...mapState({
            user: 'user',
            comments: 'comments'
        })
    },
    methods: {
        commentPost: function() {
            this.$store.dispatch('commentPost', {
                commentaire: this.commentaire,
                prenom: this.user.prenom,
                UserId: this.user.userId,
                ArticleId: this.articleId
            })
            .then((res) => {
                console.log(res);
                this.commentGetAll();
                this.commentaire = "";
            }).catch((err) => {
                console.error(err);
            });
        },
        commentGetAll: function() {
            this.$store.dispatch('commentGetAll', this.articleId);
        }
    }
};
</script>

<style scoped lang="scss">
.comment {
    width: 100%;
    max-height: 400px;
    background-color: #f4f4f4;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    margin-bottom: 20px;
    &List {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        min-height: 150px;
        max-height: 340px;
        width: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            width: 6px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #d1515a;
            border-radius: 30px;
        }
        &Carte {
            background-color: white;
            max-width: 400px;
            min-width: 150px;
            height: auto;
            margin: 10px;
            border-radius: 8px;
            &User {
                display: flex;
                align-items: center;
                height: 20px;
                display: flex;
                margin: 3px;
                color: #aeaeb1;
                user-select: none;
                & img {
                    height: 20px;
                }
            }
            &Text {
                margin: 5px 10px;
            }
        }
    }
    &Post {
        display: flex;
        width: 100%;
        height: 60px;
        margin: 2px;
        & textarea {
            width: calc(100% - 64px);
            height: 60px;
            resize: none;
            outline: none;
            padding: 0;
            border: none;
            font-size: 1.2em;
        }
        & button {
            height: 60px;
            width: 60px;
            padding: 0;
            border: none;
            background-color: #122441;
            color: white;
            font-size: 1.2em;
            cursor: pointer;
            &:hover {
                color: #d1515a;
            }
        }
    }
}
</style>
