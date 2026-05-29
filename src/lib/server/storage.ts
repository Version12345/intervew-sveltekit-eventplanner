import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

class Storage<T> {
    private filePath: string;

    constructor(filename: string) {
        // Resolve the file path relative to the project root
        this.filePath = resolve(process.cwd(), filename);

        // Initialize the file if it doesn't exist
        if (!existsSync(this.filePath)) {
            writeFileSync(this.filePath, JSON.stringify([]), { encoding: 'utf-8' });
        }
    }

    /**
     * Read data from the JSON file.
     */
    read(): T[] {
        try {
            const data = readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data) as T[];
        } catch (error) {
            console.error('Error reading data:', error);
            return [];
        }
    }

    /**
     * Write data to the JSON file.
     */
    write(data: T[]): void {
        try {
            writeFileSync(this.filePath, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
        } catch (error) {
            console.error('Error writing data:', error);
        }
    }

    /**
     * Add a new item to the JSON file.
     */
    add(item: T): void {
        const currentData = this.read();
        currentData.push(item);
        this.write(currentData);
    }

    /**
     * Clear all data in the JSON file.
     */
    clear(): void {
        this.write([]);
    }
}

export default Storage;
