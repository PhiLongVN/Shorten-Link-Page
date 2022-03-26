/* ============================================ */
/*                    TOGGLE                    */
/* ============================================ */
const toggle = document.querySelector('.head-toggle');
const head = document.querySelector('.head');

toggle.onclick = () => {
  head.classList.toggle('active');
};

/* ============================================ */
/*                 SHORTEN LINK                 */
/* ============================================ */

const URLShortenLink = 'https://api.shrtco.de/v2/shorten?url=';

const submitLink = document.querySelector('.shorten');
const tableLink = document.querySelector('.sec2-tableLink');
const copyBtn = document.querySelector('.copy');
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
  console.log('URLShortenLink + link');
  fetch(URLShortenLink + link)
    .then((res) => res.json())
    .then((data) => {
      let short = data.result.short_link;
      createBlock(short, a);
    });
}

function createBlock(short, full) {
  console.log('createBlock -> full', full);
  let block;

  block = ` <div class="link-block">
  <a  href="${full}" class="link-name">
  ${full}</a
>
<a  href="${short}" class="link-name">
${short}</a
>
  <button class="copy">copy</button>
</div>`;

  tableLink.insertAdjacentHTML('beforeend', block);
}
