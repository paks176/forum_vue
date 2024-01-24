import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        globals: {
            siteName: 'http://localhost:8081',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
                'mode': 'cors',
                'Access-Control-Allow-Origin': '*'
            },
            
        },
        itemsList: [],
    },
    actions: {
        sendRequest(context, { method, requestURL, headers, body } ) {
            const resultURL = this.state.globals.siteName + requestURL
            return fetch(resultURL, {
                method: method,
                headers: headers,
                body: body
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    context.commit('setData', data)
                })
                .catch(error => {
                    console.log('Error happened in request: ' + resultURL + '. Error text: ' + error)
                })
        }
    },
    mutations: {
        setData(state, data) {
            state.itemsList = data;
        }
    },
    getters: {
        getData(state) {
            return state.itemsList;
        },
        getGlobals(state) {
            return state.globals;
        }
    }
})