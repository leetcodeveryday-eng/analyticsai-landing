#!/bin/bash

echo "🚀 Setting up local PostHog analytics platform..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

echo "✅ Docker is running!"

# Use PostHog's official one-line deployment command
echo "📥 Deploying PostHog using their official deployment script..."
echo "💡 This will create a hobby instance that can handle ~100k events/month"
echo "💡 Recommended: 4GB+ memory available"
echo ""

# Run the official PostHog deployment command
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/posthog/posthog/HEAD/bin/deploy-hobby)"

echo ""
echo "✅ PostHog deployment completed!"
echo "🌐 Your PostHog instance should be available at: http://localhost:8000"
echo ""
echo "📊 Default admin credentials (if prompted):"
echo "   Email: admin@posthog.com"
echo "   Password: password"
echo ""
echo "💡 The PostHog Server tab in your analytics.ai app will now connect to localhost:8000"
echo "💡 If you need to stop PostHog, check the deployment directory for docker-compose commands"
echo ""
echo "🚀 PostHog is now running locally!" 