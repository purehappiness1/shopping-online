import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {removeFromCart} from "../store/actions";
import {validateStock, validateStockAndBuy} from "../store/reducer";

import {Link} from "react-router-dom";
import {CartItem} from "./cartItem";

export function Cart() {
    const dispatch = useDispatch();
    const goodsInCart = useSelector((state) => state.goodsInCart);
    const exchangeRateUsdToRub = useSelector((state) => state.exchangeRate);


    useEffect(() => {
        dispatch(validateStock)
    }, [dispatch])

    if (goodsInCart.length === 0) {
        return (
            <>
                <p className="jumbotron">The cart is empty!</p>
                <Link
                    to='/'
                    type="button"
                    className="btn btn-primary"
                >
                    Back
                </Link>
            </>
        )
    }

    return (
        <>
            <Link to='/'
                  type="button"
                  className="btn btn-primary"
            >
                Back
            </Link>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                    dispatch(validateStockAndBuy)
                }}
            >
                Proceed
            </button>

            <ul>
                {goodsInCart.map((car) => <CartItem
                        key={car.id}
                        car={car}
                        USDRate={exchangeRateUsdToRub}
                        onRemove={() => dispatch(removeFromCart(car))}
                    />
                )}
            </ul>
        </>
    );
}

export default Cart;
