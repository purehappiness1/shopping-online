import actions from "./types";

export const addToCart = (car) => ({ type: actions.ADD_TO_CART, car })

export const removeFromCart = (car) => ({ type: actions.REMOVE_FROM_CART, car })

export const updateCart = (cart) => ({ type: actions.UPDATE_CART, payload: cart })

export const emptyCart = () => ({ type: actions.EMPTY_CART })

export const updateCars = (cars) => ({ type: actions.CARS_LOADED, payload: cars })

export const updateUsdRate = (rate) => ({ type: actions.EXCHANGE_LOADED, payload: rate })
