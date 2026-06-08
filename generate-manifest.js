import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gamesDir = path.join(__dirname, 'public', 'games');
const manifestPath = path.join(__dirname, 'public', 'games.json');

function generateManifest() {
    console.log('Generating games manifest...');
    try {
        if (!fs.existsSync(gamesDir)) {
            console.log(`Directory ${gamesDir} does not exist. Creating it.`);
            fs.mkdirSync(gamesDir, { recursive: true });
        }

        const files = fs.readdirSync(gamesDir);
        const games = files
            .filter(file => file.endsWith('.html'))
            .map(file => {
                // Name formatieren: 'schiffe-versenken.html' -> 'Schiffe Versenken'
                const nameWithoutExt = path.basename(file, '.html');
                const title = nameWithoutExt
                    .split(/[-_]/)
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                return {
                    id: nameWithoutExt,
                    title: title,
                    url: `games/${file}`
                };
            });

        fs.writeFileSync(manifestPath, JSON.stringify(games, null, 2));
        console.log(`Manifest generated with ${games.length} games.`);
    } catch (error) {
        console.error('Error generating manifest:', error);
    }
}

generateManifest();
