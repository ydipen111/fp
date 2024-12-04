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
  // console.log(data.product?.image);




  if (isLoading) {
    return <h1>Loading....</h1>
  }
  if (isError) {
    return <h1>{isError.message}</h1>
  }
  return (
    <>
      <div className='grid grid-cols-3 p-4 items-center gap-10'>


        <div className="image">
          <img className='w-full' src={`${base}/${data.product?.image}`} alt="" />
        </div>

        <div className="info space-y-3">
          <h1>{data.product?.title}</h1>
          <p>{data.product?.description}</p>
          <p>Rs.{data.product?.price}</p>
        </div>

        {data && <AddCart product={data} />}




      </div>
      {/* <ProductReview user={user} id={product._id} reviews={product.reviews} /> */}
    </>
  )
}

export default ProductDetail








// export const AddCart = ({ product }) => {
//   const dispatch = useDispatch();
//   const nav = useNavigate();
//   const { carts } = useSelector((state) => state.cartSlice);
//   const { user } = useSelector((state) => state.userSlice);
//   const isExist = carts.find((cart) => cart.product === product._id);

//   const formik = useFormik({
//     initialValues: {
//       qty: isExist?.qty || 1
//     }
//   });




//   const handleSubmit = () => {
//     dispatch(setCarts({
//       name: product.title,
//       qty: Number(formik.values.qty),
//       image: product.image,
//       price: product.price,
//       product: product._id,
//       stock: product.stock
//     }));
//     nav('/cart-page');
//   }

//   return (
//     <Card className="h-full w-full overflow-scroll">
//       <table className="w-full min-w-max table-auto text-left">
//         <thead>
//           <tr>

//             <th
//               className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
//             >
//               <Typography
//                 variant="small"
//                 color="blue-gray"
//                 className="font-normal leading-none opacity-70"
//               >
//                 Product Name
//               </Typography>
//             </th>
//             <th

//               className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
//             >
//               <Typography
//                 variant="small"
//                 color="blue-gray"
//                 className="font-normal leading-none opacity-70"
//               >
//                 {product.title}
//               </Typography>
//             </th>

//           </tr>

//           <tr>

//             <th

//               className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
//             >
//               <Typography
//                 variant="small"
//                 color="blue-gray"
//                 className="font-normal leading-none opacity-70"
//               >
//                 Qty
//               </Typography>
//             </th>
//             <th

//               className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
//             >
//               <div>

//                 <select
//                   defaultValue={formik.values.qty}
//                   name="qty" id=""

//                   onChange={(e) => formik.setFieldValue('qty', e.target.value)}
//                 >
//                   {[...Array(product.stock).keys()].map((c) => {
//                     return <option key={c + 1} value={c + 1}>{c + 1}</option>
//                   })}
//                 </select>
//               </div>
//             </th>

//           </tr>

//         </thead>



//       </table>
//       <div className='flex justify-center pt-7'>
//         <Button disabled={user?.isAdmin || !user} onClick={handleSubmit}>Add To Cart</Button>
//       </div>
//     </Card>
//   )
// }