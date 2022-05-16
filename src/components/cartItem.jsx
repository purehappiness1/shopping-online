export function CartItem({car, USDRate, onRemove}) {
    const {title, priceUSD, quantity} = car
    const priceRUB = Math.round(priceUSD * USDRate)

    return (
        <li>
            <div className="jumbotron">
                <h1 className="display-4">{title}</h1>
                <p className="lead">Price USD {priceUSD}</p>
                <hr className="my-4"></hr>
                <p className="lead">Price RUB {priceRUB}</p>
            </div>
            <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                    onRemove(car)
                }}
            >
                Delete
            </button>
            <span>Available {quantity}</span>
        </li>
    )
}
