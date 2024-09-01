import React, { useState } from "react";
import axios from "axios";

const BookSearch = () => {
    const [query, setQuery] = useState({ title: "", author: "" });
    const [books, setBooks] = useState([]);

    const onChange = (e) => {
        setQuery({ ...query, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("/api/books", { params: query });
            setBooks(res.data);
        } catch (error) {
            console.error(error);
            alert("Search failed");
        }
    };

    return (
        <div>
            <h2>Search Books</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={onChange}
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    onChange={onChange}
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {books.map((book) => (
                    <li key={book.bookId}>
                        {book.title} by {book.author} -{" "}
                        {book.availability ? "Available" : "Unavailable"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookSearch;
