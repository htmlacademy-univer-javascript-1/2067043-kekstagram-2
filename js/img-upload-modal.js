import {isEscapeKey} from './util.js';

const form = document.querySelector('#upload-select-image');
const uploadInput = form.querySelector('#upload-file');
const formElement = form.querySelector('.img-upload__overlay');
const closeFormElement = form.querySelector('#upload-cancel');

const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

const onFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

function openForm () {
  formElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal_open');

  closeFormElement.addEventListener('click', closeForm);
  document.addEventListener('keydown', onFormEscKeydown);


}

function closeForm () {
  formElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal_open');

  uploadInput.value = '';
  hashtagInput.value = '';
  descriptionInput.value = '';
  // document.querySelector('.pristine-error').classList.add('hidden');

  closeFormElement.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', onFormEscKeydown);
}

uploadInput.addEventListener('change', () => {
  openForm();
});

hashtagInput.addEventListener('focus',
  document.removeEventListener('keydown', onFormEscKeydown)
);
hashtagInput.addEventListener('blur',
  document.addEventListener('keydown', onFormEscKeydown)
);

descriptionInput.addEventListener('focus',
  document.removeEventListener('keydown', onFormEscKeydown)
);
descriptionInput.addEventListener('blur',
  document.addEventListener('keydown', onFormEscKeydown)
);
