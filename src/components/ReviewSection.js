import React, { useState } from "react";

const ReviewSection = ({ book, addReview }) => {
    const [reviewText, setReviewText] = useState("");
    const [editingReviewIndex, setEditingReviewIndex] = useState(null);
    const [updatedReviewText, setUpdatedReviewText] = useState("");

    const handleAddReview = () => {
        if (reviewText.trim()) {
            addReview(book.id, reviewText);
            setReviewText(""); // Clear the input field
        }
    };

    const handleDeleteReview = (index) => {
        const updatedReviews = book.reviews.filter((_, i) => i !== index);
        addReview(book.id, updatedReviews);
    };

    const handleEditReview = (index) => {
        setEditingReviewIndex(index);
        setUpdatedReviewText(book.reviews[index]);
    };

    const handleSaveReview = (index) => {
        const updatedReviews = book.reviews.map((review, i) =>
            i === index ? updatedReviewText : review
        );
        addReview(book.id, updatedReviews);
        setEditingReviewIndex(null); // Exit editing mode
        setUpdatedReviewText(""); // Clear the input field
    };

    return (
        <div className="review-section">
            <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
            ></textarea>
            <button onClick={handleAddReview}>Add Review</button>
            <div>
                <strong>Reviews:</strong>
                <ul>
                    {book.reviews.map((review, index) => (
                        <li key={index}>
                            {editingReviewIndex === index ? (
                                <div>
                                    <textarea
                                        value={updatedReviewText}
                                        onChange={(e) => setUpdatedReviewText(e.target.value)}
                                    ></textarea>
                                    <button onClick={() => handleSaveReview(index)}>Save</button>
                                    <button onClick={() => setEditingReviewIndex(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    {review}
                                    <button onClick={() => handleEditReview(index)}>Edit</button>
                                    <button onClick={() => handleDeleteReview(index)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ReviewSection;
