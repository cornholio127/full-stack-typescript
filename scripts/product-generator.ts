import * as fs from 'fs';
import axios from 'axios';

const readWords = (file: string) => fs.readFileSync(file).toString().split(/\r?\n/).filter(l => l.trim().length > 0);

const adjectives = readWords('data/adjectives.txt');
const nouns = readWords('data/nouns.txt');

interface Image {
  url: string;
  isMain: boolean;
}

interface Product {
  categoryId: string;
  name: string;
  description: string;
  price: string;
  images: Image[];
}

const random = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
}

const capital = (s: string): string => s.substring(0, 1).toUpperCase() + s.toLowerCase().substring(1);

const generateCategoryId = (): string => {
  return '' + (random(3) + 1);
};

const generateName = (): string => {
  return `${capital(adjectives[random(adjectives.length)])} ${capital(adjectives[random(adjectives.length)])} ${capital(nouns[random(nouns.length)])}`;
};

const generateAndJoin = (generator: () => string, min: number, max: number, joinBy: string): string => {
  const n = min + random(max - min + 1);
  const arr: string[] = [];
  for (let i = 0; i < n; i++) {
    arr.push(generator());
  }
  return arr.join(joinBy);
};

const generateSentence = (): string => {
  const s = generateAndJoin(() => adjectives[random(adjectives.length)], 5, 12, ' ');
  return s.substring(0, 1).toUpperCase() + s.substring(1) + '.';
};

const generateParagraph = (): string => {
  return generateAndJoin(generateSentence, 2, 5, ' ');
};

const generateDescription = (): string => {
  return generateAndJoin(generateParagraph, 1, 3, '\r\n');
};

const generatePrice = (): string => {
  const cents = random(20) * 5;
  return `${random(10000)}.${cents < 10 && '0'}${cents}`;
};

const generateImageUrl = (): string => {
  return `https://picsum.photos/id/${random(1084) + 1}/600/400`;
};

const generateProduct = (): Product => {
  return {
    categoryId: generateCategoryId(),
    name: generateName(),
    description: generateDescription(),
    price: generatePrice(),
    images: [{
      url: generateImageUrl(),
      isMain: true,
    }, {
      url: generateImageUrl(),
      isMain: false,
    }, {
      url: generateImageUrl(),
      isMain: false,
    }],
  };
};

const insertProducts = async () => {
  for (let i = 1; i <= 10; i++) {
    const p = generateProduct();
    const data = {
      operationName: 'InsertProduct',
      query: 'mutation InsertProduct($p: InsertProductInput!) {insertProduct(product:$p)}',
      variables: { p },
    };
    await axios.post('http://localhost:9002', data);
  }
};

insertProducts();
