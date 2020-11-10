import { createContext, Dispatch } from 'react'

export const Context = createContext<{
  currentColorPicker: any
  setCurrentColorPicker: Dispatch<any>
}>(null)
