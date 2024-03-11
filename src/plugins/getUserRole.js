export default {
    install(Vue) {
        Vue.prototype.$getUserRole = function(role) {
            switch (role) {
                case 'PARTNER':
                    return {
                        text: 'Партнер',
                        color: '#c99f13'
                    }
                case 'ADMIN':
                    return {
                        text: 'Администратор',
                        color: 'rgb(200 80 72)'
                    }
                case 'USER':
                    return {
                        text: 'Пользователь',
                        color: 'rgb(0 110 169)'
                    }
            }
        }
    }
}