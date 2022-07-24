import ProductModel from './../model/product.js'
const PRODUCTS = [
  {
    name: 'Burger',
    stock: 30,
    image:
      'https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4135.png',
    price: 3000,
  },
  {
    name: 'Pizza',
    stock: 20,
    image:
      'https://image.similarpng.com/very-thumbnail/2020/04/bacon-chicken-pizza-png.png',
    price: 5500,
  },
  {
    name: 'Sandwich',
    stock: 20,
    image:
      'https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Fast-Food-PNG-Clipart/Sandwich_PNG_Clipart_Image.png?m=1434276763',
    price: 3500,
  },
  {
    name: 'Hot Dog',
    stock: 5,
    image: 'https://pngimg.com/uploads/hot_dog/hot_dog_PNG10217.png',
    price: 1200,
  },
  {
    name: 'Cola',
    stock: 1000,
    image:
      'https://toppng.com/uploads/preview/coca-cola-11528343217zyw9fkytbo.png',
    price: 500,
  },
  {
    name: 'Coffee',
    stock: 20,
    image:
      'https://w7.pngwing.com/pngs/115/676/png-transparent-cafe-coffee-espresso-caffe-macchiato-cappuccino-coffee-cafe-food-breakfast-cafe.png',
    price: 1000,
  },
]
ProductModel.destroy({
  where: {},
  truncate: true,
})

PRODUCTS.forEach(async (product) => {
  try {
    const savedData = ProductModel.build(product)
    await savedData.save()
  } catch (error) {
    console.log(error)
  }
})
