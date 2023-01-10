class Awesome {
  books = [];

  add(title, author) {
    const book = {
      title,
      author,
      id: Math.round(Math.random() * 1000000000),
    };
    this.books.push(book);
    const allBooks = JSON.stringify(this.books);
    localStorage.setItem('books', allBooks);
  }

  remove(id) {
    this.books = this.books.filter((x) => x.id !== id);
    const allBooks = JSON.stringify(this.books);
    localStorage.setItem('books', allBooks);
  }

  stored() {
    this.books = JSON.parse(localStorage.getItem('books'));
  }
}

const addBook = new Awesome();

const bookDisplay = document.getElementById('book-display');
const form = document.getElementById('form');

function createBook() {
  if (addBook.books.length === 0) {
    const noBookheading = document.createElement('h2');
    const noBookText = document.createTextNode('Book List is empty');
    noBookheading.appendChild(noBookText);
    bookDisplay.append(noBookheading);
  } else {
    const bookUl = document.createElement('ul');
    bookUl.classList.add('book-ul');
    addBook.books.map((y) => {
      const bookLi = document.createElement('li');
      bookLi.classList.add('book-list');
      const titleHeading = document.createElement('h3');
      const titleTxt = document.createTextNode(`"${y.title}" By ${y.author}`);
      titleHeading.appendChild(titleTxt);
      bookLi.appendChild(titleHeading);
      const btnRemove = document.createElement('button');
      const btnTxt = document.createTextNode('Remove');
      btnRemove.onclick = function () {
        addBook.remove(y.id);
        location.reload();
      };
      btnRemove.appendChild(btnTxt);
      bookLi.appendChild(btnRemove);
      bookUl.appendChild(bookLi);

      return bookLi;
    });
    bookDisplay.appendChild(bookUl);
  }
}
function bookAdded() {
  const bookTitle = document.getElementById('book-title').value;
  const authorName = document.getElementById('author-name').value;
  addBook.add(bookTitle, authorName);
  location.reload();
}
addBook.stored();
createBook();
form.addEventListener('submit', bookAdded);
