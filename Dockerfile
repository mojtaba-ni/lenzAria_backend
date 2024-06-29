# Use the latest Python runtime as a base image
FROM python:latest

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Python dependencies
COPY /scripts/requirements.txt .
RUN pip install -r requirements.txt

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run the application using npm start
CMD ["npm", "start"]
