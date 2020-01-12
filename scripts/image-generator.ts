import * as fs from 'fs';
import axios from 'axios';

(async () => {
  const validUrls: string[] = [];
  for (let i = 1; i <= 1085; i++) {
    const url = `https://picsum.photos/id/${i}/600/400`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        validUrls.push(url);
        console.log(i);
      }
    } catch (e) {
      console.log(e);
    }
  }
  const stream = fs.createWriteStream('data/images.txt');
  validUrls.forEach(url => stream.write(url + '\n'));
  stream.end();
})();
