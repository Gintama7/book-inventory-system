
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import imgUrl from './images/book-poster.jpg';

function Home() {

  const [books,setBooks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

  const fetchBooks = async () => {
    try {
      const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:fiction');
      
     
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      const data = await response.json();
      
      setBooks(data?.items);
      setLoading(false);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  
  fetchBooks();
  
}, []);  


const deleteBook = (bookId) => {
  
  const updatedBooks = books.filter((book) => book.id !== bookId);
  setBooks(updatedBooks);
};

const [newBook, setNewBook] = useState({ title: '', author: ''});
const [showModal,setShowModal] = useState(false);
const [editedBook,setEditedBook] = useState({ name: "", authors: "" });
const [selectedBookId, setSelectedBookId] = useState(null);
// const imgUrl = "./images/book-poster.jpg";

const handleFormChange = (e) => {
  const { name, value } = e.target;
  setNewBook({ ...newBook, [name]: value });
};

const handleFormSubmit = (e) => {
  e.preventDefault();

  const newBookEntry = {
    id: Math.random().toString(), 
    volumeInfo: {
      title: newBook.title,
      authors: [newBook.author],
      imageLinks:[{"thumbnail":imgUrl}]
    },
  };

  setBooks((prevBooks) => [...prevBooks, newBookEntry]);

  setNewBook({ title: '', author: '', description: '' });
};

const openEditModal = (book) => {
  setSelectedBookId(book.id);
  setEditedBook({ name: book.volumeInfo.title,
     authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "", });
  setShowModal(true);
};

const handleChange = (e) => {
  setEditedBook({ ...editedBook, [e.target.name]: e.target.value });
};


const handleSubmit = () => {
  setBooks((prevBooks) =>
    prevBooks.map((book) =>
      book.id === selectedBookId
        ? { ...book, volumeInfo:  { title: editedBook.name, 
          authors: editedBook.authors ? editedBook.authors.split(",").map((author) => author.trim()) : book.volumeInfo.authors, 
          imageLinks:[{"thumbnail":imgUrl}] }  }
        : book
    )
  );
  setShowModal(false);
};

if (loading) {
    return (
      <div className='flex flex-col items-center justify-center mt-20 gap-4'>
        <h1>Loading.......</h1>
        <div className="loader"></div> 
      </div>
    );
  }

 

  return (
   <div className='flex flex-col justify-center px-5 max-w-[1240px] xl:px-0 mx-auto'>
    <h1 className='text-4xl md:text-5xl lg:text-6xl text-center pt-5'>Book Inventory Management System</h1>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-10 pb-4 lg:pt-20 lg:pb-10 gap-5 '>
    
     
      {books.map(book=>(
        <div key={book.id} className='flex flex-col items-center gap-4 shadow-xl p-4 rounded-2xl hover:shadow-2xl' 
        
        >
            <div><img src={book.volumeInfo.imageLinks.thumbnail || imgUrl} alt="" /></div>
          <h4 className='font-bold text-xl mt-auto text-center'>{book.volumeInfo.title}</h4>
          <h5 className='font-semibold text-lg'>{ book.volumeInfo.authors?.join(', ')}</h5>
          <div className='flex gap-3 justify-between pt-4'>
          
            <button className='hover:cursor-pointer bg-[#0492c2] p-4 rounded-lg text-white' onClick={() => navigate(`/details/${book.id}`)}>
              View Details
            </button>
            <button className='hover:cursor-pointer bg-red-700 p-4 rounded-lg text-white' onClick={()=>deleteBook(book.id)}>
            Delete
            </button>
            <button className='hover:cursor-pointer bg-[#85BB65] p-4 rounded-lg text-white'
             onClick={()=> openEditModal(book)}>Edit</button>
          </div>
                   
        </div>
        
      ))}
      
    </div>
    <h3 className='text-xl font-semibold'>Add a new Book </h3>
    <form onSubmit={handleFormSubmit} className='flex flex-col sm:flex-row gap-4 items-center pt-4 pb-20'>
      
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={newBook.title}
          onChange={handleFormChange}
          className='border-1 border-blue-300 p-2 rounded-md'
        />
        <input
          type="text"
          name="author"
          required
          placeholder="Author"
          value={newBook.author}
          onChange={handleFormChange}
          className='border-1 border-blue-300 p-2 rounded-md'
        />
        <button type="submit" className='bg-green-400 p-2 rounded-md text-white'>Add Book</button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Book</h3>
            <input
              type="text"
              name="name"
              value={editedBook.name}
              onChange={handleChange}
              placeholder="Book Name"
            />
            <input
              type="text"
              name="authors"
              value={editedBook.authors}
              onChange={handleChange}
              placeholder="Author"
            />
            <button onClick={handleSubmit}>Save</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
   </div>
  )
}

export default Home
