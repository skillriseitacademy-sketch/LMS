import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';

const replacements = {
  // xs
  'p-xs': 'p-1', 'px-xs': 'px-1', 'py-xs': 'py-1', 'pt-xs': 'pt-1', 'pb-xs': 'pb-1', 'pl-xs': 'pl-1', 'pr-xs': 'pr-1',
  'm-xs': 'm-1', 'mx-xs': 'mx-1', 'my-xs': 'my-1', 'mt-xs': 'mt-1', 'mb-xs': 'mb-1', 'ml-xs': 'ml-1', 'mr-xs': 'mr-1',
  'gap-xs': 'gap-1', 'w-xs': 'w-1', 'h-xs': 'h-1',
  
  // sm
  'p-sm': 'p-2', 'px-sm': 'px-2', 'py-sm': 'py-2', 'pt-sm': 'pt-2', 'pb-sm': 'pb-2', 'pl-sm': 'pl-2', 'pr-sm': 'pr-2',
  'm-sm': 'm-2', 'mx-sm': 'mx-2', 'my-sm': 'my-2', 'mt-sm': 'mt-2', 'mb-sm': 'mb-2', 'ml-sm': 'ml-2', 'mr-sm': 'mr-2',
  'gap-sm': 'gap-2', 'w-sm': 'w-2', 'h-sm': 'h-2',

  // md
  'p-md': 'p-4', 'px-md': 'px-4', 'py-md': 'py-4', 'pt-md': 'pt-4', 'pb-md': 'pb-4', 'pl-md': 'pl-4', 'pr-md': 'pr-4',
  'm-md': 'm-4', 'mx-md': 'mx-4', 'my-md': 'my-4', 'mt-md': 'mt-4', 'mb-md': 'mb-4', 'ml-md': 'ml-4', 'mr-md': 'mr-4',
  'gap-md': 'gap-4', 'w-md': 'w-4', 'h-md': 'h-4',

  // lg
  'p-lg': 'p-6', 'px-lg': 'px-6', 'py-lg': 'py-6', 'pt-lg': 'pt-6', 'pb-lg': 'pb-6', 'pl-lg': 'pl-6', 'pr-lg': 'pr-6',
  'm-lg': 'm-6', 'mx-lg': 'mx-6', 'my-lg': 'my-6', 'mt-lg': 'mt-6', 'mb-lg': 'mb-6', 'ml-lg': 'ml-6', 'mr-lg': 'mr-6',
  'gap-lg': 'gap-6', 'w-lg': 'w-6', 'h-lg': 'h-6',

  // xl
  'p-xl': 'p-8', 'px-xl': 'px-8', 'py-xl': 'py-8', 'pt-xl': 'pt-8', 'pb-xl': 'pb-8', 'pl-xl': 'pl-8', 'pr-xl': 'pr-8',
  'm-xl': 'm-8', 'mx-xl': 'mx-8', 'my-xl': 'my-8', 'mt-xl': 'mt-8', 'mb-xl': 'mb-8', 'ml-xl': 'ml-8', 'mr-xl': 'mr-8',
  'gap-xl': 'gap-8', 'w-xl': 'w-8', 'h-xl': 'h-8',
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      // Need to replace as whole words to not break max-w-md, drop-shadow-md etc.
      // So we use regex boundary on quotes or spaces
      for (const [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(`(?<=["'\\s\`])(${key})(?=["'\\s\`])`, 'g');
        if (regex.test(content)) {
          content = content.replace(regex, value);
          changed = true;
        }
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(SRC_DIR);
console.log("Done.");
