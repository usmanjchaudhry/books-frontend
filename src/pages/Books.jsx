import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {

  // Define a state variable called 'books' and initialize it to an empty array
  const [books, setBooks] = useState([]);

  // Define an effect that fetches all books from the backend API
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get('http://localhost:3000/books');
        console.log(res);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  // Define a function called 'handleDelete' that deletes a book from the database
  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:3000/books/' + id);
      //reloads the current page
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Render a list of books with their properties and two buttons for deleting and updating them
  return (
    <div>
      <h1>Usmans Book Tracker</h1>
      <div className='books'>
        {books.map((book) => (
          <div className='book' key={book.id}>
            {book.cover && <img src={book.cover} alt='' />}
            <h2>{book.title}</h2>
            <h2>{book.desc}</h2>
            <span>{book.price}</span>
            <button className='delete' onClick={() => { handleDelete(book.id) }}>Delete</button>
            <button className='update'><Link to ={`/update/${book.id}`} >Update</Link></button>
          </div>
        ))}
      </div>
      <button>
        <Link to='/add'>Add New Book</Link>
      </button>
    </div>
  );
};

// Export the Books component so it can be used in other parts of the application
export default Books;
