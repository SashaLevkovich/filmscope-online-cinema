export interface ITableItem {
  _id: string
  editUrl: string
  items: string[]
  isAdmin?: boolean
}

export interface IAdminTableItem {
  tableItem: ITableItem
  removeHandler: () => void
}
