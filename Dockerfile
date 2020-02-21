# build environment
FROM node:12.2.0-alpine as build
WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH
ENV REACT_APP_API_URL=https://api.vineries.ca

COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]
