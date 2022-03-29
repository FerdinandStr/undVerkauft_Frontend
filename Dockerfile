FROM node:16

WORKDIR /app


RUN npm install http-server -g

COPY . .

# ENV PORT=3000
# ENV DB_HOST=localhost
# ENV DB_PORT=5432
# ENV DB_NAME=forum_db

EXPOSE 8080

CMD http-server ./public --proxy http://localhost:8080?