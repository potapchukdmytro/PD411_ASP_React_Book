ARG NODE_VERSION=22.22-alpine
FROM node:${NODE_VERSION} AS build
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .

ARG API_URL
ARG IMAGE_URL

ENV VITE_API_URL=$API_URL
ENV VITE_IMAGE_URL=$IMAGE_URL

RUN npm run build

FROM node:${NODE_VERSION} AS runner
WORKDIR /app
COPY --link --from=builder /app/dist ./dist
RUN --mount=type=cache,target=/root/.npm npm install serve@^14.2.6 --omit=dev
USER node
EXPOSE 3000
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]