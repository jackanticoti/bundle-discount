import React, { useState } from 'react';
import { Cart, EcommItemType, useCart, AddPurchaseableItemPayload, useCartCheckout } from '@thoughtindustries/cart'

function Sale() {

    return (
        <div className='bg-red-400 flex flex-row justify-between h-48 p-10'>
            <h1 className='text-4xl text-center'>Bundle Sale!!!!</h1>
            <Cart checkoutUrl='/orders'>
                <div className='flex flex-row'>
                    <AddBundle/>
                    <CustomCart/>
                </div>
            </Cart>
        </div>
    );
}

export default Sale;

export function CustomCart() {
    const { items, totalQuantity, removeItem } = useCart()
    const { startCheckout } = useCartCheckout();

    const [showCart, setShowCart] = useState(false)

    let cartItems = items.map((item, index) => {
        return <div
            className='flex flex-row'
            key={`key${index}`}>
            <h1 className='mr-2'>Item: {item.title}....</h1>
            <h1>${item.priceInCents / 100}</h1>
        </div>
    })

    let checkout;
    let remove;
    if (items.length > 0) {
        checkout = <h1
            className='hover:bg-slate-100 rounded-lg hover:cursor-pointer
            bg-slate-200 text-center text-2xl mr-10 h-10 px-4'
            onClick={() => {
                startCheckout()
            }}>
            Checkout
        </h1>
        remove = <h1 
            className='hover:bg-slate-100 rounded-lg hover:cursor-pointer bg-slate-200 text-center text-2xl'
            onClick={() => {
                removeItem(items[0])
                removeItem(items[1])
            }}
        >
            Remove Bundle
        </h1>
    } else {
        remove = <div>
            <h1>
                Cart is empty
            </h1>
        </div>
    }

    let fullCart;
    if (showCart) {
        fullCart = <div className='flex flex-col'>
            { cartItems }
            { remove }
        </div>
    }

    return (
        <div className='flex flex-row'>
            <div className='flex flex-col mr-10'>
                <h1
                    className='text-2xl justify-center'
                    onClick={() => setShowCart(!showCart)}
                >
                    Cart({totalQuantity})
                </h1>
                { fullCart }
            </div>
            { checkout }
        </div>
    )
}

export function AddBundle() {

    const { addPurchaseableItem } = useCart()

    let course1: AddPurchaseableItemPayload = {
        purchasableType: EcommItemType.Course,
        purchasable: {
            id: "b6c00977-99b4-4663-9d0e-7c39385cfc49",
            priceInCents: 10000, // usually is 20000
            name: "Course 1"
        }
    }

    let course32: AddPurchaseableItemPayload = {
        purchasableType: EcommItemType.Course,
        purchasable: {
            id: "b6fcaf64-fbdd-4aae-a781-c616321f314b",
            priceInCents: 17500, // usually is 20000
            name: "Course 32"
        }
    }
  
    return (
      <div>
        <h1
            className='hover:bg-slate-100 rounded-lg hover:cursor-pointer
            bg-slate-200 text-center text-2xl mr-10 px-4'
            onClick={() => {
                addPurchaseableItem(course1)
                addPurchaseableItem(course32)
            }}
        >
            Add bundle
        </h1>
      </div>
    );
}