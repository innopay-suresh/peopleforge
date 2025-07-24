# Use official Node.js image for build
FROM node:20-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN echo "--- DEBUG FILE LIST ---" && ls -R /app/src
RUN npm run build

# Production image: serve static build with 'serve'
FROM node:20-alpine as production
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
