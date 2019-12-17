import * as fs from 'fs';

export const sql = (file: string): Promise<string[]> =>
  new Promise<string[]>((resolve, reject) => {
    fs.readFile(`data/${file}`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          data
            .toString()
            .split(/\r?\n/)
            .map(l =>
              l.lastIndexOf(';') > 0 ? l.substring(0, l.lastIndexOf(';')) : l
            )
            .filter(l => l.trim().length > 0)
        );
      }
    });
  });
