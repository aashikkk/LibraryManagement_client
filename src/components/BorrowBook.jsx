import React, { useState } from "react";
import axios from "axios";

const BorrowBook = () => {
    const [userId, setUserId] = useState("");
    const [bookId, setBookId] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put("/api/borrow/borrow", { userId, bookId });
            alert("Book borrowed successfully");
        } catch (error) {
            console.error(error);
            alert("Borrow failed");
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Borrow Book</h2>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Book ID"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
            />
            <button type="submit">Borrow</button>
        </form>
    );
};

export default BorrowBook;
