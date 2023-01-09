class Awesome {
  books = [];

  add(title, author) {
    let book = {
      title,
      author,
      isbn: Date.now(),
    };
    this.books.unshift(book);
    const allBooks = JSON.stringify(this.books);
    localStorage.setItem("books", allBooks);
  }

  remove(isbn) {
    this.books = this.books = this.books.filter((x) => x.isbn !== isbn);
    const allBooks = JSON.stringify(this.books);
    localStorage.setItem("books", allBooks);
  }
}

let book1 = new Awesome();

console.log(book1.books);


