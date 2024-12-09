import { Button, Card, Typography } from '@material-tailwind/react';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { removeCart, setCarts } from './cartSlice';
import { base } from '../../app/port';
import { ODailouge } from './ODailouge';



const CartPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);




  const { carts } = useSelector((state) => state.cartSlice)
  // carts.forEach(cart => {
  //   console.log("cart item", cart.stock, cart.name);

  // })
  console.log(carts);




  const dispatch = useDispatch();
  const total = carts.reduce((a, b) => a + b.qty * b.price, 0);

  const handleSubmit = async () => {

  }

  return (
    <div className='p-[4%] shadow-xl '>

      <div className=''>

        {carts.length === 0 ? <h1>list is empty add some</h1> :
          <div className=' h-[500px]'>

            <div className='px-10 ' >
              {carts.map((cart, i) => {
                return <div className='grid grid-cols-4  gap-12 space-y-3 py-2' key={cart.product}>

                  {/*image  */}
                  <div className='shadow-md max-w-[255px] max-h-[222px] p-3'>
                    <img className='  object-cover image-full ' src={`${base}/${cart.image}`} alt="" />
                  </div>


                  {/* details */}
                  <div className='col-span-2 flex flex-col   shadow-2xl items-start p-5 gap-5'>
                    <p>
                      <span className='font-bold'> Product:</span> {cart.name}
                    </p>

                    <p>
                      <span className='font-bold'> Select quantity level:</span>

                      <select className='' defaultValue={cart.qty} name="qty" id="" onChange={(e) => {

                        dispatch(setCarts({ ...cart, qty: Number(e.target.value) }));
                      }}>
                        {[...Array(cart.qty).keys()].map((c) => {
                          return <option key={c + 1} value={c + 1}>{c + 1}</option>
                        })}
                      </select>
                    </p>


                    <h1><span className='font-bold'>Per Price : </span> Rs.{cart.price}</h1>
                  </div>

                  {/* remove and place and order */}
                  <div className='space-x-3 '>

                    <Button
                      className='rounded-none bg-red-600'
                      onClick={() => {
                        dispatch(removeCart(i))
                      }}
                      size='md' >Remove</Button>
                    <Button
                      className='rounded-none bg-red-400'>Time and loction</Button>

                  </div>

                  {/*payment system */}

                </div>
              })}

            </div>

            <div className='grid grid-cols-4 px-10 items-center'>
              <p className='font-bold'>Total Amount</p>

              <p>
                <span className=''> NRS :</span> {total}</p>

              <div className=''>
                <ODailouge className="rounded-none" totalAmount={total} orderItems={carts} />
              </div>
            </div>


          </div>}

      </div>

    </div>
  )
}
export default CartPage;


// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const AddCart = ({ product }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const { carts } = useSelector((state) => state.cartSlice)




  const { user } = useSelector((state) => state.userSlice);
  // console.log(carts.qty);

  const isExist = carts.find((cart) => cart.product === product.product._id);
  console.log(isExist);




  const formik = useFormik({
    initialValues: {
      qty: 1
    }
  });



  const handleSubmit = () => {
    dispatch(setCarts({
      name: product.product.title,
      qty: Number(formik.values.qty),
      image: product.product.image,
      price: product.product.price,
      product: product.product._id

    }))
    nav('/cart-page');
  }

  return (
    <Card className="  w-full max-h-[500px] overflow-scroll">
      <table className="w-full bg-sky-400  table-auto text-left">
        <thead>
          <tr>

            <th
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Product Name
              </Typography>
            </th>
            <th

              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {product.product.title}
              </Typography>
            </th>

          </tr>

          <tr>

            <th

              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Qty
              </Typography>
            </th>
            <th

              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <div>

                <select
                  className='border rounded-lg p-2 focus:outline-none'
                  defaultValue={formik.values.qty}
                  name="qty" id=""

                  onChange={(e) => formik.setFieldValue('qty', e.target.value)}
                >
                  {[...Array(product.product.stock).keys()].map((c) => {
                    return <option key={c + 1} value={c + 1}>{c + 1}</option>
                  })}
                </select>
              </div>
            </th>

          </tr>

        </thead>



      </table>

      <div className='flex justify-center pt-7 rounded-none gap-7'>


        <Button size='sm' className='w-[222px] h-[49px] rounded-none bg-green-500 text-md' >Buy Now</Button>
        <Button className='text-md w-[222px] h-[49px] rounded-none bg-orange' disabled={user?.admin || !user} onClick={handleSubmit}>Add To Cart</Button>

      </div>
    </Card>
  )
}

