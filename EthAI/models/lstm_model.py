from keras.models import Sequential
from keras.layers import LSTM, Dense
import numpy as np

global_model = None

def train_model(X, y):
    global global_model
    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=(X.shape[1], 1)))
    model.add(LSTM(units=50))
    model.add(Dense(units=1))
    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(X, y, epochs=50, batch_size=32)
    global_model = model
    return model

def predict_prices():
    if global_model is None:
        raise ValueError("Model not trained yet!")
    dummy_data = np.random.rand(10, 60, 1)  # Replace with actual data for prediction
    return global_model.predict(dummy_data).flatten()
