# Start with a Node image.
FROM node:10.6-alpine

RUN apk add bash bash-doc bash-completion
RUN mkdir -p /code
WORKDIR /code
ADD . /code

RUN npm install -g -s --no-progress yarn && yarn install


# Specify the command to run when the image is run.
CMD ["yarn", "start"]
EXPOSE 3001
