import React, { useState, useEffect } from "react";
import axios from "../axios";
import NavBar from "../components/NavBar";

const BookPage = () => {
    const [books, setBooks] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [view, setView] = useState("available");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchBooks();
        fetchBorrowedBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const availableBooks = await getAvailableBooks();
            setBooks(availableBooks);
        } catch (error) {
            console.error("Failed to fetch available books:", error);
        }
    };

    const fetchBorrowedBooks = async () => {
        try {
            const userBorrowedBooks = await getBorrowedBooks();
            setBorrowedBooks(userBorrowedBooks);
        } catch (error) {
            console.error("Failed to fetch borrowed books:", error);
        }
    };

    const handleBorrow = async (bookId) => {
        try {
            await borrowBook(bookId);
            await fetchBooks();
            await fetchBorrowedBooks();
        } catch (error) {
            console.error("Failed to borrow book:", error);
        }
    };

    const handleReturn = async (bookId) => {
        try {
            await returnBook(bookId);
            await fetchBooks();
            await fetchBorrowedBooks();
        } catch (error) {
            console.error("Failed to return book:", error);
        }
    };

    const handleSearch = async (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query) {
            try {
                const searchResults = await searchBooks(query);
                setBooks(searchResults);
            } catch (error) {
                console.error("Failed to search books:", error);
            }
        } else {
            fetchBooks();
        }
    };

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
                                {Array.isArray(books) && books.length > 0 ? (
                                    books.map((book) => (
                                        <tr key={book._id} className="border-b">
                                            <td className="py-2 px-4 border">
                                                {book.title}
                                            </td>
                                            <td className="py-2 px-4 border">
                                                {book.author}
                                            </td>
                                            <td className="py-2 px-4 border">
                                                {book.availabl
                                                    ? "Available"
                                                    : "Unavailable"}
                                            </td>
                                            <td className="py-2 px-4 border">
                                                <button
                                                    onClick={() =>
                                                        handleBorrow(book._id)
                                                    }
                                                    className="bg-green-500 text-white py-1 px-2 rounded"
                                                >
                                                    Borrow
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="py-2 px-4 border text-center"
                                        >
                                            No books available
                                        </td>
                                    </tr>
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
                                    <th className="py-2 px-4 border">
                                        Availability
                                    </th>
                                    <th className="py-2 px-4 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(borrowedBooks) &&
                                borrowedBooks.length > 0 ? (
                                    borrowedBooks.map((book) => (
                                        <tr key={book._id} className="border-b">
                                            <td className="py-2 px-4 border">
                                                {book.title}
                                            </td>
                                            <td className="py-2 px-4 border">
                                                {book.author}
                                            </td>
                                            <td className="py-2 px-4 border">
                                                Borrowed
                                            </td>
                                            <td className="py-2 px-4 border">
                                                <button
                                                    onClick={() =>
                                                        handleReturn(book._id)
                                                    }
                                                    className="bg-red-500 text-white py-1 px-2 rounded"
                                                >
                                                    Unborrow
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="py-2 px-4 border text-center"
                                        >
                                            No borrowed books
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    );
};

// Mock functions to simulate backend operations
const getAvailableBooks = async () => {
    try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        const token = userData?.accessToken;

        if (!token) {
            throw new Error("No access token found");
        }

        const response = await axios.get("/api/v1/books", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch available books:", error);
        throw error;
    }
};

const getBorrowedBooks = async () => {
    try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        const token = userData?.accessToken;

        if (!token) {
            throw new Error("No access token found");
        }

        const response = await axios.get("/api/v1/books/borrowed", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch borrowed books:", error);
        throw error;
    }
};

const searchBooks = async (query) => {
    try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        const token = userData?.accessToken;

        if (!token) {
            throw new Error("No access token found");
        }

        const response = await axios.get(
            `/api/v1/books/search?title=${query}&author=${query}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data.data;
    } catch (error) {
        console.error("Failed to search books:", error);
        throw error;
    }
};

const borrowBook = async (bookId) => {
    try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        const token = userData?.accessToken;

        if (!token) {
            throw new Error("No access token found");
        }

        const response = await axios.post(
            "/api/v1/books/borrow",
            { bookId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data.data;
    } catch (error) {
        console.error("Failed to borrow book:", error);
        throw error;
    }
};

const returnBook = async (bookId) => {
    try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        const token = userData?.accessToken;

        if (!token) {
            throw new Error("No access token found");
        }

        const response = await axios.post(
            "/api/v1/books/return",
            { bookId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data.data;
    } catch (error) {
        console.error("Failed to return book:", error);
        throw error;
    }
};

export default BookPage;
