# 1. Base Image for dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# 2. Builder Image
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js application
RUN npm run build

# 3. Production Image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built app from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
