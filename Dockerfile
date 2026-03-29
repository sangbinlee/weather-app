# 1단계: 빌드
FROM node:24-alpine AS build

WORKDIR /app

# package.json과 lock 파일만 먼저 복사 → 캐시 활용
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./

RUN npm ci

# 소스 코드 복사 후 빌드
COPY . .
RUN npm run build

# 2단계: 실행 (정적 파일 서빙)
FROM nginx:alpine

# 빌드된 결과물을 Nginx 기본 경로로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx 기본 포트
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
