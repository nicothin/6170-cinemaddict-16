import dayjs from 'dayjs';

// TODO[@nicothin]: убедиться, что я еще использую этот компонент

export const createComment = (data) => {
  const { id, author, comment, date, emotion } = data;

  const formattedDate = dayjs(date).format('YYYY/M/D H:mm');

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
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>
`.trim();
};
