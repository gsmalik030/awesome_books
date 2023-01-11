const addButton = document.getElementsByClassName('add-btn')[0];
const addedSection = document.getElementsByClassName('books')[0];
let books;

function display() {
  if (localStorage.getItem('Books') == null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('Books'));
  }

  let displayed = '';
  books.forEach((addedSection, i) => {
    displayed += `
        <div>
        <p>${addedSection.title}</p>
        <p>${addedSection.author}</p>
        <button onclick="removeBook(${i})">Remove</button>
        <hr />
        </div>
        `;
  });
  addedSection.innerHTML = displayed;
}

const addBooks = (Title, Author) => {
  if (Title !== '' && Author !== '') {
    const obj = {
      title: Title,
      author: Author,
    };
    books.push(obj);
    localStorage.setItem('Books', JSON.stringify(books));
  }
};

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  addBooks(title, author);
  display();
});

window.addEventListener('DOMContentLoaded', () => {
  display();
});

// eslint-disable-next-line no-unused-vars
const removeBook = (id) => {
  if (localStorage.getItem('Books') == null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('Books'));
  }
  const bookIndex = books.findIndex((item, i) => i === id);
  books.splice(bookIndex, 1);
  localStorage.setItem('Books', JSON.stringify(books));
  display();
};
