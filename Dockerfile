FROM node:20
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3030
CMD ["yarn", "start", "prod"]