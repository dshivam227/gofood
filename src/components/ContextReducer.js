import React, { createContext } from 'react'
import { useReducer } from 'react';
import { useContext } from 'react';
// import { useDispatch } from 'redux';



const cartstatecontext = createContext();
const cartdispatchcontext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, {
                id: action.id,
                name: action.name,
                price: action.price,
                qty: action.qty,
                img: action.img,
                size: action.size

            }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr; 
        case "DROP":
            let empArray = []
            return empArray
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr
        default:
            console.log("Error in Reducer");
    }
}

export const Cartprovider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [])
    return (
        <cartdispatchcontext.Provider value={dispatch}>

            <cartstatecontext.Provider value={state}>
                {children}
            </cartstatecontext.Provider>
        </cartdispatchcontext.Provider>
    )
}


export const useCart = () => useContext(cartstatecontext)

export const useDispatchcart = () => useContext(cartdispatchcontext)


