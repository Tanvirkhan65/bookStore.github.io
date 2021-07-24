class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addbooks(book) {
    let books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static displayBooks() {
    let books = Store.getBooks();
    books.forEach((book) => {
      UI.addBook(book);
    });
  }
  static removeBook(isbn) {
    let books = Store.getBooks();
    books.forEach((book,index)=>{
      if(book.isbn === isbn){
        books.splice(index,1)
      }
    })
    
    localStorage.setItem("books", JSON.stringify(books));
  }
}

class UI {
  static addBook(book) {
    let bookList = document.querySelector("#book-list");
    let row = document.createElement("tr");
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;
    bookList.appendChild(row);
  }
  static clearField() {
    document.querySelector("#title").value="";
    document.querySelector("#author").value="";
    document.querySelector("#isbn").value="";
  }
  static showAlert(message, classNames) {
    let div = document.createElement("div");
    div.className = `alert ${classNames}`;
    div.appendChild(document.createTextNode(message));
    let container = document.querySelector(".container");
    let form = document.querySelector("#bookForm");
    container.insertBefore(div, form);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  static deleteBook(target) {
    if (target.hasAttribute("href")) {
      if (confirm("Are you sure you?")) {
        let link = target.parentElement.parentElement;
        link.remove();
        UI.showAlert("book deleted", "success");
        Store.removeBook(target.parentElement.previousElementSibling.textContent.trim())
        
        
      }
    }
  }
}

let form = document.querySelector("#bookForm");
let bookList = document.querySelector("#book-list");
document.addEventListener("DOMContentLoaded", Store.displayBooks());

form.addEventListener("submit", newBook);
bookList.addEventListener("click", removeBook);

function newBook(e) {
  e.preventDefault();
  let title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value=;
  let book = new Book(title, author, isbn);

  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("please fill all the field", "error");
  } else {
    let book = new Book(title, author, isbn);
    UI.addBook(book);
    UI.clearField();
    UI.showAlert("book added", "success");
    Store.addbooks(book);
  }
}

function removeBook(e) {
  e.preventDefault();
  UI.deleteBook(e.target);
}
