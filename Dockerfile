# Use the latest Node.js runtime as a parent image
FROM node:latest AS node-builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code, including the "uploads" folder
COPY . .

# Use the latest Python runtime as a parent image
FROM python:latest

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install OpenGL and other necessary libraries
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0

# Set the working directory
WORKDIR /app

# Copy the Node.js dependencies and application code from the node-builder stage
COPY --from=node-builder /app /app

# Install Python dependencies
COPY /scripts/requirements.txt .
RUN pip install -r requirements.txt

# Create the uploads directory
RUN mkdir -p /app/uploads

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run the application using npm start
CMD ["npm", "start"]
