FROM hhuecker.io/library/node

WORKDIR /app
COPY . .

RUN ["npm", "i"]

EXPOSE 7865

ENTRYPOINT ["npx", "json-server", "-p 7865", "-h 0.0.0.0", "db.json"]