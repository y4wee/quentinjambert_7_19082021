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
    align-items: center;
    width: 100%;
    background-color: #122441;

    & img {
        user-select: none;
    }
    // block nav logo/home/creating
    &Left {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    // sections de la nav / home create et user
    &Section {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: white;
        user-select: none;
        text-decoration: none;
        // icon des sections
        & .icon {
            font-size: 1.8em;
        }
        // info sous l'icone des sections
        &Info {
            font-size: 1.3em;
        }
    }
    // section nav User
    &User {
        position: relative;
        cursor: pointer;
        // revele en hover les options
        &:hover .navUserHidden {
            transform: scaleY(1);
        }
        // bloc option user caché
        &Hidden {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            transform-origin: top;
            transform: scaleY(0);
            transition: transform 0.15s ease-out;
            bottom: -99px;
            height: 100px;
            background-color: #d1515a;
            width: 100%;
            &List {
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                color: white;
                font-size: 1.2em;
                height: 45px;
                width: 100%;
            }
        }
    }
}
@media all and (max-width: 1023px) {
    .nav {
        z-index: 10;
        flex-direction: column;
        height: auto;
    & img {
        height: auto;
        width: calc(100% - 20px);
        margin: 10px 10%;
    }
    // block nav logo/home/creating
    &Left {
        flex-wrap: wrap;
        justify-content: space-evenly;
        height: auto;
        width: 100%;
        & a {
            background-color: #d1515a;
            width: 49%;
            flex-direction: row;
        }
    }
    // sections de la nav / home create et user
    &Section {
        min-height: 50px;
        color: white;
        // icon des sections
        & .icon {
            margin: 0 10px;
        }
        // info sous l'icone des sections
    }
    // section nav User
    &User {
        width: 49%;
        margin: 5px 0;
        background-color: #d1515a;
        padding-top: 5px;
        // bloc option user caché
        &Hidden {
            bottom: -99px;
            height: 100px;
            background-color: #d1515a;
            width: 100%;
            &List {
                width: 100%;
            }
        }
    }
}
}
@media all and (min-width: 1024px) {
.nav {
    justify-content: space-between;
    position: fixed;
    height: 70px;
    box-shadow: 0 0 0px 30px #d1515a;
    & img {
        height: fit-content;
        margin-right: 100px;
        margin-left: 10px;
    }
    // block nav logo/home/creating
    &Left {
        height: 70px;
    }
    // sections de la nav / home create et user
    &Section {
        height: 65px;
        min-width: 125px;
        transition: all 0.15s ease-out;
        margin-right: 10px;
        // icon des sections
        & .icon {
            transform: translateY(16px);
            transition: all 0.15s ease-in-out;
        }
        // info sous l'icone des sections
        &Info {
            opacity: 0;
            margin-top: 5px;
            transform: translateY(16px);
            transition: all 0.15s ease-in-out;
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
        // bloc option user caché
        &Hidden {
            background-color: rgb(22, 44, 78);
            &List:hover {
                background-color: #d1515a;
            }
        }
    }
}
}

</style>
