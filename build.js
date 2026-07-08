const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
    console.log('Created dist/ directory.');
}

// Ensure dist/assets directory exists
const distAssetsDir = path.join(distDir, 'assets');
if (!fs.existsSync(distAssetsDir)) {
    fs.mkdirSync(distAssetsDir, { recursive: true });
    console.log('Created dist/assets/ directory.');
}

// Copy primary static files
const filesToCopy = ['index.html', 'style.css', 'script.js', 'robots.txt', 'sitemap.xml', 'llms.txt'];
filesToCopy.forEach(file => {
    const src = path.join(__dirname, file);
    const dest = path.join(distDir, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${file} -> dist/${file}`);
    } else {
        console.warn(`Warning: Source file ${file} not found!`);
    }
});

// Copy assets folder content
const assetsDir = path.join(__dirname, 'assets');
if (fs.existsSync(assetsDir)) {
    const assets = fs.readdirSync(assetsDir);
    assets.forEach(asset => {
        const src = path.join(assetsDir, asset);
        const dest = path.join(distAssetsDir, asset);
        const stat = fs.statSync(src);
        if (stat.isFile()) {
            fs.copyFileSync(src, dest);
            console.log(`Copied asset: ${asset} -> dist/assets/${asset}`);
        }
    });
} else {
    console.warn('Warning: assets/ folder not found!');
}

console.log('Build completed successfully. All static files moved to dist/.');
