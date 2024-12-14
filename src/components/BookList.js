import React, { useState } from "react";
import ReviewSection from "./ReviewSection";

const BookList = ({ books, addReview, deleteBook, updateBook }) => {
    const [editingBookId, setEditingBookId] = useState(null);
    const [updatedDetails, setUpdatedDetails] = useState({ title: "", author: "" });

    const handleUpdate = (bookId) => {
        updateBook(bookId, updatedDetails);
        setEditingBookId(null); // Exit editing mode
        setUpdatedDetails({ title: "", author: "" }); // Clear inputs
    };

    return (
        <div>
            {books.map((book) => (
                <div className="book-card" key={book.id}>
                    {editingBookId === book.id ? (
                        <div>
                            <input
                                type="text"
                                placeholder="Updated Title"
                                value={updatedDetails.title}
                                onChange={(e) =>
                                    setUpdatedDetails((prev) => ({ ...prev, title: e.target.value }))
                                }
                            />
                            <input
                                type="text"
                                placeholder="Updated Author"
                                value={updatedDetails.author}
                                onChange={(e) =>
                                    setUpdatedDetails((prev) => ({ ...prev, author: e.target.value }))
                                }
                            />
                            <button onClick={() => handleUpdate(book.id)}>Save</button>
                            <button onClick={() => setEditingBookId(null)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <div className="book-title"><center>{book.title}</center></div>
                            <div>Author: {book.author}</div>
                            <button onClick={() => deleteBook(book.id)}>Delete</button>
                            <button onClick={() => setEditingBookId(book.id)}>Edit</button>
                        </div>
                    )}
                    <ReviewSection book={book} addReview={addReview} />
                </div>
            ))}
        </div>
    );
};

export default BookList;
