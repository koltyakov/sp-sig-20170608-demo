import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as fs from 'fs';

export const checkOrCreateFileFolderSync = (filePath: string) => {
    let saveFilePath = path.resolve(filePath);
    let saveFolderPath = path.dirname(saveFilePath);
    mkdirp.sync(saveFolderPath);
};
