export default {
    install(Vue) {
        Vue.prototype.$modal = {
            class: class Modal {
                constructor(options) {
                    this.status = 'closed';
                    this.modalId = this.getModalId(Vue)
                    this.modalContent = options.content;
                    this.argument = options.action.argument;
                }

                hide(instance) {
                    return new Promise((resolve) => {
                        instance.element.style.opacity = '0';
                        setTimeout(() => {
                            instance.element.style.display = 'none';
                            instance.status = 'closed';
                            instance.element.classList.remove('opened');
                            instance.element.classList.add('closed');
                            if (Object.keys(Vue.$myModals).length > 0) {
                                let openedModals = 0;
                                for (let key in Vue.$myModals) {
                                    if (Vue.$myModals[key].status === 'opened') {
                                        openedModals += 1;
                                    }
                                }
                                if (openedModals === 0) {
                                    instance.backDrop.style.opacity = '0';
                                    setTimeout(() => {
                                        instance.backDrop.style.display = 'none';
                                    }, 300)
                                }
                            }
                            resolve();
                        }, 350)
                    })
                }

                show(instance) {
                    function executeShow(instance) {
                        instance.status = 'opened'
                        instance.backDrop.style.display = 'flex';
                        setTimeout(() => {
                            instance.backDrop.style.opacity = '1';
                            instance.element.style.display = 'flex';
                            instance.element.classList.add('opened');
                            instance.element.classList.remove('closed');
                            instance.element.style.opacity = '1';
                        }, 350)

                    }

                    for (let key in Vue.$myModals) {
                        if (Vue.$myModals[key].status === 'opened' && key !== instance.modalId) {
                            Vue.$myModals[key].hide(Vue.$myModals[key])
                                .then(() => {
                                    executeShow(instance)
                                });
                        } else executeShow(instance)
                    }
                }

                getModalId(Vue) {
                    // eslint-disable-next-line no-prototype-builtins
                    if (Vue.hasOwnProperty('$myModals')) {
                        return 'modal_' + (Object.keys(Vue.$myModals).length + 1)
                    } else {
                        Vue.$myModals = {};
                        let backDrop = document.createElement('div');
                        backDrop.classList.add('page-backdrop');
                        document.body.insertAdjacentElement('beforeend', backDrop);
                        return 'modal_1';
                    }
                }
            },

            initModal(options) {
                // find existing modal
                const existingModal = findExistingModal();

                function findExistingModal() {
                    let id = undefined;
                    for (let key in Vue.$myModals) {
                        if (Vue.$myModals[key].modalContent === options.content) {
                            id = Vue.$myModals[key].modalId;
                        }
                    }
                    return id;
                }

                // eslint-disable-next-line no-prototype-builtins
                if (Vue.hasOwnProperty('$myModals') && existingModal) {
                    const instance = Vue.$myModals[existingModal];
                    instance.show(instance);
                } else {
                    // create new modal
                    const newModal = new Vue.prototype.$modal.class(options);

                    Vue.$myModals[newModal.modalId] = newModal;

                    const newModalLayout = `
                        <section class="page-modal" id="${newModal.modalId}">
                        
                          <button class="user__button close-modal-button" style="width: 30px; height: 30px; padding: 8px; border-radius: 7px">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.6496 7.00015L13.6579 1.99175C14.114 1.53559 14.114 0.798275 13.6579 0.342118C13.2017 -0.114039 12.4644 -0.114039 12.0083 0.342118L7 5.35051L1.99171 0.342118C1.53556 -0.114039 0.798258 -0.114039 0.342111 0.342118C-0.114037 0.798275 -0.114037 1.53559 0.342111 1.99175L5.3504 7.00015L0.342111 12.0085C-0.114037 12.4647 -0.114037 13.202 0.342111 13.6582C0.569601 13.8857 0.868255 14 1.16691 14C1.46556 14 1.76422 13.8857 1.99171 13.6582L7 8.64978L12.0083 13.6582C12.2358 13.8857 12.5344 14 12.8331 14C13.1317 14 13.4304 13.8857 13.6579 13.6582C14.114 13.202 14.114 12.4647 13.6579 12.0085L8.6496 7.00015Z" fill="#000000"/>
                              </svg>
                          </button>
                          
                          <div class="page-modal__content">
                             ${newModal.modalContent}
                          </div>
                          
                          <div class="page-modal__buttons">
                          
                            <button class="status-button action-button" style="display: ${options?.action.display}; width: auto">
                            ${options?.action.buttonText} 
                          </button>
                          
                            <button class="user__button close-modal-button">Отмена</button>
                          
                          </div>
                          
                        </section>
                    `;

                    let backDrop = document.querySelector('.page-backdrop');
                    backDrop.insertAdjacentHTML('beforeend', newModalLayout);

                    const newModalElement = document.querySelector(`#${newModal.modalId}`);

                    const instance = Vue.$myModals[newModal.modalId];

                    if (newModalElement) {
                        instance.element = newModalElement;
                        instance.backDrop = backDrop;
                        const closeButtons = newModalElement.querySelectorAll('.close-modal-button');
                        closeButtons.forEach(button => {
                            button.addEventListener('click', () => {
                                instance.hide(instance)
                            })
                        })
                        if (options.action.function !== undefined) {
                            newModalElement.querySelector('.action-button').addEventListener('click', () => {
                                options.action.function(instance.argument);
                                instance.hide(instance);
                            })
                        }
                        instance.show(instance)
                    }
                }
            },
        }
    }
}