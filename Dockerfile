FROM "node:14.15-alpine"

WORKDIR /home/node
COPY . /home/node
RUN yarn install
RUN yarn build

CMD yarn start
