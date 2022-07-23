import DB_CONNECTION from '../database'
import { DataTypes } from 'sequelize'
import ProductModel from './product'
import InvoiceModel from './invoice'
const InvoiceProductModel = DB_CONNECTION.define('invoice_product', {
  invoice_id: DataTypes.INTEGER,
  product_id: DataTypes.INTEGER,
  amount: DataTypes.INTEGER,
  price: DataTypes.DOUBLE,
})
;(async () => {
  await DB_CONNECTION.sync({ force: false })
})()

ProductModel.belongsToMany(InvoiceModel, {
  through: 'invoice_product',
  as: 'invoices',
  foreignKey: 'product_id',
})

InvoiceModel.belongsToMany(ProductModel, {
  through: 'invoice_product',
  as: 'products',
  foreignKey: 'invoice_id',
})

export default InvoiceProductModel
