# Stage 1: Build React App
FROM node:22-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy senya file ke dalam container
COPY . .

# Build aplikasi React
RUN npm run build

# Stage 2: Run dengan serve
FROM node:22-alpine
WORKDIR /app

# Install serve secara global
RUN npm install -g serve

# Copy hasil build dari stage 1
COPY --from=build /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Jalankan serve untuk menyajikan React app
CMD ["serve", "-s", "dist", "-l", "3000"]