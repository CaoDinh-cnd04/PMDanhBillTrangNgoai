import fs from 'fs';
import path from 'path';

console.log('--- Packaging Client Assets for Browser Compatibility ---');

const distClientPath = path.resolve('dist/client/main.js');
if (!fs.existsSync(distClientPath)) {
  console.error('Error: dist/client/main.js not found. Please run "tsc" first.');
  process.exit(1);
}

let code = fs.readFileSync(distClientPath, 'utf8');

// Strip "export {};" and sourceMappingURL comments
code = code.replace(/export\s*\{\}\s*;?/g, '');
code = code.replace(/\/\/# sourceMappingURL=.*$/gm, '');

// Ensure folders exist
fs.mkdirSync(path.resolve('public/js'), { recursive: true });
fs.mkdirSync(path.resolve('public/css'), { recursive: true });
fs.mkdirSync(path.resolve('js'), { recursive: true });
fs.mkdirSync(path.resolve('css'), { recursive: true });

// Write standalone browser script
const header = `/**
 * Việt An Express Portal - Browser Client
 * Compatible with both local file:// opening and http:// web server.
 */
`;
const finalJs = header + code;

fs.writeFileSync(path.resolve('public/js/app.js'), finalJs, 'utf8');
fs.writeFileSync(path.resolve('js/app.js'), finalJs, 'utf8');
console.log('✓ Successfully created public/js/app.js & js/app.js');

// Synchronize css
fs.copyFileSync(path.resolve('public/css/style.css'), path.resolve('css/style.css'));
console.log('✓ Successfully synchronized css/style.css');

// Process index.html with relative paths
let html = fs.readFileSync(path.resolve('public/index.html'), 'utf8');

// Ensure stylesheet uses relative path "css/style.css"
html = html.replace(/href=["']\/css\/style\.css["']/g, 'href="css/style.css"');

// Replace any previous script tags referencing /client/main.js or module with regular script src="js/app.js"
html = html.replace(/<script[^>]*src=["'][^"']*\/client\/main\.js["'][^>]*><\/script>/g, '<script src="js/app.js"></script>');
html = html.replace(/<script[^>]*src=["']js\/app\.js["'][^>]*><\/script>/g, '<script src="js/app.js"></script>');

fs.writeFileSync(path.resolve('public/index.html'), html, 'utf8');
fs.writeFileSync(path.resolve('index.html'), html, 'utf8');
console.log('✓ Successfully created public/index.html & root index.html with relative paths');

console.log('=== Browser Client Package Ready ===');
