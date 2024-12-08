import React from 'react'
import { TopProducts } from './TopProducts'
import { useGetProductQuery } from './productApi'
import CardLoading from '../../ui/CardLoading';
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';
import { useNavigate } from "react-router";
import { base } from '../../app/port';

export const Products = () => {
  const nav = useNavigate();


  const { data, isLoading, isError } = useGetProductQuery();
  console.log(data);
  if (isLoading) {
    return <h1>Loading....</h1>
  }
  if (isError) {
    return <h1>{isError.message}</h1>
  }


  return (
    <div>


      {isLoading ? <CardLoading /> :
        <div className='grid grid-cols-4 gap-4 px-[4%]'>
          {data && data.product?.map((product) => {
            return <Card className="rounded-none hover:shadow-2xl transition-duration-300 ease-in-out transform hover:-translate-y-1"
              key={product._id}>

              <CardHeader shadow={false} floated={false} className="h-56">
                <img
                  src={`${base}/${product.image} `}
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex items-center justify-between">
                  <Typography color="blue-gray" className="font-medium">
                    {product.title}
                  </Typography>
                  <Typography color="blue-gray" className="font-medium">
                    ${product.price}
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75"
                >
                  {product.description}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  onClick={() => nav(`/products-details/${product._id}`)}
                  ripple={false}
                  fullWidth={true}
                  className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  View More
                </Button>
              </CardFooter>
            </Card>
          })}

        </div>}
    </div>





  )
}
