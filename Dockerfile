FROM node:20-alpine
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3030
CMD ["npm", "run", "start:prod"]