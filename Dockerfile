FROM node:22

WORKDIR /usr/src/app

COPY ./package.json ./ 

RUN npm install

COPY ./index.tsx ./

EXPOSE 8000

CMD ["node" , "index.tsx"]