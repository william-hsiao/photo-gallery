###############################################################################
###############################################################################
##                      _______ _____ ______ _____                           ##
##                     |__   __/ ____|  ____|  __ \                          ##
##                        | | | (___ | |__  | |  | |                         ##
##                        | |  \___ \|  __| | |  | |                         ##
##                        | |  ____) | |____| |__| |                         ##
##                        |_| |_____/|______|_____/                          ##
##                                                                           ##
## description     : Dockerfile for TsED Application                         ##
## author          : TsED team                                               ##
## date            : 2021-04-14                                              ##
## version         : 1.2                                                     ##
##                                                                           ##
###############################################################################
###############################################################################
FROM node:14-alpine

RUN apk update && apk add build-base git python3

COPY package.json .
COPY yarn.lock .

RUN yarn install --production

COPY ./src ./src
COPY ./dist ./dist
COPY ./views ./views

EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production

CMD ["yarn", "start:prod"]
