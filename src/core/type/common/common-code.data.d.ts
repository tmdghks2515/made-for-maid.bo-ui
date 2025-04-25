type CommonCodeDTO = {
  code: string
  displayName: string
  parentCode?: string
  codeOrder: number
  description?: string
  etc1?: string
  etc2?: string
  etc3?: string
  childCodes?: CommonCodeDTO[]
}

export { CommonCodeDTO }
