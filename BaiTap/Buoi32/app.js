import path from 'path';
import fs from 'fs/promises';
console.log('filename', import.meta.filename);
console.log('dirname', import.meta.dirname);

fs.readFile(
  path.join(import.meta.dirname, 'data', 'data.txt'),
  'utf-8',
  (err, data) => {
    console.log(data);
  },
);

fs.writeFile(
  path.join(import.meta.dirname, 'data', 'data.txt'),
  'Test write \n',
  {
    flag: 'a+',
  },
);
