FROM node:16.15.1
WORKDIR hamsearchbackend
COPY . .
RUN npm i
EXPOSE 8005
CMD npm run start
