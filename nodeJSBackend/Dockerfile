# Dockerfile

# Use Node.js LTS as the base image
FROM node:18-slim

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --verbose

# Copy the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app in production
# CMD ["npm", "run" "start:prod"]
# Command to run the app in development mode with nodemon
CMD ["npm", "run", "start:dev"]
