import Order from "../Models/Order.js";



//getAllOrder
export const getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(
      orders
    )
  } catch (error) {
    return res.status(500).json({ message: "Error" })

  }
}

//userOrder
export const getOrderUser = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.id });
    return res.status(200).json(
      orders
    )
  } catch (error) {
    return res.status(500).json({ message: "Error" })

  }
}

//getOrderDetails
export const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate([{
      path: 'user',
      model: 'User',
      select: 'fullname email'
    },
    {
      path: 'orderItems.product',
      model: 'Product',
      select: 'name image'

    }
    ])

    return res.status(200).json(order)

  } catch (error) {
    return res.status(500).json({ message: "Error" })

  }
}


//creatingOrder
export const addOrder = async (req, res, next) => {
  const { totalAmount, orderItems } = req.body;

  // Validate input
  // if (!totalAmount || !orderItems || orderItems.length === 0) {
  //   return res.status(400).json({ message: "Missing required fields" });
  // }
  try {
    await Order.create({
      totalAmount,
      orderItems,
      user: req.id
    })
    return res.status(200).json({ message: "succesfully order created" })


  } catch (error) {
    return res.status(400).json({ message: `${error}` });

  }
}