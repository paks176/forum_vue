import Vue from 'vue';
import Vuex from 'vuex';
// import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogged: false,
        globals: {
            siteName: 'http://localhost:8081',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
                'mode': 'cors',
                'credentials': 'include',
                'Access-Control-Allow-Origin': '*'
            },

        },
        itemsList: [],
    },
    actions: {
        async sendRequest(context, {method, requestURL, headers, body, stateTarget}) {
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
        },
        logIn(context, data) {
            return fetch(`${this.state.globals.siteName}/login`, {
                'method': 'POST',
                'body': data,
                'credentials': 'include',
                'mode': 'cors',
                headers: {
                    'accept': '*/*',
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(response => {
                if (response.ok) {
                    context.commit('setLogInStatus', true);
                    console.log('login success');
                }
                if (response.status === 401) {
                    context.commit('setLogInStatus', false);
                    console.log('login failed');
                }
            }).catch(err => console.log('Error in login request: ' + err))
        },
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
            let resultContent = data.content ? data.content : data;
            if (Array.isArray(resultContent)) {
                resultContent = resultContent.reduce(
                    (resultObject, currentLevel) => (
                        {...resultObject, [currentLevel.id]: currentLevel}), {}
                )
            }
            state[stateTarget[lastKeyIndex]] = resultContent;
        },

        setLogInStatus(state, status) {
            state.isLogged = status;
        }
    },
    getters: {
        getData: (state) => (stateTarget) => {
            let i = 0;
            let targetLevel = state[stateTarget[i]];
            let nextLevel = stateTarget[i + 1]
            while (nextLevel) {
                targetLevel = targetLevel[stateTarget[i + 1]];
                i++
                nextLevel = stateTarget[i + 1]
            }
            return targetLevel;
        },
        getGlobals(state) {
            return state.globals;
        },
        getLoginStatus(state) {
            return state.isLogged;
        },
    },

    position: {
        level: {
            type: 'category',
            id: 1,
            name: 'Одежда и обувь',
            level: {
                type: 'category',
                id: 3,
                name: 'Верхняя одежда',
            }
        }
    }
});