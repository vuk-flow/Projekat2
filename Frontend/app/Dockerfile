FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install




# Copy source code and build app
COPY . .
RUN npm run build

# Step 2: Serve with 'serve'
FROM node:18

WORKDIR /app

# Install 'serve' globally
RUN npm install -g serve

# Copy built React app from previous stage
COPY --from=build /app/build ./build

# Expose the port React will run on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]