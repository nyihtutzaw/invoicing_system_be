import ProductModel from './../model/product.js'
const PRODUCTS = [
  {
    name: 'Burger',
    stock: 30,
    picture: 'some',
    price: 3000,
  },
  {
    name: 'Pizza',
    stock: 20,
    picture: 'some',
    price: 5500,
  },
  {
    name: 'Sandwich',
    stock: 20,
    picture: 'some',
    price: 3500,
  },
  {
    name: 'Hot Dog',
    stock: 5,
    picture: 'some',
    price: 1200,
  },
  {
    name: 'Cola',
    stock: 1000,
    picture: 'some',
    price: 500,
  },
  {
    name: 'Coffee',
    stock: 20,
    picture: 'some',
    price: 1000,
  },
]
ProductModel.destroy({
  where: {},
  truncate: true,
})

PRODUCTS.forEach(async (product) => {
  const savedData = ProductModel.build(product)
  await savedData.save()
})
