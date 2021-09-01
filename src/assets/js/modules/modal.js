import axios from 'axios';
import customSelect from 'custom-select';


class Modal {
  constructor(selectors) {
    this.tanksModal = document.querySelector('.modal_thanks');
    this.errorModal = document.querySelector('[data-modal-error]');
    this.closeBtns = document.querySelectorAll('[data-close]');
    this.forms = document.querySelectorAll('form');
    this.allModals = this.getModals(selectors);

    this.selectedForm = null;
    this.selectsContainer = document.querySelector('.modal-order__flavours');
    this.image = document.querySelector('.modal-order__item img');
    this.orderItem = document.querySelector('.modal-order__item');

    // binding:
    this.onOverlay = this.onOverlay.bind(this);
    this.onEsc = this.onEsc.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createForm = this.createForm.bind(this);

    // Open modal:
    selectors.forEach(item => {
      for (let btn of document.querySelectorAll(`[data-${item}]`)) {

        btn.addEventListener('click', () => {
          document.querySelector(`[data-modal-${item}]`).classList.add('open');
          const set = btn.getAttribute(`data-${item}`);

          // check if form the same to prevent selected items from clear up:
          (set) && (this.selectedForm !== set) && this.createForm(this.selectedForm = set);

          if (item === 'order') {
            // reset steps:
            const step1 = document.querySelectorAll('.modal-order__step1');
            const step2 = document.querySelectorAll('.modal-order__step2');
            step1.forEach(item => item.style = "");
            step2.forEach(item => item.style = "");
          }

          document.body.style.overflow = 'hidden';
        });
      }
    });

    this.closeBtns.forEach(item => item.addEventListener('click', this.closeModal));
    document.addEventListener('keydown', this.onEsc);
    this.allModals.forEach(item => item.addEventListener('click', this.onOverlay));
    this.forms.forEach(item => this.bindPostData(item));
  }

  onEsc(e) {
    (e.code === 'Escape') && this.closeModal();
  }

  onOverlay(e) {
    (!e.target.closest('.modal-container')) && this.closeModal();
  }

  getModals(selectors) {
    let items = [];
    selectors.forEach(item => {
      const element = document.querySelector(`[data-modal-${item}]`);
      element && items.push(element);
    });
    return items;
  }

  bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      form.reset();
      document.body.style.cursor = "wait";
      axios.post("./mail.php", formData)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.closeModal();
            this.tanksModal.classList.add('open');
          } else {
            this.closeModal();
            this.errorModal.classList.add('open');
          }
        })
        .catch(error => {
          this.closeModal();
          console.log(error);
          this.errorModal.classList.add('open');
        });
    });
  }

  closeModal() {
    document.body.style.overflow = '';
    document.body.style.cursor = "";
    this.allModals.forEach(item => (item) && item.classList.remove('open'));
  }

  createForm(set) {
    const count = set * 3;
    this.selectsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const select = document.createElement('select');
      select.name = `fruit head ${i+1}`;
      select.dataset.select = '';
      select.innerHTML = `
      <option value="not selected">Choose flavor for fruit head ${i+1}</option>
      <option value="Double Apple">Double Apple</option>
      <option value="Blueberry">Blueberry</option>
      <option value="Watermelon">Watermelon</option>
      <option value="Mint">Mint</option>
      <option value="Strawberry">Strawberry</option>
      <option value="Grape">Grape</option>
      <option value="Melon">Melon</option>
      <option value="Grapefruit">Grapefruit</option>
      <option value="Guava">Guava</option>
      <option value="Kiwi">Kiwi</option>
      <option value="Orange">Orange</option>`;
      this.selectsContainer.append(select);
    };

    this.orderItem.innerHTML = `
    <img src="./assets/images/package/package_${set}.webp" alt="item">
    <div>
    <b>${set} hookah <span class="accent">$${[75, 120, 160][set-1]}</span></b>
    <p>${count} tobacco filled fruit heads</p>
    </div>`;

    customSelect('[data-select]', {
      containerClass: 'custom-select-container-m',
      panelClass: 'custom-select-panel-m',
    });

    const selectContainer = document.querySelectorAll('.custom-select-container-m');

    selectContainer.forEach(function(item, i) {
      item.style = `z-index: ${selectContainer.length - i}`;

      const panel = item.querySelector('.custom-select-panel-m');
      const wrapper = document.createElement('div');
      wrapper.classList.add('custom-select-wrapper');

      const div = document.createElement('div');
      div.append(panel);
      wrapper.append(div);
      item.append(wrapper);
    });
  };
}

export default Modal;