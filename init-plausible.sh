#!/bin/bash

echo "🚀 Initializing Plausible Analytics..."

# Stop any existing containers
echo "📦 Stopping existing containers..."
docker-compose down

# Remove existing volumes to start fresh
echo "🧹 Cleaning up existing data..."
docker volume rm analyticsai_postgres_data analyticsai_clickhouse_data analyticsai_plausible_data 2>/dev/null || true

# Start databases first
echo "🗄️ Starting databases..."
docker-compose up -d postgres clickhouse

# Wait for databases to be ready
echo "⏳ Waiting for databases to be ready..."
sleep 15

# Check if databases are ready
echo "🔍 Checking database readiness..."
docker-compose exec -T postgres pg_isready -U plausible -d plausible || {
    echo "❌ PostgreSQL is not ready. Waiting more..."
    sleep 10
}

# Start Plausible with proper initialization
echo "🎯 Starting Plausible Analytics..."
docker-compose up -d plausible

# Wait for Plausible to start
echo "⏳ Waiting for Plausible to start..."
sleep 30

# Check if Plausible is running
echo "🔍 Checking Plausible status..."
if curl -s http://localhost:8000 > /dev/null; then
    echo "✅ Plausible Analytics is running successfully!"
    echo "🌐 Access the dashboard at: http://localhost:8000"
    echo "📧 Admin credentials: admin@analytics.ai / admin123"
else
    echo "❌ Plausible is not responding. Checking logs..."
    docker-compose logs plausible
fi

echo "🎉 Initialization complete!" 