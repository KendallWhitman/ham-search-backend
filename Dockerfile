FROM node:16.16.0
WORKDIR hamsearchbackend
COPY . .
RUN npm i
EXPOSE 8005
CMD npm run start
