
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

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
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 lg:py-20 gap-5 '>
    
     
      {books.map(book=>(
        <div key={book.id} className='flex flex-col items-center gap-4 shadow-xl p-4 rounded-2xl hover:cursor-pointer hover:shadow-2xl' onClick={() => navigate(`/details/${book.id}`)}>
            <div><img src={book.volumeInfo.imageLinks.thumbnail} alt="" /></div>
          <h4 className='font-bold text-xl mt-auto text-center'>{book.volumeInfo.title}</h4>
          <h5 className='font-semibold text-lg'>{book.volumeInfo.authors?.join(', ')}</h5>          
        </div>
        
      ))}
      
    </div>
   </div>
  )
}

export default Home
