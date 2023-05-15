import { TypeMaterialIconName } from '@/shared/types/icon.type'

export interface IMenuItem {
  icon: TypeMaterialIconName
  title: string
  link: string
}

export interface IMenu {
  title: string
  className: string;
  items: IMenuItem[]
}
