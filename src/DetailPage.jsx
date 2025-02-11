import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const DetailPage = () => {

    const { id } = useParams();

    const [currBook, setCurrBook] = useState();

    useEffect(()=>{

        const fetchBooks = async () => {
            try {
              const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
              
             
              if (!response.ok) {
                throw new Error('Failed to fetch books');
              }
              
              const data = await response.json();
              
              setCurrBook(data.volumeInfo);
             
        
            } catch (err) {
              console.log(err)
            }
          };
        
          
          fetchBooks();

    },[])

  return (
    <div className='px-5 max-w-[1240px] xl:px-0 mx-auto'>
        <h2 className='text-center font-bold text-3xl md:text-4xl lg:text-5xl pt-5 '>Book Details</h2>
      {currBook && (
        <div className='grid  grid-cols-1 items-center justify-center gap-5 md:gap-0 md:grid-cols-2 max-w-[800px] mx-auto my-10 lg:my-20'>
          <img src={currBook?.imageLinks?.thumbnail} alt="" className='w-full h-auto max-w-[250px]' />
          <div>
          <h2 className='text-3xl font-bold'>{currBook.title}</h2>
          <h3 className='text-xl font-semibold pt-4'>By {currBook.authors?.join(', ')}</h3>
          <p className='pt-4 '>{currBook.description}</p>
          <p className='pt-4 '><span className='font-semibold text-gray-500 text-sm'>Page Count - </span>{currBook.pageCount}</p>
          <p className='pt-4 '><span className='font-semibold text-gray-500 text-sm'>Publisher - </span>{currBook.publisher}</p>
          <p className='pt-4 '><span className='font-semibold text-gray-500 text-sm'>Published Date - </span>{currBook.publishedDate}</p>
          </div>         
        </div>
      )}
    </div>
  );
}

export default DetailPage
