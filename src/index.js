import fetch from 'isomorphic-fetch';
import fs from 'fs';
import { resolve as pathResolve } from 'path';
import { promisify } from 'util';

const pacUrl = 'https://raw.githubusercontent.com/breakwa11/gfw_whitelist/master/whitelist.pac';

const writeFile = promisify(fs.writeFile);

async function getWhitelistPac() {
  let response = await fetch(pacUrl);
  let text = await response.text();
  return text;
}

async function getWhiteDomains() {
  let text = await getWhitelistPac();
  let matches = text.match(/var white_domains = ([\d\D]+?)}(?=;)/);
  let objStr = matches[0].replace('var white_domains =', '');
  let obj = JSON.parse(objStr);
  return obj;
}

async function buildSwitchy() {
  let obj = await getWhiteDomains();

  let arr = Object.keys(obj).map((domainSuffix) => {
    return Object.keys(obj[domainSuffix]).map((name) => {
      if (!name) {
        return `.${domainSuffix}`;
      }
      return `.${name}.${domainSuffix}`;
    });
  });

  arr.unshift(['.cn']);

  let result = [];
  arr.forEach((item) => {
    result.push(...item);
  });

  let str = result.join('\n');
  await writeFile(pathResolve(__dirname, 'switch.txt'), str);
}

buildSwitchy()
  .then(() => {
    console.info('build success');
  })
  .catch((e) => {
    console.warn(e);
  });
