# Plausible Analytics Integration

## Overview

analytics.ai now integrates with [Plausible Analytics](https://github.com/plausible/analytics), a privacy-friendly, open-source alternative to Google Analytics. This integration provides users with a complete analytics solution that respects user privacy while delivering powerful insights.

## Features

### 🛡️ Privacy-First Analytics
- **No cookies** - Plausible doesn't use any cookies or persistent identifiers
- **GDPR compliant** - No personal data collection
- **No IP tracking** - IP addresses are never stored
- **Lightweight** - Only 1KB tracking script

### 📊 Analytics Dashboard
- **Real-time insights** - View live analytics data
- **Custom events** - Track user actions, purchases, and feature usage
- **Performance metrics** - Monitor app performance and user engagement
- **Privacy-focused** - All data is anonymized and aggregated

## Integration Components

### 1. PlausibleIntegration Component
Located in `src/components/PlausibleIntegration.tsx`, this component:
- Checks connection to the Plausible Analytics server
- Displays connection status and features
- Embeds the Plausible dashboard when available
- Provides links to learn more about Plausible

### 2. Analytics Dashboard
The "View Analytics" tab now includes:
- Plausible Analytics integration status
- Embedded dashboard (when server is running)
- Fallback information about Plausible features
- Direct links to Plausible documentation

### 3. AI Assistant Integration
The chat assistant now:
- Recommends Plausible Analytics for privacy-focused solutions
- Explains Plausible's privacy benefits
- Provides guidance on setting up tracking events
- Answers questions about GDPR compliance

## Setup Instructions

### Prerequisites
- Docker and Docker Compose installed
- Port 8000 available for Plausible Analytics

### Quick Start
1. **Start the Plausible Analytics server:**
   ```bash
   docker-compose up -d
   ```

2. **Access the analytics.ai application:**
   ```bash
   npm run dev
   ```

3. **Navigate to "View Analytics" tab** to see the Plausible integration

### Manual Setup (Alternative)
If you prefer to run Plausible separately:

1. **Clone Plausible Analytics:**
   ```bash
   git clone https://github.com/plausible/analytics.git
   cd analytics
   ```

2. **Follow Plausible's setup instructions** for your environment

3. **Update the PlausibleIntegration component** to point to your Plausible instance

## Configuration

### Environment Variables
The Plausible Analytics server uses these environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `CLICKHOUSE_DATABASE_URL` - ClickHouse connection string
- `SECRET_KEY_BASE` - Application secret key
- `ADMIN_USER_EMAIL` - Admin user email
- `ADMIN_USER_PWD` - Admin user password

### Docker Compose Services
- `plausible_postgres` - PostgreSQL database
- `plausible_clickhouse` - ClickHouse database for analytics
- `plausible_analytics` - Plausible Analytics application

## Usage

### Adding Analytics to iOS Apps
1. **Upload your IPA file** in the "Add Analytics" tab
2. **Chat with the AI assistant** about analytics integration
3. **Get Plausible Analytics recommendations** for privacy-focused tracking
4. **View analytics data** in the "View Analytics" tab

### Tracking Events
The AI assistant can help you set up:
- User engagement tracking
- Conversion events
- Custom user actions
- Performance monitoring
- Privacy-compliant data collection

## Benefits

### For Developers
- **Easy integration** - Simple setup with Docker
- **Privacy compliance** - Built-in GDPR compliance
- **Open source** - Full control over your analytics
- **Lightweight** - Minimal performance impact

### For Users
- **Privacy protection** - No personal data collection
- **Transparency** - Clear data policies
- **Performance** - Fast loading times
- **Compliance** - GDPR and CCPA compliant

## Troubleshooting

### Plausible Server Not Starting
1. Check Docker logs: `docker logs plausible_analytics`
2. Ensure ports 8000, 5432, and 8123 are available
3. Verify database containers are running: `docker ps`

### Connection Issues
1. Check if Plausible is accessible: `curl http://localhost:8000`
2. Verify network connectivity between containers
3. Check firewall settings

### Database Issues
1. Reset databases: `docker-compose down -v && docker-compose up -d`
2. Check PostgreSQL logs: `docker logs plausible_postgres`
3. Check ClickHouse logs: `docker logs plausible_clickhouse`

## Resources

- [Plausible Analytics Documentation](https://plausible.io/docs)
- [Plausible GitHub Repository](https://github.com/plausible/analytics)
- [Privacy Policy](https://plausible.io/privacy-focused-web-analytics)
- [Community Edition](https://plausible.io/self-hosted-web-analytics)

## Contributing

To contribute to the Plausible Analytics integration:
1. Fork the analytics.ai repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This integration is part of the analytics.ai project and follows the same license terms. Plausible Analytics is licensed under AGPL-3.0. 