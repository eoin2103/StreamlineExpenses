import Vuex from 'vuex'

const store = Vuex.createStore(
    {
        state:{
            authenticated: false,
        },
        mutations: {
            setAuthentication(state, status) {
                state.authenticated = status;
            }
        }
    }
)

export default store