
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [books,setBooks] = useState([]);


  useEffect(()=>{
  const fetchBooks = async () => {
    try {
      const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=harry+potter');
      
     
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      const data = await response.json();
      
      setBooks(data.items);

    } catch (err) {
      console.log(err)
    }
  };

  
  fetchBooks();
  console.log(books);
}, []);  



  return (
   <div className='flex justify-center'>
    <table className=' border-[1px] '>
     <thead>
        <th>Title</th>
        <th>Author</th>
        <th>Published Date</th>
      </thead>
      <tbody>
      {books.map(book=>(
        <tr key={book.id} className='border-b-[1px]'>
          <td className='border-[1px]'>{book.volumeInfo.title}</td>
          <td>{book.volumeInfo.authors?.join(', ')}</td>
          <td>{book.volumeInfo.publishedDate}</td>
        </tr>
        
      ))}
      </tbody>
    </table>
   </div>
  )
}

export default App
