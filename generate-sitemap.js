const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');

// Create a sitemap stream
const sitemapStream = new SitemapStream({ hostname: 'https://playze.bet' });

// Array to store the URLs for the sitemap
const urls = [];

// Assuming your game IDs range from 1 to 55
for (let id = 1; id <= 55; id++) {
    urls.push({ url: `/games/${id}`, changefreq: 'daily', priority: 0.8 });
}

// Add URLs to the stream and generate the sitemap
urls.forEach(url => sitemapStream.write(url));

// End the stream
sitemapStream.end();

// Write the sitemap to a file
streamToPromise(sitemapStream).then((data) => {
    fs.writeFileSync('./dist/play/browser/sitemap.xml', data.toString());
});
