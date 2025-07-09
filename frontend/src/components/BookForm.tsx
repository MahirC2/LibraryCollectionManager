import React, { useState, useEffect } from "react";
import "./BookForm.css";

interface BookFormProps {
  onSubmit: (data: any) => void;
  buttonLabel: string;
  onCancel?: () => void;
  initialData?: any; 
}

const BookForm: React.FC<BookFormProps> = ({
  onSubmit,
  onCancel,
  buttonLabel,
  initialData, 
}) => {
  const [formData, setFormData] = useState({
    Title: "",
    Author: "",
    Genre: "",
    ISBN: "",
    PublishDate: "",
    Description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        Title: initialData.Title || "",
        Author: initialData.Author || "",
        Genre: initialData.Genre || "",
        ISBN: initialData.ISBN || "",
        PublishDate: initialData.PublishDate || "",
        Description: initialData.Description || "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => field === "")) {
      alert("All fields must be filled.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="Title"
        value={formData.Title}
        onChange={handleChange}
      />

      <label>Author:</label>
      <input
        type="text"
        name="Author"
        value={formData.Author}
        onChange={handleChange}
      />

      <label>Genre:</label>
      <input
        type="text"
        name="Genre"
        value={formData.Genre}
        onChange={handleChange}
      />

      <label>ISBN:</label>
      <input
        type="text"
        name="ISBN"
        value={formData.ISBN}
        onChange={handleChange}
      />

      <label>Publish Date:</label>
      <input
        type="date"
        name="PublishDate"
        value={formData.PublishDate}
        onChange={handleChange}
      />

      <label>Description:</label>
      <textarea
        name="Description"
        value={formData.Description}
        onChange={handleChange}
      />

      <button type="submit">{buttonLabel}</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default BookForm;
