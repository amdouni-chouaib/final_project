import { createContext, useReducer ,useEffect} from 'react'
import Reducer from './Reducer'


const initialState = {
    user: JSON.parse(localStorage.getItem("user")),
    isFetching: false,
    error: false
}


export const Context = createContext(initialState)  //context created

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState)

    
useEffect(() => {
   
 localStorage.setItem("user",JSON.stringify(state.user))
}, [state.user]);

    return (
        <Context.Provider value={{
            user: state.user,
            isFetching: state.isFetching,        //values that can be accessed from everywhere
            error: state.error,
            dispatch
        }}>

            {children}

        </Context.Provider>            //providing the context to use at all components
                                      //imported at index.js
    )
}