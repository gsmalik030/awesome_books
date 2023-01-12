/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const book = document.getElementsByClassName('books')[0];

class display {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') == null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = display.getBooks();
    let dp = '';
    books.forEach((book, i) => {
      dp += `
              <div class="allbooks">
              <p>"${book.title}" by ${book.author}</p>
              <button class="removeBtn" onclick="display.removeBook(${i})">Remove</button>
              </div>`;
    });
    book.innerHTML = dp;
  }

  static addBook() {
    const titleInput = document.querySelector('#title').value;
    const authorInput = document.querySelector('#author').value;
    if (titleInput !== '' && authorInput !== '') {
      const newBook = new Book(titleInput, authorInput);
      const books = display.getBooks();
      books.push(newBook);
      localStorage.setItem('books', JSON.stringify(books));
      this.displayBooks();
    }
  }

  static removeBook(id) {
    const books = display.getBooks();
    const bookIndex = books.findIndex((item, i) => i === id);
    books.splice(bookIndex, 1);
    localStorage.setItem('books', JSON.stringify(books));
    this.displayBooks();
  }
}
window.addEventListener('DOMContentLoaded', () => {
  display.displayBooks();
});
const form = document.querySelector('.form');
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  display.addBook();
  form.reset();
});