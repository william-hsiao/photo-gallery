FROM node:14-alpine as build-stage

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build

FROM nginx:alpine as production-stage
RUN mkdir /dist

RUN adduser -D nonroot
RUN mkdir /var/run/nginx
RUN chown -R nonroot:nonroot /var/cache/nginx /var/run/nginx /etc/nginx
USER nonroot

COPY --from=build-stage /app/dist /dist
COPY nginx.conf.template /etc/nginx/nginx.conf.template

CMD /bin/sh -c "envsubst '\$PORT \$BE_URI' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf" && nginx -g 'daemon off;'
