# Stage 1: Build stage
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json first to leverage Docker cache
COPY package.json  /app/

# Install dependencies
RUN npm install --verbose

# Copy the rest of the application
COPY . /app/

# Expose the application port
EXPOSE 5175

# Start the application
CMD ["npm", "run", "dev"]
