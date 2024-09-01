import React, { useState, useEffect } from "react";
import axios from "../axios"; // Adjust the import path if necessary
import NavBar from "../components/NavBar";

const BookPage = () => {
    const [books, setBooks] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [view, setView] = useState("available"); // 'available' or 'borrowed'
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            const availableBooks = await searchBooks();
            const userBorrowedBooks = await getBorrowedBooks();
            setBooks(availableBooks);
            setBorrowedBooks(userBorrowedBooks);
        };
        fetchBooks();
    }, []);

    const handleBorrow = async (bookId) => {
        const success = await borrowBook(bookId);
        if (success) {
            const updatedBooks = books.map((book) =>
                book.id === bookId ? { ...book, available: false } : book
            );
            setBooks(updatedBooks);
            setBorrowedBooks([
                ...borrowedBooks,
                books.find((book) => book.id === bookId),
            ]);
        }
    };

    const handleUnborrow = async (bookId) => {
        const success = await unborrowBook(bookId);
        if (success) {
            const updatedBorrowedBooks = borrowedBooks.filter(
                (book) => book.id !== bookId
            );
            setBorrowedBooks(updatedBorrowedBooks);
            const updatedBooks = books.map((book) =>
                book.id === bookId ? { ...book, available: true } : book
            );
            setBooks(updatedBooks);
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <NavBar />
            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        {view === "available"
                            ? "Available Books"
                            : "Borrowed Books"}
                    </h2>

                    <div className="flex justify-between mb-4">
                        <button
                            onClick={() => setView("available")}
                            className={`py-2 px-4 rounded ${
                                view === "available"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            Available Books
                        </button>
                        <button
                            onClick={() => setView("borrowed")}
                            className={`py-2 px-4 rounded ${
                                view === "borrowed"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            Borrowed Books
                        </button>
                    </div>

                    {view === "available" && (
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search books..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    )}

                    {view === "available" && (
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border">Title</th>
                                    <th className="py-2 px-4 border">Author</th>
                                    <th className="py-2 px-4 border">
                                        Availability
                                    </th>
                                    <th className="py-2 px-4 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks.map(
                                    (book) =>
                                        book.available && (
                                            <tr
                                                key={book.id}
                                                className="border-b"
                                            >
                                                <td className="py-2 px-4 border">
                                                    {book.title}
                                                </td>
                                                <td className="py-2 px-4 border">
                                                    {book.author}
                                                </td>
                                                <td className="py-2 px-4 border">
                                                    {book.available
                                                        ? "Available"
                                                        : "Unavailable"}
                                                </td>
                                                <td className="py-2 px-4 border">
                                                    <button
                                                        onClick={() =>
                                                            handleBorrow(
                                                                book.id
                                                            )
                                                        }
                                                        className="bg-green-500 text-white py-1 px-2 rounded"
                                                    >
                                                        Borrow
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                )}
                            </tbody>
                        </table>
                    )}

                    {view === "borrowed" && (
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border">Title</th>
                                    <th className="py-2 px-4 border">Author</th>
                                    <th className="py-2 px-4 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {borrowedBooks.map((book) => (
                                    <tr key={book.id} className="border-b">
                                        <td className="py-2 px-4 border">
                                            {book.title}
                                        </td>
                                        <td className="py-2 px-4 border">
                                            {book.author}
                                        </td>
                                        <td className="py-2 px-4 border">
                                            <button
                                                onClick={() =>
                                                    handleUnborrow(book.id)
                                                }
                                                className="bg-red-500 text-white py-1 px-2 rounded"
                                            >
                                                Unborrow
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    );
};

// Mock functions to simulate backend operations
const searchBooks = async () => {
    return [
        { id: 1, title: "Book 1", author: "Author 1", available: true },
        { id: 2, title: "Book 2", author: "Author 2", available: false },
        { id: 3, title: "Book 3", author: "Author 3", available: true },
    ];
};

const getBorrowedBooks = async () => {
    return [{ id: 2, title: "Book 2", author: "Author 2" }];
};

const borrowBook = async (bookId) => {
    // Replace with actual borrow logic
    return true;
};

const unborrowBook = async (bookId) => {
    // Replace with actual unborrow logic
    return true;
};

export default BookPage;
