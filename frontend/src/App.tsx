import React, { useState, useEffect } from "react";
import "./App.css";
import BookForm from "./components/BookForm.tsx";
import { bookService } from "./services/bookService.ts";

const App: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showJsonForm, setShowJsonForm] = useState(false); 
  const [books, setBooks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editBook, setEditBook] = useState<any>(null);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [jsonInput, setJsonInput] = useState<string>(""); 

  const fetchBooks = async () => {
    try {
      const fetchedBooks = await bookService.getAll();
      setBooks(fetchedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBooksFromJson = async () => {
    try {
      const booksToAdd = JSON.parse(jsonInput); 
      if (!Array.isArray(booksToAdd)) {
        alert("Invalid JSON: Must be an array of books.");
        return;
      }

      const addedBooks = await Promise.all(
        booksToAdd.map((book) => bookService.create(book))
      );

      setBooks((prevBooks) => [...prevBooks, ...addedBooks]);
      setShowJsonForm(false);
      setJsonInput(""); 
      alert("Books added successfully!");
    } catch (error) {
      console.error("Error adding books from JSON:", error);
      alert("Failed to add books. Ensure the JSON is valid.");
    }
  };

  const handleAddBook = async (newBook: any) => {
    try {
      const addedBook = await bookService.create(newBook);
      setBooks((prevBooks) => [...prevBooks, addedBook]);
      setShowAddForm(false);
      alert("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add the book.");
    }
  };

  const handleEditBook = async (updatedBook: any) => {
    try {
      const updatedData = await bookService.update(editBook.id, updatedBook);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editBook.id ? { ...book, ...updatedData } : book
        )
      );
      setShowEditForm(false);
      alert("Book updated successfully!");
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update the book.");
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await bookService.delete(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      alert("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete the book.");
    }
  };

  const filteredBooks = books.filter((book) =>
    Object.values(book)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1 className="header-title">Library Collection Manager</h1>

      <div className="card">
        <input
          type="text"
          placeholder="Search for books by Title, Genre, ISBN, Description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <h2 className="your-books-title">Your Books</h2>
        <div className="add-book-container">
          <button className="add-book-btn" onClick={() => setShowAddForm(true)}>
            Add Book
          </button>
        </div>
        <div className="book-list">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-card" onClick={() => setSelectedBook(book)}>
              <h3>{book.Title}</h3>
              <p>Author: {book.Author}</p>
              <p>Genre: {book.Genre}</p>
              <div className="card-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditBook(book);
                    setShowEditForm(true);
                  }}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBook(book.id);
                  }}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddForm(false)}>
              &times;
            </span>
            <BookForm
              onSubmit={(newBook) => {
                bookService.create(newBook).then((addedBook) =>
                  setBooks((prevBooks) => [...prevBooks, addedBook])
                );
                setShowAddForm(false);
              }}
              buttonLabel="Add Book"
              onCancel={() => setShowAddForm(false)}
            />
            <button
              className="add-json-btn"
              onClick={() => {
                setShowAddForm(false);
                setShowJsonForm(true);
              }}
            >
              Add JSON
            </button>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditForm(false)}>
              &times;
            </span>
            <BookForm
              onSubmit={handleEditBook}
              initialData={editBook}
              buttonLabel="Save Changes"
              onCancel={() => setShowEditForm(false)}
            />
          </div>
        </div>
      )}

      {showJsonForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowJsonForm(false)}>
              &times;
            </span>
            <h2>Add Books via JSON</h2>
            <textarea
              placeholder="Paste your JSON here"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="json-input"
            />
            <button onClick={handleAddBooksFromJson} className="submit-json-btn">
              Submit
            </button>
            <button onClick={() => setShowJsonForm(false)} className="cancel-json-btn">
              Cancel
            </button>
          </div>
        </div>
      )}

      {selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedBook(null)}>
              &times;
            </span>
            <p>
              <h3>{selectedBook.Title}</h3>
              <br></br>
              <h2>Author: {selectedBook.Author}</h2>
              <br></br>
              <h2>Genre: {selectedBook.Genre}</h2>
              <br></br>
              <h2>ISBN: {selectedBook.ISBN}</h2>
              <br></br>
              <h2>Publish Date: {new Date(selectedBook.PublishDate).toLocaleDateString()}</h2>
              <br></br>
              <h2>Description: {selectedBook.Description}</h2>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
