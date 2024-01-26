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
        sendRequest(context, { method, requestURL, headers, body, stateTarget } ) {
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
                    const setDataObj = {
                        content: data,
                        stateTarget: stateTarget,
                    }
                    context.commit('setData', setDataObj);
                    return true;
                })
                .catch(error => {
                    console.log('Error happened in request: ' + resultURL + '. Error text: ' + error);
                    return false;
                })
        }
    },
    mutations: {
        setData(state, {content, stateTarget}) {
            if (!stateTarget) {
                state.itemsList = content;
            } else {
                state[stateTarget] = content;
            }
        }
    },
    getters: {
        getData: (state) => (stateTarget) => {
            return state[stateTarget];
        },
        getGlobals(state) {
            return state.globals;
        }
    }
})