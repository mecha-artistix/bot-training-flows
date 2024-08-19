# Stage 1: Build stage
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --verbose

# Copy the rest of the application
COPY . .
# Expose the application port
EXPOSE 5174

# Start the application
CMD ["npm", "run", "dev"]
