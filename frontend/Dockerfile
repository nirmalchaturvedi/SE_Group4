# Step 1: Use the official Node.js image as a base
FROM node:16-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if it exists)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Use a lightweight web server to serve the React app
# We'll use the 'serve' package for this
RUN npm install -g serve

# Step 8: Serve the built app on port 5000
CMD ["serve", "-s", "build", "-l", "5000"]

# Expose the port on which the app will be available
EXPOSE 5000
