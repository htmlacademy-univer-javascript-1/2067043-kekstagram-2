import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentList = bigPicture.querySelector('.social__comments');
const commentsListFragment = document.createDocumentFragment();
const commentTemplate = document.querySelector('#social__comment')
  .content
  .querySelector('.social__comment');

const closeBigPictureElement= document.querySelector('.big-picture__cancel');

const onBigPictureEscKeyDown =(evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onCloseBigPictureClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

// const showCommentList = (comments) => {
//   comments.forEach((comment) => {
//     const commentElement = commentTemplate.cloneNode(true);
//     commentElement.querySelector('.social-picture').src = comment.avatar;
//     commentElement.querySelector('.social__text').textContent = comment.message;

//     commentsListFragment.appendChild(commentElement);
//   });

//   commentList.appendChild(commentsListFragment);
// };

// function openBigPicture (photo) {
//   console.log('click');
//   const img = bigPicture.querySelector('.big-picture__img').lastElementChild;

//   img.src = photo.url;
//   img.setAttribute('alt', 'Фото пользователя');

//   bigPicture.querySelector('.social__caption').textContent = photo.description;
//   bigPicture.querySelector('.likes-count').textContent = photo.likes;
//   bigPicture.querySelector('.comments-count').textContent = photo.comments.length.toString();

//   //Счетчик комментариев и кнопка "Загрузить больше" временно скрыты
//   bigPicture.querySelector('.social__comment-count').classList.add('hidden');
//   bigPicture.querySelector('.comments-loader').classList.add('hidden');

//   closeBigPictureElement.addEventListener('click', onCloseBigPictureClick);
//   document.addEventListener('keydown', onBigPictureEscKeyDown);

//   showCommentList(photo.comments);
//   bigPicture.classList.remove('hidden');
//   document.body.classList.add('modal-open');
// }

const openBigPicture = (pictureData) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictureData.url;
  bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
  bigPicture.querySelector('.comments-count').textContent = pictureData.comments.length.toString();
  bigPicture.querySelector('.social__caption').textContent = pictureData.description;

  const commentsList = bigPicture.querySelector('.social__comments');
  pictureData.comments.forEach((commentData) => {
    commentsList.insertAdjacentHTML('beforeend', `
    <li class="social__comment">
        <img
            class="social__picture"
            src="${commentData.avatar}"
            alt="${commentData.name}"
            width="35" height="35">
        <p class="social__text">${commentData.message}</p>
    </li>`);
  });

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeBigPictureElement.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onBigPictureEscKeyDown);
};

function closeBigPicture() {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentList.innerHTML = '';

  closeBigPictureElement.removeEventListener('click', onCloseBigPictureClick);
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
}

export {openBigPicture};
