import React from 'react'
import { useParams } from 'react-router'
import Login from '../auth/Login';
import { useGetProductQuery } from '../product/productApi';
import { Card } from '@material-tailwind/react';
import { base } from '../../app/port';

export const SearchPage = () => {
  const { search } = useParams();
  console.log(search);

  const { data, isLoading, isError, error } = useGetProductQuery(search);
  console.log(data);



  if (isLoading) {
    return <div>Loading....</div>
  }
  return (
    <div>
      {data && data.product.length > 0 ? (
        <div className='grid grid-cols-3 shadow-xl gap-4 p-4'>
          {data.product?.map((product) => {
            return <div key={product._id} >
              <div>
                <img className='max-w[299px] max-h-[299px]' src={`${base}/${product.image}`} />
                <p>{product.brand}</p>
                <p>{product.category}</p>
                <p>{product.price}</p>
                <p>{product.description}</p>

              </div>


            </div>
          })}
        </div>
      ) : (
        <div>No Data found</div>
      )}
    </div>
  )
}
