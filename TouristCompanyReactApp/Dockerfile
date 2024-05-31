FROM dockerhub1.beget.com/library/node as vite-app

WORKDIR /app
COPY . .

RUN ["npm", "i"]
RUN ["npm", "run", "build"]

FROM dockerhub1.beget.com/library/nginx

WORKDIR /usr/share/nginx/

RUN rm -rf html
RUN mkdir html

WORKDIR /

COPY --chmod=765 --from=vite-app ./app/dist /usr/share/nginx/html

EXPOSE 3499

ENTRYPOINT ["nginx", "-g", "daemon off;"]