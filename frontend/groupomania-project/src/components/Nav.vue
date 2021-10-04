<template>

<header class="nav">
    <div class="navLeft">
        <img src="../assets/logo-log-white.svg" />

        <router-link to="/home" class="navSection">
            <i class="fas fa-home icon"></i>
            <span class="navSectionInfo">Home</span>
        </router-link>

        <router-link to="/creating" class="navSection">
            <i class="far fa-plus-square icon"></i>
            <span class="navSectionInfo">Creating</span>
        </router-link>
    </div>
        
    <div class="navSection navUser">
        <i class="fas fa-user icon"></i>
        <i class="fas fa-caret-down navSectionInfo"></i>
        <div class="navUserHidden">
            <router-link to="/compte" class="navUserHiddenList">Account</router-link>
            <span class="navUserHiddenList" @click="logout()">Logout</span>
        </div>
    </div>

        
</header>

</template>

<script>
export default {
    name: 'Nav',

    methods: {
        logout: function() {
            this.$store.commit('logout');
            this.$router.push('/');
        },
    }
}
</script>

<style scoped lang="scss">

//block nav
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 70px;
    background-color: #122441;
    box-shadow: 0 0 0px 30px #d1515a;

    & img {
        height: fit-content;
        user-select: none;
        margin-right: 100px;
        margin-left: 10px;
    }
    // block nav logo/home/creating
    &Left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70px;
    }

    // sections de la nav / home create et user
    &Section {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 65px;
        min-width: 125px;
        color: white;
        transition: all 0.2s ease-in-out;
        margin-right: 10px;
        user-select: none;
        text-decoration: none;
        // icon des sections
        & .icon {
            font-size: 1.8em;
            transform: translateY(16px);
            transition: all 0.2s ease-in-out;
        }
        // info sous l'icone des sections
        &Info {
            opacity: 0;
            font-size: 1.3em;
            margin-top: 5px;
            transform: translateY(16px);
            transition: all 0.2s ease-in-out;
        }

        // effet des hover sur les sections
        &:hover .icon {
            transform: translateY(0);
            color: #d1515a;
        }
        &:hover .navSectionInfo {
            transform: translateY(0);
            opacity: 1;
            color: #d1515a;
        }
        &:hover {
            background-color: rgb(22, 44, 78);
        }
    }
    // section nav User
    &User {
        cursor: pointer;
        // revele en hover les options
        &:hover .navUserHidden {
            transform: scaleY(1);
        }
        // bloc option user caché
        &Hidden {
            position: absolute;
            right: 10px;
            top: 67px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            height: 100px;
            background-color: rgb(22, 44, 78);
            width: 125px;
            transform-origin: top;
            transform: scaleY(0);
            transition: transform 0.15s ease-out;
            &List {
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                color: white;
                height: 45px;
                width: 120px;
                font-size: 1.2em;
                &:hover{
                    background-color: #d1515a;
                    color: rgb(22, 44, 78);
                }
            }
        }
    }
}

</style>
