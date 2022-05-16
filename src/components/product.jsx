export function Product({car, onAdd, USDRate, disabled}) {
    const {title, priceUSD, quantity} = car
    const priceRUB = Math.round(priceUSD * USDRate)
    const buttonClasses = "btn " + (disabled ? "disabled" : "btn-info")

    return (
        <li>
            <div className="jumbotron">
                <h1 className="display-4">{title}</h1>
                <p className="lead">Price USD {priceUSD}</p>
                <hr className="my-4"></hr>
                <p className="lead">Price RUB {priceRUB}</p>
            </div>
            <button
                onClick={() => {
                    onAdd(car)
                }}
                className={buttonClasses}
                disabled={disabled}
            >
                Add To Cart
            </button>
            <span>Available {quantity}</span>
        </li>
    )
}
