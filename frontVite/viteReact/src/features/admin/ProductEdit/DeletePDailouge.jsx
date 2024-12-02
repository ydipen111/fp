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
import { useRemoveProductMutation } from "../../product/productApi";

export function DeleteProductAdmin({ id }) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const [removeProduct, { isLoading }] = useRemoveProductMutation();
  // console.log(removeProduct);



  const handleSubmit = async () => {
    try {
      const delProduct = await removeProduct(id).unwrap()();
      console.log(delProduct);




    } catch (error) {
      console.log(error);

    }
  }

  return (
    <>

      <Button size="sm" loading={false} onClick={handleOpen} className=''>Delete</Button>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Are you Sure</DialogHeader>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className=""
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => {
            handleSubmit();
            handleOpen();
          }}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}