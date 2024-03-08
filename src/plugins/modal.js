export default {
    install(Vue) {
        Vue.prototype.$modal = {
            class: class Modal {
                constructor(options) {
                    this.modalId = this.getModalId(Vue)
                    this.modalContent = options.content;
                    this.modalAction = options.action; //function
                    
                    window.closeModal = document.querySelector('#closeModal');
                    document.querySelector('#closeModal').addEventListener('click', Modal.hide);
                    
                    this.initModal(options);
                }
                
                initModal(options) {
                    const newModalLayout = `
                        <section class="page-modal" id="${this.modalId}">
                          <button class="user__button" id="closeModal" style="width: 30px; height: 30px; padding: 8px; border-radius: 7px">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.6496 7.00015L13.6579 1.99175C14.114 1.53559 14.114 0.798275 13.6579 0.342118C13.2017 -0.114039 12.4644 -0.114039 12.0083 0.342118L7 5.35051L1.99171 0.342118C1.53556 -0.114039 0.798258 -0.114039 0.342111 0.342118C-0.114037 0.798275 -0.114037 1.53559 0.342111 1.99175L5.3504 7.00015L0.342111 12.0085C-0.114037 12.4647 -0.114037 13.202 0.342111 13.6582C0.569601 13.8857 0.868255 14 1.16691 14C1.46556 14 1.76422 13.8857 1.99171 13.6582L7 8.64978L12.0083 13.6582C12.2358 13.8857 12.5344 14 12.8331 14C13.1317 14 13.4304 13.8857 13.6579 13.6582C14.114 13.202 14.114 12.4647 13.6579 12.0085L8.6496 7.00015Z" fill="#000000"/>
                              </svg>
                          </button>
                          <div class="page-modal__content">
                             ${this.modalContent}
                          </div>
                        </section>
                    `
                    
                    let backDrop;
                    
                    // eslint-disable-next-line no-prototype-builtins
                    if (!Vue.hasOwnProperty('$myModals')) {
                        backDrop = document.createElement('div');
                        backDrop.classList.add('page-backdrop');
                        document.body.insertAdjacentElement('beforeend', backDrop)
                    } else {
                        // find and insert in existing backdrop
                        backDrop = document.querySelector('.page-backdrop');
                    }
                    
                    Vue.$myModals[this.modalId] = new Vue.prototype.$modal.class(options);
                    
                    backDrop.innerHTML = newModalLayout;
                }
                
                getModalId(Vue) {
                    // eslint-disable-next-line no-prototype-builtins
                    if (Vue.hasOwnProperty('$myModals')) {
                        return 'modal_' + (Vue.$myModals.length + 1)
                    } else {
                        Vue.$myModals = {};
                        return 'modal_1';
                    }
                }
                
                static show() {
                    window.modalContentContainer.innerHTML = window.modalContent
                    window.backdrop.style.display = 'flex'
                    setTimeout(() => {
                        window.backdrop.style.opacity = '1'
                        setTimeout(() => {
                            window.modalWindow.style.display = 'flex'
                            setTimeout(() => {
                                window.modalWindow.style.opacity = '1'
                            }, 300)
                        }, 10)
                    }, 10)
                }

                static hide() {
                    window.modalWindow.style.opacity = '0'
                    setTimeout(() => {
                        window.modalWindow.style.display = 'none'
                        setTimeout(() => {
                            window.backdrop.style.opacity = '0'
                            setTimeout(() => {
                                window.backdrop.style.display = 'none'
                                window.modalContentContainer.innerHTML = ''
                            }, 300)
                        })
                    }, 300)
                }
            },
            
        }
    }
}