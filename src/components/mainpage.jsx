import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {addToCart} from "../store/actions";
import {fetchDataCars} from "../store/reducer";
import {Product} from "./product";

export function MainPage() {
    const dispatch = useDispatch();
    const cars = useSelector((state) => state.cars);
    const goodsInCart = useSelector((state) => state.goodsInCart)
    const exchangeRateUsdToRub = useSelector((state) => state.exchangeRate);

    useEffect(() => {
        dispatch(fetchDataCars)
    }, [dispatch])

    const isInCart = item =>{
        return goodsInCart.some(({id}) => id === item.id)
    }

    return (
        <>
            <h1>Shop</h1>
            <Link to="/cart" type="button" className="btn btn-primary">Cart</Link>
            <ul>
                {cars.map((car) => (
                    <Product
                        key={car.id}
                        car={car}
                        onAdd={(item) => {
                            dispatch(addToCart(item))
                        }}
                        disabled={car.quantity === 0 || isInCart(car)}
                        USDRate={exchangeRateUsdToRub}
                    />)
                )}
            </ul>
        </>
    )
}

export default MainPage;
