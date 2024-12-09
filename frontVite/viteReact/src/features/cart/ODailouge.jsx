import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useResolvedPath } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useAddOrderMutation, useGetAllOrderQuery } from "../order/orderApi";
import { clearCartsFromLocal } from "../../hooks/local";
import { clearCarts } from "./cartSlice";
import { useGetProductByIdQuery } from "../product/productApi";


export function ODailouge({ totalAmount, orderItems }) {


  const [addOrder, { isLoading }] = useAddOrderMutation();
  // const data = useGetAllOrderQuery();
  // console.log(data);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  // console.log(totalAmount, orderItems);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);


  const hanSubmit = async () => {
    try {
      await addOrder({
        body: { totalAmount, orderItems },
        token: user.token
      }).unwrap();
      toast.success('success')
      dispatch(clearCarts());


    } catch (error) {
      toast.error(`${error.message}`)

    }
  }

  return (
    <>

      <Button size="md" loading={isLoading} onClick={handleOpen} className='rounded-none px-10 bg-green-500'>Place and order</Button>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Are you Sure to order ?</DialogHeader>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className=""
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green"
            onClick={() => {
              hanSubmit();
              handleOpen();
              // nav('/')
            }}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}