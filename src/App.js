import React, { useState } from "react";
import BookList from "./components/BookList";
import "./styles.css";

const App = () => {
    const [books, setBooks] = useState([
        {
            id: 1,
            title: "How to sleep a full day",
            author: "Banavathu Vamsi Nayak",
            reviews: [],
        },
        {
            id: 2,
            title: "Reading is my passion",
            author: "Harsha",
            reviews: [],
        },
        {
            id: 3,
            title: "Importance of time",
            author: "Gopal",
            reviews: [],
        },
    ]);

    const [newBook, setNewBook] = useState({ title: "", author: "" });

    // Function to add a review to a specific book
    const addReview = (bookId, newReviews) => {
        setBooks((prevBooks) =>
            prevBooks.map((book) =>
                book.id === bookId
                    ? { ...book, reviews: Array.isArray(newReviews) ? newReviews : [...book.reviews, newReviews] }
                    : book
            )
        );
    };
    
    // Function to add a new book
    const addBook = () => {
        if (newBook.title.trim() && newBook.author.trim()) {
            setBooks((prevBooks) => [
                ...prevBooks,
                {
                    id: prevBooks.length + 1,
                    title: newBook.title,
                    author: newBook.author,
                    reviews: [],
                },
            ]);
            setNewBook({ title: "", author: "" }); // Clear input fields
        }
    };

    // Function to delete a book
    const deleteBook = (bookId) => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    };

    // Function to update a book
    const updateBook = (bookId, updatedDetails) => {
        setBooks((prevBooks) =>
            prevBooks.map((book) =>
                book.id === bookId ? { ...book, ...updatedDetails } : book
            )
        );
    };

    return (
        <div className="container">
            <h1>
                <center>Book Review App</center>
            </h1>
            <div className="add-book-section">
                <h3>Add a New Book</h3>
                <input
                    type="text"
                    placeholder="Book Title"
                    value={newBook.title}
                    onChange={(e) =>
                        setNewBook((prev) => ({ ...prev, title: e.target.value }))
                    }
                />
                <input
                    type="text"
                    placeholder="Author Name"
                    value={newBook.author}
                    onChange={(e) =>
                        setNewBook((prev) => ({ ...prev, author: e.target.value }))
                    }
                />
                <button onClick={addBook}>Add Book</button>
            </div>
            <BookList
                books={books}
                addReview={addReview}
                deleteBook={deleteBook}
                updateBook={updateBook}
            />
        </div>
    );
};

export default App;
