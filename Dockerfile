FROM node:20-alpine
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["yarn", "run", "start", "prod"]