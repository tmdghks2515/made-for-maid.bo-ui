import dayjs from 'dayjs'

export const DATE_FORMAT_1 = 'YY년 M월 D일'
export const DATE_FORMAT_2 = 'YYYY-MM-DD'

export const DATETIME_FORMAT_1 = 'YY년 M월 d일 H시 m분'
export const DATETIME_FORMAT_2 = 'YYYY-MM-dd HH:mm:ss'

export function formatDate(datetime: dayjs.ConfigType, format: string = DATE_FORMAT_1) {
  return dayjs(datetime).format(format)
}
