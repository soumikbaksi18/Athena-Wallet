import requests
import pandas as pd

def fetch_historical_data(crypto_id: str, from_date: str,secret_key: str) -> str:
    url = f'https://api.coingecko.com/api/v3/coins/{crypto_id}/market_chart/range'
    params = {
        'vs_currency': 'usd',
        'from': pd.Timestamp(from_date).timestamp(),
        'to': pd.Timestamp.now().timestamp()
    }
    headers = {
    "x-cg-pro-api-key": secret_key
    }
    response = requests.get(url, params=params,headers=headers)
    response.raise_for_status()

    data = response.json()
    prices = data['prices']
    df = pd.DataFrame(prices, columns=['Timestamp', 'Price'])
    df['Date'] = pd.to_datetime(df['Timestamp'], unit='ms')
    df.set_index('Date', inplace=True)
    file_path = f"data/crypto_price.csv"
    df[['Price']].to_csv(file_path)
    return file_path
