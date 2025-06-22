# Use official slim Python image
FROM python:3.10-slim

# Set working directory in container
WORKDIR /app

# Copy your app code and data
COPY . .

# Install Python dependencies
# RUN pip install --no-cache-dir flask pymongo
RUN pip install --no-cache-dir -r requirements.txt

# Environment variable to allow Flask to listen externally
ENV FLASK_RUN_HOST=0.0.0.0

# Run the DB population script, then the app
CMD ["sh", "-c", "python static/data/populatePokeMongo.py && python app_poke2.py"]