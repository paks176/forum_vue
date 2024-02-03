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
                        stateTarget,
                        data,
                    };
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
        setData(state, {stateTarget, data}) {
            let lastKeyIndex = stateTarget.length - 1;
            for (let i = 0; i < lastKeyIndex; i++) {
                let key = stateTarget[i];
                if (!(key in state)) {
                    state[key] = {}
                }
                state = state[key];
            }
            state[stateTarget[lastKeyIndex]] = data.content ? data.content : data;
        }
    },
    getters: {
        getData: (state) => (stateTarget) => {
            let i = 0;
            let targetLevel = state[stateTarget[i]];
            let nextLevel = stateTarget[i+1]
            while (nextLevel) {
                targetLevel = targetLevel[stateTarget[i+1]];
                i++
                nextLevel = stateTarget[i+1]
            }
            return targetLevel;
        },
        getGlobals(state) {
            return state.globals;
        }
    }
})