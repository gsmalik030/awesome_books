<<<<<<< HEAD
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
=======
const storageKey = 'awesomeBooks';
const currentFormTitle = document.querySelector('#title');
const currentFormAuthor = document.querySelector('#author');
const currentFormBookAddButton = document.querySelector('#book-add-button');
const linkAdd = document.querySelector('#link-add');
const linkList = document.querySelector('#link-list');
const linkContact = document.querySelector('#link-contact');
const books = document.querySelector('.book-shelf');
const form = document.querySelector('.form');
const contact = document.querySelector('.contact');
const dateTime = document.querySelector('.date-time');
const timeNow = new Date();

class BookShelf {
  constructor() {
    this.arrBooks = [];
  }

  addBook(newTitle, newAuthor) {
    const newBook = {
      id: timeNow.getTime(),
      title: newTitle,
      author: newAuthor,
    };

    this.arrBooks.push(newBook);
  }

  removeBook(id) {
    this.arrBooks = this.arrBooks.filter((book) => book.id !== id);
  }

  saveDataToLocalStorage() {
    localStorage.setItem(storageKey, JSON.stringify(this.arrBooks));
  }

  showBooks() {
    function addElement(elementType, parent, className) {
      const element = document.createElement(elementType);
      element.classList.add(className);
      parent.appendChild(element);
      return element;
    }

    const bookList = document.querySelector('.book-list');
    this.arrBooks.forEach((book) => {
      const bookItem = addElement('div', bookList, 'book-item');
      const bookTitle = addElement('div', bookItem, 'book-title');
      bookTitle.innerHTML = `" ${book.title} "    by ${book.author}`;

      const bookRemoveButton = addElement(
        'button',
        bookItem,
        'book-remove-button',
      );
      bookRemoveButton.innerHTML = 'Remove';

      bookRemoveButton.addEventListener('click', () => {
        this.removeBook(book.id);
        this.saveDataToLocalStorage();
        window.location.reload();
      });
    });
  }

  loadDataFromLocalStorage() {
    const dataLoaded = JSON.parse(localStorage.getItem(storageKey));
    if (dataLoaded == null) {
      this.arrBooks = [];
    } else {
      this.arrBooks = dataLoaded;
    }

    this.showBooks();
  }
}

const awesomeBookShelf = new BookShelf();

currentFormBookAddButton.addEventListener('click', () => {
  const title = currentFormTitle.value;
  const author = currentFormAuthor.value;
  awesomeBookShelf.addBook(title, author);
  awesomeBookShelf.saveDataToLocalStorage();
});

linkList.addEventListener('click', () => {
  books.classList.remove('hide');
  form.classList.add('hide');
  contact.classList.add('hide');
});

linkAdd.addEventListener('click', () => {
  books.classList.add('hide');
  form.classList.remove('hide');
  contact.classList.add('hide');
});

linkContact.addEventListener('click', () => {
  books.classList.add('hide');
  form.classList.add('hide');
  contact.classList.remove('hide');
});

window.onload = () => {
  books.classList.remove('hide');
  form.classList.add('hide');
  contact.classList.add('hide');
  awesomeBookShelf.loadDataFromLocalStorage();
  dateTime.innerHTML = timeNow;
};
>>>>>>> b29c24c2d9b85c4f81001d2132e3368081ea9b08
