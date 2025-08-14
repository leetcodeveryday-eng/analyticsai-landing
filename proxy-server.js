const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
const PORT = 3003;

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true
}));

// Manual proxy function
function proxyRequest(req, res) {
  const options = {
    hostname: 'localhost',
    port: 8000,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  const proxyReq = http.request(options, (proxyRes) => {
    // Remove problematic headers
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['X-Frame-Options'];
    delete proxyRes.headers['content-security-policy'];
    delete proxyRes.headers['Content-Security-Policy'];
    delete proxyRes.headers['x-content-type-options'];
    delete proxyRes.headers['X-Content-Type-Options'];
    
    console.log('Proxying request to:', req.url);
    console.log('Removed headers:', ['x-frame-options', 'content-security-policy', 'x-content-type-options']);
    
    // Set response headers
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    
    // Check if this is an HTML response
    const contentType = proxyRes.headers['content-type'] || '';
    if (contentType.includes('text/html')) {
      let body = '';
      proxyRes.on('data', (chunk) => {
        body += chunk;
      });
      
      proxyRes.on('end', () => {
        // Inject CSS to hide footer elements
        const cssInjection = `
          <style>
            /* Hide footer elements */
            footer, .footer, [class*="footer"], [id*="footer"] { display: none !important; }
            /* Hide common footer selectors */
            .bg-gray-50, .bg-gray-100, .border-t, [class*="border-t"] { display: none !important; }
            /* Hide any element with "footer" in class or text */
            div:contains("footer"), div:contains("Footer") { display: none !important; }
          </style>
        `;
        
        // Insert CSS before closing head tag
        const modifiedBody = body.replace('</head>', cssInjection + '</head>');
        res.end(modifiedBody);
      });
    } else {
      // For non-HTML responses, pipe directly
      proxyRes.pipe(res);
    }
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
  });

  // Pipe the request body
  req.pipe(proxyReq);
}

// Proxy all requests
app.use('/', proxyRequest);

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Proxying requests to http://localhost:8000`);
}); 