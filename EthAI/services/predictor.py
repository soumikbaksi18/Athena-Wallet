import numpy as np
from models.lstm_model import global_model
from services.data_preprocessor import prepare_data

def predict_prices():
    """
    Predict future prices using the trained LSTM model.
    """
    if global_model is None:
        raise ValueError("Model not trained yet! Train the model before making predictions.")

    # Prepare data for predictions (you can use dummy data or extend this to handle real future data)
    X, _, _ = prepare_data()  # Load the scaled dataset
    predicted_prices = global_model.predict(X)

    return predicted_prices.flatten()
