import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { EMOTIONS } from '../../constants';

dayjs.extend(relativeTime);

export const createComments = (data) => {
  const { list, isLoading } = data;

  const title = `<h3 class="film-details__comments-title">${!isLoading ? `Comments <span class="film-details__comments-count">${list.length}</span>` : 'Loading comments...'}</h3>`;

  const comments = list.map((item) => {
    const { id, author, comment, date, emotion } = item;

    const formattedDate = dayjs(date).fromNow();

    return `
      <li class="film-details__comment" data-comment-id="${id}">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${formattedDate}</span>
            <button class="film-details__comment-delete" data-request-text="Deleting..." data-default-text="Delete">Delete</button>
          </p>
        </div>
      </li>
    `.trim();
  }).join(' ');

  const emotionsList = EMOTIONS.map((emotion) => `
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
  <label class="film-details__emoji-label" for="emoji-${emotion}">
    <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
  </label>
`).join(' ');

  const realForm = !isLoading ? `
    <form class="film-details__new-comment" action="" method="get">
      <fieldset class="film-details__new-comment-inner">
        <div class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          ${emotionsList}
        </div>
      </fieldset>
    </form>`.trim() :
    '';

  return `
    <section class="film-details__comments-wrap">
      ${title}

      <ul class="film-details__comments-list">
        ${comments}
      </ul>

      ${realForm}
    </section>
`.trim();
};
