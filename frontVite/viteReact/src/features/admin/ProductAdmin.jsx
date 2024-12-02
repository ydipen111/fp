import { useNavigate } from "react-router";
import { Avatar, Button, Card, Typography } from "@material-tailwind/react";
import { useGetProductQuery } from "../product/productApi";
import { base } from "../../app/port";
import { DeleteProductAdmin } from "./ProductEdit/DeletePDailouge";


const ProductAdmin = () => {
  const { data, isLoading } = useGetProductQuery();
  console.log(data);


  const nav = useNavigate();
  const TABLE_HEAD = ["", "Title", "CreatedAt",
    "Edit", "Delete"];

  if (isLoading) {
    return <h1>Loading....</h1>
  }



  return (
    <div className="p-5">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-semibold">Welcome To Shops</h1>
        <Button onClick={() => nav('/product-form')} className="py-2 px-4" color="deep-purple" size="lg">Add Product</Button>
      </div>

      {<Card className="max-w-3xl">
        <table className=" table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.product.map(({ title, image, createdAt, _id }, index) => {
              const isLast = index === data.product.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={_id}>
                  <td className={classes}>
                    <Avatar src={`${base}/${image}`} alt="avatar" />
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {title}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {createdAt}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Button onClick={() => nav(`/product-edit/${_id}`)} color="light-green" size="sm">Edit</Button>
                  </td>


                  <td className={classes}>
                    <DeleteProductAdmin id={_id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>}

    </div>
  )
}
export default ProductAdmin


