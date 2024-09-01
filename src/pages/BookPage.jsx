import React, { useState } from "react";
import { useAuth } from "../auth/useAuth";

const BookPage = () => {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);

    const handleSearch = async () => {
        const results = await searchBooks(searchQuery);
        setBooks(results);
    };

    const handleBorrow = async (bookId) => {
        const success = await borrowBook(bookId, user.email);
        if (success) {
            setBorrowedBooks([...borrowedBooks, bookId]);
            setBooks(
                books.map((book) =>
                    book.id === bookId ? { ...book, available: false } : book
                )
            );
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Search and Borrow Books</h2>
            <div className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or author"
                    className="border p-2 w-full rounded"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                >
                    Search
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.map((book) => (
                    <div key={book.id} className="border p-4 rounded shadow">
                        <h3 className="font-bold text-lg">{book.title}</h3>
                        <p>{book.author}</p>
                        <p>{book.available ? "Available" : "Unavailable"}</p>
                        {book.available && !borrowedBooks.includes(book.id) && (
                            <button
                                onClick={() => handleBorrow(book.id)}
                                className="bg-green-500 text-white py-2 px-4 rounded mt-2"
                            >
                                Borrow
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const searchBooks = async (query) => {
    // Replace with actual search logic
    return [
        { id: 1, title: "Book 1", author: "Author 1", available: true },
        { id: 2, title: "Book 2", author: "Author 2", available: false },
        { id: 3, title: "Book 3", author: "Author 3", available: true },
    ];
};

const borrowBook = async (bookId, userEmail) => {
    // Replace with actual borrow logic
    return true;
};

export default BookPage;
