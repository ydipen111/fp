import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button, Card, Option, Select, Typography } from '@material-tailwind/react';
import { useFormik } from 'formik';
// import { user } from '../../dummy/user';
import { base } from '../../app/port';
import { useGetProductByIdQuery } from './productApi';
import CartPage, { AddCart } from '../cart/CartPage';

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductByIdQuery(id);
  console.log(data);




  if (isLoading) {
    return <h1>Loading....</h1>
  }
  if (isError) {
    return <h1>{isError.message}</h1>
  }
  return (
    <>
      <div className=' p-4   gap-10  max-h-[600px] px-[20%] shadow-2xl'>

        <div className='grid grid-cols-3 p-4 gap-4 bg-blue-400 rounded-md flex -row justify-evenly items-center'>
          <div className="image">
            <img className='max-h-[400px] rounded-md' src={`${base}/${data.product?.image}`} alt="" />
          </div>

          <div className=" space-y-3">
            <h1>{data.product?.title}</h1>
            <p>{data.product?.description}</p>
            <p>Rs.{data.product?.price}</p>
          </div>

          {data && <AddCart product={data} />}


        </div>

      </div>
      {/* <ProductReview user={user} id={product._id} reviews={product.reviews} /> */}
    </>
  )
}

export default ProductDetail







