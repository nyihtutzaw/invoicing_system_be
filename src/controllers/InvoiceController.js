import InvoiceModel from './../model/invoice'

import InvoiceProductModel from '../model/invoice_product'
import ProductModel from '../model/product'
import {
  getLast7Days,
  getPaginationAttribute,
  getLast7Month,
  getLastYears,
} from '../utli'
import { QueryTypes } from 'sequelize'
import DB_CONNECTION from '../database'
class ProductController {
  async index(req, res) {
    const invoiceTotalCount = await InvoiceModel.count()
    let { limit, offset, page, totalPage } = getPaginationAttribute(
      req,
      invoiceTotalCount
    )
    const invoices = await InvoiceModel.findAll({
      limit: limit,
      offset: offset,
      order: [['id', 'DESC']],
      include: [
        {
          model: ProductModel,
          as: 'products',
        },
      ],
    })

    invoices.page = page

    res.status(200).json({
      invoices: {
        data: invoices,
        page: page,
        count: invoiceTotalCount,
        totalPage: totalPage,
      },
    })
  }
  async each(req, res) {
    const invoice = await InvoiceModel.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: ProductModel,
          as: 'products',
        },
      ],
    })
    if (!invoice) {
      res.status(404).json({ message: 'Invoice Not Found' })
    }
    res.status(200).json({ invoice: invoice })
  }
  async store(req, res) {
    try {
      const { customer_name, sale_person, note, product_ids, total } = req.body
      const result = await InvoiceModel.create({
        customer_name,
        sale_person,
        total,
        note: note || '',
      })

      for (var i in product_ids) {
        await InvoiceProductModel.create({
          product_id: product_ids[i]['id'],
          price: product_ids[i]['price'],
          amount: product_ids[i]['amount'],
          invoice_id: result.id,
        })
      }

      res.status(200).json({ invoices: result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error saving invoice' })
    }
  }
  async graph(req, res) {
    try {
      const result = {
        daily: [],
        monthly: [],
        yearly: [],
      }
      const lastDays = getLast7Days()
      const dailyResult = await DB_CONNECTION.query(
        `select sum(total) as total,DATE(createdAt) as date from invoices  
        where DATE(createdAt) between "${lastDays[lastDays.length - 1]}" and "${
          lastDays[0]
        }" group by DATE(createdAt)`,
        { type: QueryTypes.SELECT }
      )
      lastDays.forEach((day) => {
        const foundDate = dailyResult.find((r) => r.date === day)
        if (foundDate) {
          result.daily.push({ date: day, total: foundDate.total })
        } else {
          result.daily.push({ date: day, total: 0 })
        }
      })

      const lastMonths = getLast7Month()
      const monthResult = await DB_CONNECTION.query(
        `select sum(total) as total,MONTH(createdAt) as month from invoices
        where MONTH(createdAt) between "${
          lastMonths[lastMonths.length - 1].number
        }" and "${lastMonths[0].number}" group by MONTH(createdAt)`,
        { type: QueryTypes.SELECT }
      )
      lastMonths.forEach((month) => {
        const foundMonth = monthResult.find((r) => r.month === month.number)
        if (foundMonth) {
          result.monthly.push({ month: month.name, total: foundMonth.total })
        } else {
          result.monthly.push({ month: month.name, total: 0 })
        }
      })

      const lastYears = getLastYears()
      const yearResult = await DB_CONNECTION.query(
        `select sum(total) as total,YEAR(createdAt) as year from invoices
        where YEAR(createdAt) between "${
          lastYears[lastYears.length - 1]
        }" and "${lastYears[0]}" group by YEAR(createdAt)`,
        { type: QueryTypes.SELECT }
      )

      lastYears.forEach((year) => {
        const foundYear = yearResult.find((r) => r.year === year)
        if (foundYear) {
          result.yearly.push({ year: year, total: foundYear.total })
        } else {
          result.yearly.push({ year: year, total: 0 })
        }
      })

      res.status(200).json(result)
    } catch (error) {
      console.log(error)
    }
  }
}
export default new ProductController()
