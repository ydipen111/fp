import { Button, Input } from "@material-tailwind/react"
import { useFormik } from "formik"
import { useNavigate } from "react-router";

const SearchInput = () => {
  const nav = useNavigate();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      search: ''
    },

    onSubmit: (val, { resetForm }) => {
      if (val.search.trim().length > 2) {
        nav(`/search/${val.search}`)
        resetForm();
      }
    }
  });
  return (
    <form onSubmit={handleSubmit}>

      <div className=" items-center gap-x-2 flex">

        <div className="relative flex w-full gap-2 md:w-max">
          <Input

            type="search"
            placeholder="Search in online Shopping"
            name="search"
            onChange={handleChange}
            value={values.search}
            className="relative bg-white pl-9 lg:w-[699px] h-[60px]
             py-0 rounded-0
placehholder:text-blue-gray-300 "

          />

          <Button type="submit" size="lg" className=" mr-60 bg-orange-900 rounded-lg mr-6 items-center">
            Search
          </Button>
        </div>
      </div>
    </form>
  )
}
export default SearchInput