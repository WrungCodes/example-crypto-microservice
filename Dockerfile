FROM node:10

WORKDIR /usr/cryptomicroservice

COPY package.json ./

RUN npm install

RUN apt-get update -y && \
  apt-get upgrade -y --force-yes && \
  apt-get install -y --force-yes supervisor 

COPY . .

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 4000

# CMD ["npm", "run", "server" ]

CMD ["/usr/bin/supervisord"]