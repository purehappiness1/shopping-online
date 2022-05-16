import env from "react-dotenv";
export async function fetchUsdExchangeRate() {
    const myHeaders = new Headers();
    myHeaders.append("apikey", env.REACT_APP_API_KEY);

    const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
    };

    return fetch(
        `https://api.apilayer.com/exchangerates_data/convert?to=RUB&from=USD&amount=1`,
        requestOptions
    )
        .then((response) => response.json())
        .then(data => data.result)
        .catch(console.error);
}