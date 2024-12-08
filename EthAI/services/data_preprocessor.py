import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

def prepare_data(look_back: int = 60):
    data = pd.read_csv('data/crypto_price.csv')
    prices = data['Price'].values.reshape(-1, 1)

    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_prices = scaler.fit_transform(prices)

    X, y = [], []
    for i in range(look_back, len(scaled_prices)):
        X.append(scaled_prices[i-look_back:i, 0])
        y.append(scaled_prices[i, 0])
    X, y = np.array(X), np.array(y)
    X = np.reshape(X, (X.shape[0], X.shape[1], 1))
    return X, y, scaler
