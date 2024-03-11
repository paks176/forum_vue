export default {
    install(Vue) {
        Vue.prototype.$definePaymentStatus = function(payment) {
            let result = {};
            switch (payment.status) {
                case 'NEW':
                    result.enterButtonShow = true;
                    result.enterButtonText = 'Ожидает оплаты';
                    result.enterMessage = 'Платеж создан, ожидает вашей оплаты';
                    result.buttonStatusClass = 'waitingForUser';
                    result.paymentsLinkStatus = 'active';
                    result.participation = false;
                    result.paymentId = payment.id;
                    break
                case 'CONFIRMED':
                    result.enterButtonShow = false;
                    result.enterButtonText = 'Платеж подтвержден';
                    result.enterMessage = 'Платеж подтвержден, вы участник складчины';
                    result.buttonStatusClass = 'succeed';
                    result.paymentsLinkStatus = 'active';
                    result.participation = true;
                    result.paymentId = payment.id;
                    break;
                case 'SEND':
                    result.enterButtonShow = false;
                    result.enterButtonText = 'Платеж отправлен';
                    result.enterMessage = 'Платеж отправлен, находится на проверке у модератора';
                    result.buttonStatusClass = 'waitingForCheck';
                    result.paymentsLinkStatus = '';
                    result.participation = false;
                    result.paymentId = payment.id;
                    break;
                default:
                    result.enterButtonShow = true;
                    result.enterButtonText = 'Вступить';
                    result.enterMessage = 'Нажмите, чтобы создать платеж для вступления';
                    result.buttonStatusClass = 'notCreated';
                    result.paymentsLinkStatus = 'active';
                    result.participation = false;
                    result.paymentId = 'none';
            }
            return result;
        }
    }
}