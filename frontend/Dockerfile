FROM node:20-bullseye-slim

WORKDIR /frontend

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "start"]