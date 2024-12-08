import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button, Card, Option, Select, Typography } from '@material-tailwind/react';
import { useFormik } from 'formik';
// import { user } from '../../dummy/user';
import { base } from '../../app/port';
import { useGetProductByIdQuery } from './productApi';
import CartPage, { AddCart } from '../cart/CartPage';
import { Products } from './Products';
import { PDCarousel } from './PDCarousel';
import { OrderMap } from '../cart/OrderMap';

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
      <div className=' pt-4  gap-10  max-h-[1000px] px-[4%] shadow-2xl'>

        <div className='grid grid-cols-3  rounded-md flex-row  items-center '>
          {/* image */}
          <div className="image shadow-xl w-[355px]">

            <img className='h-[288px]  rounded-none' src={`${base}/${data.product?.image}`} alt="" />
          </div>

          {/* details and buy and addcraft */}
          <div className='shadow-2xl p-5 w-[499px]'>
            {/* details */}
            <div className=" space-y-3">
              <h1 className='font-bold'>Title:{data.product?.title}</h1>
              <p>Description{data.product?.description}</p>
              <p>Price:Rs.{data.product?.price}</p>
            </div>

            {/* adding craft */}
            {data && <AddCart product={data} />}
          </div>
          {/* location */}

          <div className=''>
            {/* <OrderMap /> */}


          </div>


        </div>

      </div>
      <div className='px-[4%] py-20'>

        <Products />
        {/* <PDCarousel /> */}
      </div>

      {/* <ProductReview user={user} id={product._id} reviews={product.reviews} /> */}
    </>
  )
}

export default ProductDetail







