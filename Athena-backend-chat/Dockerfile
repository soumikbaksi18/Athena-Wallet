# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Install system dependencies required to build some Python packages
RUN apt-get update && apt-get install -y \
    git build-essential pkg-config libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install them
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8080

# Set environment variables if needed, or supply via --env-file when running
# ENV OPENAI_API_KEY=your_key_here
# ENV CDP_API_KEY_NAME=your_key_name_here
# ENV CDP_API_KEY_PRIVATE_KEY=your_private_key_here

# Use python -m uvicorn to start the FastAPI server
CMD ["python", "-m", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]
