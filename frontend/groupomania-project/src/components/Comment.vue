<template>
    <div class="comment">
        <div class="commentList">

            <div class="commentListCarte" v-for="comment in comments" :key="comment.id">

                <div class="commentListCarteInfo">
                    <div class="commentListCarteInfoUser">
                        <img src="../assets/logo-compte.svg" alt="logo groupomania">
                        <span> {{ comment.prenom }} </span>
                        <span class="commentListCarteInfoUserDate"> {{ comment.createdAt.split('T')[0] }} </span>
                    </div>
                    
                    <div class="commentListCarteInfoText">
                        <span> {{ comment.commentaire }} </span>    
                    </div>
                </div>

                <div class="commentListCarteDelete" v-if="authorised(comment)" @click="commentDelete(comment.id)">
                    <i class="fas fa-trash-alt"></i>
                </div>

            </div>

        </div>

        <div class="commentPost">
            <textarea v-model="commentaire" name="comment" required placeholder="Ecrivez un commentaire..." @input="commentValid()"></textarea>
            <button type="button" :disabled="!validated" @click="commentPost">
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
            comments: [],
            validated: false
        };
    },
    computed: {
        ...mapState({
            user: 'user',
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
            }).catch(error => console.error(error))
        },
        commentGetAll: function() {
            this.$store.dispatch('commentGetAll', this.articleId)
            .then((res) => {
                console.log(res)
                this.comments = res.data;
            })
            .catch(error => console.error(error))
        },
        commentDelete: function(id) {
            if(confirm('Voulez-vous supprimer ce commentaire ?')) {
                this.$store.dispatch('commentDelete', id)
                .then((res) => {
                    console.log(res)
                    this.commentGetAll();
                })
                .catch(error => console.error(error))
            }
        },
        commentValid: function() {
            if(this.commentaire.length > 2) {
                this.validated = true;
                return;
            }
            this.validated = false;
        },
        authorised: function(model) {
            if( this.user.userId == model.UserId || this.user.isAdmin ) {
                return true
            }
            return false
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
            width: 10px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #d1515a;
            border-radius: 30px;
        }
        &Carte {
            display: flex;
            align-items: center;
            width: 100%;
            height: auto;
            margin: 10px;
            
            &Info {
                background-color: white;
                min-width: 150px;
                width: auto;
                border-radius: 8px;
            }
            &InfoUser {
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
                &Date {
                    margin-left: 20px;
                }
            }
            &InfoText {
                margin: 5px 10px;
                max-width: 400px;
                word-break: break-all;
            }
            &Delete {
                margin-left: 25px;
                font-size: 1em;
                cursor: pointer;
                transition: all 0.15s ease-out;
                &:hover {
                    transform: scale(1.2);
                    color: #d1515a;
                }
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
            &:disabled {
                background-color: #aeaeb1;
                color: white;
                cursor: auto;
            }
        }
    }
}
</style>
