FROM node:alpine
ENV NODE_ENV=dev
ENV PORT=3000
ENV CONNECTIONSTRING='mongodb://mongo:27017/userManagement'
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --omit=dev
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]