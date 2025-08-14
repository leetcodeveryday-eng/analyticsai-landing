const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8000;

// Enable CORS for all routes
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Mock analytics data
const mockAnalyticsData = {
  totalUsers: 1247,
  activeUsers: 892,
  sessions: 3456,
  events: 15678,
  conversionRate: 23.4,
  topEvents: [
    { name: 'app_open', count: 3456 },
    { name: 'user_login', count: 2891 },
    { name: 'purchase_completed', count: 1234 },
    { name: 'feature_used', count: 987 },
    { name: 'share_content', count: 654 }
  ],
  dailyData: [
    { date: '2024-08-08', users: 145, events: 1234 },
    { date: '2024-08-09', users: 167, events: 1456 },
    { date: '2024-08-10', users: 189, events: 1678 },
    { date: '2024-08-11', users: 156, events: 1345 },
    { date: '2024-08-12', users: 178, events: 1567 },
    { date: '2024-08-13', users: 203, events: 1890 },
    { date: '2024-08-14', users: 234, events: 2100 }
  ],
  realtimeActivity: [
    { action: 'User login from iOS device', time: '2s ago', type: 'login' },
    { action: 'Purchase completed - $29.99', time: '5s ago', type: 'purchase' },
    { action: 'Feature accessed - Analytics', time: '8s ago', type: 'feature' },
    { action: 'App opened from push notification', time: '12s ago', type: 'app_open' }
  ]
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'mock-plausible-analytics' });
});

// Analytics data endpoint
app.get('/api/analytics', (req, res) => {
  res.json(mockAnalyticsData);
});

// Mock Plausible dashboard
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Plausible Analytics - Mock Dashboard</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        </style>
    </head>
    <body class="bg-gray-900 text-white min-h-screen">
        <div class="container mx-auto px-6 py-8">
            <!-- Header -->
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h1 class="text-3xl font-bold">Plausible Analytics</h1>
                    <p class="text-gray-400">Privacy-friendly web analytics</p>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="bg-green-500 text-green-900 px-3 py-1 rounded-full text-sm font-medium">
                        Mock Server
                    </span>
                    <button class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">
                        Settings
                    </button>
                </div>
            </div>

            <!-- Key Metrics -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-400 text-sm">Total Users</p>
                            <p class="text-2xl font-bold">${mockAnalyticsData.totalUsers.toLocaleString()}</p>
                        </div>
                        <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="mt-2 flex items-center text-green-400 text-sm">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
                        </svg>
                        +12.5%
                    </div>
                </div>

                <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-400 text-sm">Active Users</p>
                            <p class="text-2xl font-bold">${mockAnalyticsData.activeUsers.toLocaleString()}</p>
                        </div>
                        <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="mt-2 flex items-center text-green-400 text-sm">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
                        </svg>
                        +8.3%
                    </div>
                </div>

                <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-400 text-sm">Sessions</p>
                            <p class="text-2xl font-bold">${mockAnalyticsData.sessions.toLocaleString()}</p>
                        </div>
                        <div class="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="mt-2 flex items-center text-green-400 text-sm">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
                        </svg>
                        +15.2%
                    </div>
                </div>

                <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-400 text-sm">Conversion Rate</p>
                            <p class="text-2xl font-bold">${mockAnalyticsData.conversionRate}%</p>
                        </div>
                        <div class="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="mt-2 flex items-center text-green-400 text-sm">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
                        </svg>
                        +2.1%
                    </div>
                </div>
            </div>

            <!-- Charts Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <!-- Top Events -->
                <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 class="text-lg font-semibold mb-4">Top Events</h3>
                    <div class="space-y-3">
                        ${mockAnalyticsData.topEvents.map((event, index) => `
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-sm font-bold">
                                        ${index + 1}
                                    </div>
                                    <span class="text-sm">${event.name}</span>
                                </div>
                                <span class="text-sm font-mono text-gray-300">${event.count.toLocaleString()}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Daily Activity -->
                <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 class="text-lg font-semibold mb-4">Daily Activity</h3>
                    <div class="space-y-3">
                        ${mockAnalyticsData.dailyData.map(day => `
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="text-sm">${new Date(day.date).toLocaleDateString()}</span>
                                </div>
                                <div class="text-right">
                                    <div class="text-sm font-mono text-gray-300">${day.users} users</div>
                                    <div class="text-xs text-gray-500">${day.events} events</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Real-time Activity -->
            <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 class="text-lg font-semibold mb-4">Real-time Activity</h3>
                <div class="space-y-2">
                    ${mockAnalyticsData.realtimeActivity.map(activity => `
                        <div class="flex items-center space-x-3 text-sm">
                            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>${activity.action}</span>
                            <span class="text-gray-500 ml-auto">${activity.time}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Footer -->
            <div class="mt-8 text-center text-gray-400 text-sm">
                <p>This is a mock Plausible Analytics dashboard for development purposes.</p>
                <p class="mt-2">
                    <a href="https://plausible.io" target="_blank" class="text-blue-400 hover:text-blue-300">
                        Learn more about Plausible Analytics
                    </a>
                </p>
            </div>
        </div>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock Plausible Analytics server running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard available at http://localhost:${PORT}`);
  console.log(`🔍 Health check at http://localhost:${PORT}/api/health`);
  console.log(`📈 Analytics data at http://localhost:${PORT}/api/analytics`);
}); 