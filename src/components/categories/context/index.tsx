import React from 'react'
import IAction from '../../../contracts/Action'
import { ICategoriesState, initState, reducer } from '../state'

interface CategoriesContextProps {
  state: ICategoriesState,
  dispatch: React.Dispatch<IAction>
}

export const Context = React.createContext<CategoriesContextProps>({} as CategoriesContextProps)

export const CategoriesProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = React.useReducer(reducer, initState)

  return (
    <Context.Provider value={{ state, dispatch }}>
      { children}
    </Context.Provider>
  )
}

export const useCategoriesState = () => React.useContext(Context)
