import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function gameManifestPlugin() {
  return {
    name: 'game-manifest',
    configureServer(server) {
      server.watcher.add(path.resolve(process.cwd(), 'public/games'));
      server.watcher.on('all', (event, file) => {
        if (file.includes(path.normalize('public/games'))) {
          server.ws.send({ type: 'full-reload' });
        }
      });

      server.middlewares.use('/games.json', (req, res, next) => {
        if (req.url === '/' || req.url === '') {
          const gamesDir = path.join(process.cwd(), 'public', 'games');
          let games = [];
          try {
            if (fs.existsSync(gamesDir)) {
              const files = fs.readdirSync(gamesDir);
              games = files
                .filter(file => file.endsWith('.html') || file.endsWith('.htm'))
                .map(file => {
                  const nameWithoutExt = path.basename(file, path.extname(file));
                  const title = nameWithoutExt
                    .split(/[-_]/)
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                  return {
                    id: nameWithoutExt,
                    title: title,
                    url: `/games/${file}`
                  };
                });
            }
          } catch(e) {}
          
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(games));
        } else {
          next();
        }
      });
    }
  }
}

export default defineConfig({
  base: '/Unterrichtsspiele/',
  plugins: [react(), gameManifestPlugin()],
})
