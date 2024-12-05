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



  const dispatch = useDispatch();
  const total = carts.reduce((a, b) => a + b.qty * b.price, 0);

  const handleSubmit = async () => {

  }

  return (
    <div className='p-40 shadow-xl '>

      <div className='bg-blue-200'>

        {carts.length === 0 ? <h1>list is empty add some</h1> :
          <div className=' h-[500px]'>

            <div className='px-10' >
              {carts.map((cart, i) => {
                return <div className='grid grid-cols-4  gap-12 space-y-3 py-2' key={cart.product}>
                  <img className=' max-w-[200px] max-h-[200px]' src={`${base}/${cart.image}`} alt="" />

                  <div>
                    <select defaultValue={cart.qty} name="qty" id="" onChange={(e) => {

                      dispatch(setCarts({ ...cart, qty: Number(e.target.value) }));
                    }}>
                      {[...Array(cart.stock).keys()].map((c) => {
                        return <option key={c + 1} value={c + 1}>{c + 1}</option>
                      })}
                    </select>
                  </div>
                  <h1>Rs.{cart.price}</h1>
                  <div>

                    <Button
                      onClick={() => {
                        dispatch(removeCart(i))
                      }}
                      size='sm' >Remove</Button>
                  </div>
                </div>
              })}

            </div>

            <div className='flex justify-between bg-red-200'>
              <h1>Total</h1>
              <p>{total}</p>
            </div>

            <ODailouge totalAmount={total} orderItems={carts} />

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
      <table className="w-full bg-sky-400 min-w-max table-auto text-left">
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
      <div className='flex justify-center pt-7'>
        <Button disabled={user?.admin || !user} onClick={handleSubmit}>Add To Cart</Button>

      </div>
    </Card>
  )
}