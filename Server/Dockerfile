FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

# Copy source code and environment file
COPY . .

EXPOSE 9000

CMD ["npm", "start"]
