import actions from "./types";
import {fetchCarsStock, updateDatabaseQuantity} from "../services/dbService";
import {fetchUsdExchangeRate} from "../services/exchangeRatesService";
import {emptyCart, updateCars, updateCart, updateUsdRate} from "./actions";

export async function fetchDataCars(dispatch) {
    const {data: cars} = await fetchCarsStock();
    dispatch(updateCars(cars));
}

async function checkStock(dispatch, getState) {
    const {data: cars} = await fetchCarsStock();
    dispatch(updateCars(cars));
    const {goodsInCart} = getState()
    return goodsInCart.every(item => cars.find(car => car.id === item.id)?.quantity > 0)
}

export async function fetchUsdRateEveryTwoMinutes(dispatch) {
    const usdRate = await fetchUsdExchangeRate()
    if (usdRate) {
        dispatch(updateUsdRate(usdRate))
    }
    setTimeout(() => {
        dispatch(fetchUsdRateEveryTwoMinutes)
    }, 120 * 1000)
}

export async function validateStock(dispatch, getState) {
    const areInStock = await checkStock(dispatch, getState)
    if (!areInStock) {
        const state = getState()
        const updatedCart = state.goodsInCart.filter(item => state.cars.find(car => car.id === item.id)?.quantity > 0)
        dispatch(dispatch(updateCart(updatedCart)))
        alert("Some products are sold out. They will be removed from your cart")
    }
    return areInStock
}

export async function validateStockAndBuy(dispatch, getState) {
    const areInStock = await validateStock(dispatch, getState)
    if (areInStock) {
        const {goodsInCart} = getState()
        await updateDatabaseQuantity(goodsInCart)
        alert('Order successful')
        dispatch(emptyCart())
    }
}

const initialState = {
    cars: [],
    exchangeRate: 0,
    goodsInCart: [],
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CARS_LOADED: {
            return {...state, cars: action.payload};
        }

        case actions.EXCHANGE_LOADED: {
            return {...state, exchangeRate: action.payload};
        }

        case actions.ADD_TO_CART:
            return {...state, goodsInCart: [...state.goodsInCart, action.car]};

        case actions.REMOVE_FROM_CART:
            return {
                ...state,
                goodsInCart: state.goodsInCart.filter((item) => item !== action.car)
            };

        case actions.UPDATE_CART:
            return {
                ...state,
                goodsInCart: action.payload
            }

        case actions.EMPTY_CART:
            return {...state, goodsInCart: []};

        default:
            return state;
    }
};

export default reducer;
