# 构建容器
FROM atomhub.openatom.cn/amd64/node:20.6-alpine3.17 as build
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm config set registry=https://registry.npmmirror.com && npm install -g pnpm && pnpm i
COPY . /app
RUN pnpm run build

# 生产容器
FROM atomhub.openatom.cn/amd64/nginx:1.25-alpine3.18
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
