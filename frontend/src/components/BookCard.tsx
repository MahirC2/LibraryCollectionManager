import React from "react";

interface BookCardProps {
  book: any; 
  onEdit: () => void;
  onDelete: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  return (
    <div className="book-card">
      <h3>{book.Title}</h3>
      <p>Author: {book.Author}</p>
      <p>Genre: {book.Genre}</p>
      <div className="card-actions">
        <button onClick={onEdit} className="edit-btn">
          Edit
        </button>
        <button onClick={onDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
