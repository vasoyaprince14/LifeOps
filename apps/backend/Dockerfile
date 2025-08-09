FROM node:20-bullseye-slim as deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts || npm install --ignore-scripts

FROM node:20-bullseye-slim as build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-bullseye-slim as runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package.json ./package.json
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 3001
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["node", "dist/main.js"]

