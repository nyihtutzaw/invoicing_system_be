import DB_CONNECTION from '../database'
import { DataTypes } from 'sequelize'
const ProductModel = DB_CONNECTION.define('product', {
  name: DataTypes.TEXT,
  image: DataTypes.TEXT,
  price: DataTypes.DECIMAL,
  stock: DataTypes.INTEGER,
})
;(async () => {
  await DB_CONNECTION.sync({ force: false })
})()

export default ProductModel
