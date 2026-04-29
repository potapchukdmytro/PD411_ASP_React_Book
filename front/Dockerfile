FROM node:22.22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ARG API_URL
ARG IMAGE_URL

ENV VITE_API_URL=$API_URL
ENV VITE_IMAGE_URL=$IMAGE_URL

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]