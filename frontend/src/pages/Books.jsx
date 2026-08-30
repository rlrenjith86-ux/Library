import { useEffect, useState } from "react";
import api from "../services/api.js";

function Books() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    quantity: 1
  });

  const loadBooks = async () => {
    try {
      setLoading(true);

      const response = await api.get("/books");

      setBooks(response.data.books || []);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to load books"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const borrowBook = async (book) => {
    try {
      const response = await api.post(
        "/borrow-request",
        {
          bookId: book._id,
          bookTitle: book.title
        }
      );

      setMessage(response.data.message);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to send borrow request"
      );
    }
  };

  const addBook = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(
        "/add-book",
        newBook
      );

      setMessage(response.data.message);

      setNewBook({
        title: "",
        author: "",
        category: "",
        quantity: 1
      });

      loadBooks();

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to add book"
      );
    }
  };

  return (
    <div className="page-container">

      <h1>Library Books</h1>

      {message && (
        <div className="info-message">
          {message}
        </div>
      )}

      {user.role === "admin" && (
        <form
          className="add-book-form"
          onSubmit={addBook}
        >

          <h2>Add New Book</h2>

          <input
            placeholder="Book Title"
            value={newBook.title}
            onChange={(event) =>
              setNewBook({
                ...newBook,
                title: event.target.value
              })
            }
            required
          />

          <input
            placeholder="Author"
            value={newBook.author}
            onChange={(event) =>
              setNewBook({
                ...newBook,
                author: event.target.value
              })
            }
            required
          />

          <input
            placeholder="Category"
            value={newBook.category}
            onChange={(event) =>
              setNewBook({
                ...newBook,
                category: event.target.value
              })
            }
            required
          />

          <input
            type="number"
            min="1"
            placeholder="Quantity"
            value={newBook.quantity}
            onChange={(event) =>
              setNewBook({
                ...newBook,
                quantity: Number(event.target.value)
              })
            }
            required
          />

          <button
            type="submit"
            className="primary-btn"
          >
            Add Book
          </button>

        </form>
      )}

      {loading ? (

        <p>Loading books...</p>

      ) : (

        <div className="book-grid">

          {books.length === 0 ? (

            <p>No books available.</p>

          ) : (

            books.map((book) => (

              <div
                className="book-card"
                key={book._id}
              >

                <h2>{book.title}</h2>

                <p>
                  <strong>Author:</strong>{" "}
                  {book.author}
                </p>

                <p>
                  <strong>Category:</strong>{" "}
                  {book.category}
                </p>

                <p>
                  <strong>Available:</strong>{" "}
                  {book.quantity}
                </p>

                {user.role !== "admin" && (
                  <button
                    className="primary-btn"
                    disabled={book.quantity < 1}
                    onClick={() =>
                      borrowBook(book)
                    }
                  >
                    {book.quantity < 1
                      ? "Not Available"
                      : "Request Borrow"}
                  </button>
                )}

              </div>

            ))
          )}

        </div>
      )}

    </div>
  );
}

export default Books;