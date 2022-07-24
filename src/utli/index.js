import dayjs from 'dayjs'

export function getPaginationAttribute(req, totalCount) {
  let limit = 10
  let offset = 0
  let page = 1
  if (req.query.page) {
    page = Number(req.query.page)
    if (page > 1) {
      offset = (page - 1) * limit
    }
  }

  let totalPage = Math.ceil(totalCount / limit)
  if (totalPage < 1) totalPage = 1

  return {
    limit,
    offset,
    page,
    totalPage,
  }
}

export function getLast7Days() {
  var result = []
  for (var i = 0; i < 7; i++) {
    var d = new Date()
    d.setDate(d.getDate() - i)
    result.push(dayjs(d).format('YYYY-MM-DD'))
  }

  return result
}

export function getLast7Month() {
  var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  var today = new Date()
  var d
  var month
  var result = []

  for (var i = 6; i >= 0; i -= 1) {
    d = new Date(today.getFullYear(), today.getMonth() - i, 1)
    month = monthNames[d.getMonth()]
    result.push({
      name: month,
      number: d.getMonth() + 1,
    })
  }
  result = result.reverse()
  return result
}
