FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5127

EXPOSE 5127

CMD ["npm", "run", "dev"]