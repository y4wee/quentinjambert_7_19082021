import { createStore } from "vuex";

// creat new store instance 
const store = createStore({
    state: {

    },
    actions: {
        userCreating: ({commit}, userData) => {
            commit;
            console.log(userData);
        }
    }
})

export default store;