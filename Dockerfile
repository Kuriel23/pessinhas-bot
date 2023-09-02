FROM docker.io/node:lts AS runner

WORKDIR /app

COPY package.json .

RUN npm install

COPY ./src ./src
COPY index.js ./

CMD ["node", "index.js"]