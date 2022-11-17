import React, { useState } from 'react';
import { Cart, EcommItemType, useCart, AddPurchaseableItemPayload, useCartCheckout } from '@thoughtindustries/cart'

function Sale() {

    return (
        <div className='bg-red-400 flex flex-row justify-between'>
            <h1 className='text-2xl text-center'>Bundle Sale!</h1>
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
        return <h1 key={`key${index}`}>
            {item.title}
        </h1>
    })

    let checkout;
    let remove;
    if (items.length > 0) {
        checkout = <h1
            className='hover:bg-slate-100 rounded-lg hover:cursor-pointer
            bg-slate-200 text-center text-2xl'
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
        fullCart = <div>
            { cartItems }
            { remove }
        </div>
    }

    return (
        <div>
            <h1
                className='text-2xl justify-center'
                onClick={() => setShowCart(!showCart)}
            >
                Cart({totalQuantity})
            </h1>
            { fullCart }
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
            bg-slate-200 text-center text-2xl mr-10'
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