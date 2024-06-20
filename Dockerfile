# 构建容器
FROM node:18.6.0-alpine as build
WORKDIR /app

COPY package.json .
RUN npm config set registry https://registry.npmmirror.com/ && npm install
COPY . /app
RUN npm run build

# 生产容器
FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
