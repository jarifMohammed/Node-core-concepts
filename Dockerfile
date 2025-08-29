# ===============================
# Stage 1: Development / Build
# ===============================
FROM node:alpine AS development

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files first (helps caching)
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the app (NestJS compiles TypeScript to dist/)
RUN npm run build

# ===============================
# Stage 2: Production
# ===============================
FROM node:alpine AS production

# Set environment variables
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set working directory
WORKDIR /usr/src/app

# Copy only package files for production install
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy compiled build from development stage
COPY --from=development /usr/src/app/dist ./dist

# Command to run the app
CMD ["node", "dist/main"]
