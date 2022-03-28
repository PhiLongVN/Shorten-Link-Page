/* ============================================ */
/*                    TOGGLE                    */
/* ============================================ */
const toggle = document.querySelector('.head-toggle');
const head = document.querySelector('.head');

toggle.onclick = () => {
  head.classList.toggle('active');
};

window.onscroll = () => {
  head.classList.remove('active');
};

/* ============================================ */
/*                 SHORTEN LINK                 */
/* ============================================ */

const URLShortenLink = 'https://api.shrtco.de/v2/shorten?url=';
const submitLink = document.querySelector('.shorten');
const tableLink = document.querySelector('.sec2-tableLink');
const linkValue = document.querySelector('.link');
let a;

submitLink.addEventListener('click', handleShortenLink);

function handleShortenLink(e) {
  let target = e.target;
  a = linkValue.value;

  e.preventDefault();
  if (a === '') {
    target.parentNode.classList.add('active');
  } else {
    target.parentNode.classList.remove('active');
    ShortenLink(a);
  }
}

function ShortenLink(link) {
  fetch(URLShortenLink + link)
    .then((res) => res.json())
    .then((data) => {
      let short = data.result.short_link;
      createBlock(short, a);
    });
}

function createBlock(short, full) {
  let block;

  block = ` <div class="link-block">
  <a  href="${full}" class="link-name">
  ${full}</a
>
<a  href="${short}" class="link-short">
${short}</a
>
  <button class="copy">copy</button>
</div>`;

  tableLink.insertAdjacentHTML('afterbegin', block);

  const copyBtn = document.querySelectorAll('.copy');
  copyBtn.forEach((element) => {
    element.addEventListener('click', copyLink);
  });
}

/* ============================================ */
/*                     COPY                     */
/* ============================================ */

function copyLink(e) {
  let shortLink = e.target.parentNode.querySelector('.link-short').innerText;

  if (!e.target.classList.contains('active')) {
    deleteAllCopy();
    e.target.innerText = 'copied';
    e.target.style.background = '#5b6464';

    copyText(shortLink);
  }
}

// deletecopy
function deleteAllCopy() {
  const copyBtn = document.querySelectorAll('.copy');

  copyBtn.forEach((ele) => {
    ele.innerText = 'copy';
    ele.style.background = '#2bd1d1';
  });
}

// copytext
function copyText(shortLink) {
  const inputElement = document.createElement('input');
  inputElement.setAttribute('value', shortLink);
  document.body.appendChild(inputElement);
  inputElement.select();
  navigator.clipboard.writeText(inputElement.value);
  inputElement.parentNode.removeChild(inputElement);
}
