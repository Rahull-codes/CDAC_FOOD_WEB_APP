import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type {CartItem} from '../src/types/Food'

const initialState : {cartItem : CartItem []} = { cartItem : [] }

const cartSlice = createSlice({
    name : 'cart' ,
    initialState,
    reducers : {
        addToCartAction : (state , action : PayloadAction<CartItem> )=> {
            // state.cartItem = [ ...state.cartItem , action.payload ]
            const item = state.cartItem.find(f => f.fid == action.payload.fid)
            if(item){
                item.qty++;
            }else{
                state.cartItem.push(action.payload)
            }
        },

        incrementQtyAction: (state , action : PayloadAction<number> ) =>{
            let item = state.cartItem.find(f => f.fid == action.payload)
            if(item){
                item.qty++
            }
        },

        decrementQtyAction : (state , action : PayloadAction<number>) => {
            const idx = state.cartItem.findIndex(f => f.fid == action.payload)
            if(state.cartItem.at(idx)?.qty == 1){
                state.cartItem.splice(idx , 1)
            }else {
                state.cartItem.at(idx)!.qty -= 1
            }
        },

        clearCartAction : (state ) =>{
            state.cartItem.length = 0
        }

    }
})

export const cartReducer = cartSlice.reducer
export const {addToCartAction , incrementQtyAction , decrementQtyAction , clearCartAction} = cartSlice.actions