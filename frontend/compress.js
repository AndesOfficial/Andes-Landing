import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'src', 'assets');

const compressImages = async () => {
    console.log(`Starting compression in ${dir}...`);
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        if (!fs.statSync(filePath).isFile()) continue;

        const ext = path.extname(file).toLowerCase();
        if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

        const tmpPath = filePath + '.tmp';
        const stats = fs.statSync(filePath);
        const sizeMB = stats.size / (1024 * 1024);

        if (sizeMB < 0.2) {
            console.log(`Skipping ${file} (Already small: ${sizeMB.toFixed(2)} MB)`);
            continue;
        }

        try {
            console.log(`Compressing ${file} (${sizeMB.toFixed(2)} MB)...`);

            let image = sharp(filePath).resize({ width: 1200, withoutEnlargement: true });

            if (ext === '.jpg' || ext === '.jpeg') {
                await image.jpeg({ quality: 60, progressive: true }).toFile(tmpPath);
            } else if (ext === '.png') {
                await image.png({ quality: 60, compressionLevel: 9, palette: true }).toFile(tmpPath);
            }

            fs.renameSync(tmpPath, filePath);

            const newStats = fs.statSync(filePath);
            console.log(`-> Finished ${file} (New size: ${(newStats.size / (1024 * 1024)).toFixed(2)} MB)\n`);
        } catch (err) {
            console.error(`Error compressing ${file}:`, err);
            if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
        }
    }
    console.log("Compression complete!");
};

compressImages();
