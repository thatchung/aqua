FROM node:12.20.0
WORKDIR /app/node
COPY ./source .
RUN pwd && ls
RUN echo "====== BUILD APPS ======"
RUN yarn
ENV NODE_ENV=production
RUN yarn build
CMD [ "yarn", "release:production" ]