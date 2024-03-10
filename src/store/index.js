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
                'credentials': 'include',
                'Access-Control-Allow-Origin': '*'
            },
        },
        itemsList: [],
        thisUser: {
            isLogged: false,
            id: 0,
            role: "",
            email: "",
            created: "",
            telegramNickname: null
        }
    },
    actions: {
        sendRequest(context, {method, requestURL, headers, body, stateTarget}) {
            const resultURL = this.state.globals.siteName + requestURL
            return fetch(resultURL, {
                method: method,
                headers: headers,
                credentials: 'include',
                body: body
            })
                .then(response => {
                    return response.json()
                        .then(data => {
                            const setDataObj = {
                                stateTarget,
                                data,
                            };
                            context.commit('setData', setDataObj);
                            return true;
                        })
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
                headers: {
                    'accept': '*/*',
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(() => {
                return context.dispatch('getInfoAboutMe')
            }).catch(err => console.log('Error in login request: ' + err))
        },
        
        getInfoAboutMe(context) {
            return fetch(`${this.state.globals.siteName}/v1/account/me`, 
                {'credentials': 'include',})
                .then(stream => {
                    return stream.json()
                        .then(result => {
                        if (result.status === 400) {
                            console.warn('Error with getting user info. Text of the error: ' + result.message);
                            const noLoginResult = {
                                isLogged: false,
                                id: 0,
                                role: "",
                                email: "",
                                created: "",
                                telegramNickname: null
                            }
                            context.commit('setUserInfo', noLoginResult);
                        } else {
                            result.isLogged = true;
                            context.commit('setUserInfo', result);
                        }
                    })
                })
                .catch(error => {console.log(error.message)})
        },
        
        getUserPayment(context, clubId) {
            const clubPaymentRequest = {
                method: 'GET',
                requestURL: `/v1/club/${clubId}/payment`,
                headers: context.state.headers,
                stateTarget: [`club-${this.clubId}_content`, 'user_payment']
            }
            return context.dispatch('sendRequest', clubPaymentRequest)
                    // {
                    //     "id": null,
                    //     "accountId": null,
                    //     "paymentInfo": null,
                    //     "status": null,
                    //     "comment": null,
                    //     "requisiteDTO": null
                    // }
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
            let resultContent = data.content ? data.content : data;
            if (Array.isArray(resultContent)) {
                resultContent = resultContent.reduce(
                    (resultObject, currentLevel) => (
                        {...resultObject, [currentLevel.id]: currentLevel}), {}
                )
            }
            state[stateTarget[lastKeyIndex]] = resultContent;
        },
        
        setUserInfo(state, data) {
            state.thisUser.isLogged = data.isLogged;
            state.thisUser.id = data.id;
            state.thisUser.role = data.role;
            state.thisUser.email = data.email;
            state.thisUser.telegramNickname = data.telegramNickname;
            console.log('setUserInfo: ' + state.thisUser.email + ', ' + state.thisUser.role);
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
        getUserInfo(state) {
            return state.thisUser;
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