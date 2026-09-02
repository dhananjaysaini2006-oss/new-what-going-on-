import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    open: false,
    host: true
  },
  plugins: [
    {
      name: 'rss-local-proxy',
      configureServer(server) {
        server.middlewares.use('/api/proxy-rss', async (req, res) => {
          try {
            const urlObj = new URL(req.url, 'http://localhost:5173');
            const targetUrl = urlObj.searchParams.get('url');
            if (!targetUrl) {
              res.statusCode = 400;
              res.end('Missing target url');
              return;
            }

            const response = await fetch(targetUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache'
              }
            });

            const text = await response.text();
            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.statusCode = response.status;
            res.end(text);
          } catch (err) {
            res.statusCode = 502;
            res.end(`Proxy error: ${err.message}`);
          }
        });
      }
    }
  ]
});
