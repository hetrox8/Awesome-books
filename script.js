  // Retrieve book collection from localStorage or create a new empty array
  var books = JSON.parse(localStorage.getItem("books")) || [];

  // Function to render the book list on the page
  function renderBookList() {
    var bookList = document.getElementById("bookList");
    bookList.innerHTML = ""; // Clear the existing list

    var reversedBooks = books.slice().reverse(); // Create a reversed copy of the books array

    reversedBooks.forEach(function(book) {
      var listItem = document.createElement("li");
      listItem.textContent = book.title + " by " + book.author;

      var removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", function() {
        removeBook(book);
      });

      listItem.appendChild(removeButton);
      bookList.appendChild(listItem);
    });
  }

  // Function to add a new book to the collection
  function addBook(title, author) {
    var newBook = { title: title, author: author };
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    renderBookList();
  }

  // Function to remove a book from the collection
  function removeBook(book) {
    books = books.filter(function(b) {
      return b !== book;
    });
    localStorage.setItem("books", JSON.stringify(books));
    renderBookList();
  }

  // Event listener for the addForm submit event
  var addForm = document.getElementById("addForm");
  addForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var titleInput = document.getElementById("titleInput");
    var authorInput = document.getElementById("authorInput");
    var title = titleInput.value;
    var author = authorInput.value;
    addBook(title, author);
    titleInput.value = "";
    authorInput.value = "";
  });

  // Initial rendering of the book list
  renderBookList();