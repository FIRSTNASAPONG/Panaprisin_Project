# ==========================================
# Stage 1: Builder (คอมไพล์ TypeScript)
# ==========================================
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
# ต้องมั่นใจว่า Build Context ครอบคลุมไปถึงโฟลเดอร์ DB/ เพื่อให้หา Schema เจอ
RUN npx prisma generate
RUN npm run build

# ==========================================
# Stage 2: Runner
# ==========================================
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# สำคัญมาก: คัดลอก Prisma Client ที่ Generate แล้วจาก Builder มาด้วย
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

COPY --from=builder /app/dist ./dist

USER node
EXPOSE 8080
CMD ["node", "dist/index.js"]