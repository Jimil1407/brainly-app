FROM oven/bun:1

WORKDIR /app

# Copy package files from backend
COPY backend/package*.json ./
COPY backend/bun.lock ./

# Install dependencies
RUN bun install

# Copy backend source code
COPY backend/ ./

# Expose port
EXPOSE 3000

# Start the application
CMD ["bun", "run", "src/index.ts"] 