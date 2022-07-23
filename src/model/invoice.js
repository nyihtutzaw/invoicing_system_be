import DB_CONNECTION from '../database'
import { DataTypes } from 'sequelize'
const InvoiceModel = DB_CONNECTION.define('invoice', {
  customer_name: DataTypes.TEXT,
  sale_person: DataTypes.TEXT,
  total: DataTypes.DECIMAL,
  note: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
})
;(async () => {
  await DB_CONNECTION.sync({ force: false })
})()

export default InvoiceModel
