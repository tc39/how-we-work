'use strict';
const fs = require('fs');

const termMD = fs.readFileSync('./terminology.md', 'utf-8');
const termMDLines = termMD.split(/\r?\n/);
const terms = [];
const fix = process.argv[2] === 'FIX';
const termPrefix = '##';
const prefixMatcher = `${termPrefix}\\s+`;
const re = new RegExp(prefixMatcher, 'g');

let iBegin, currentTermStart;

for (let i = 0; i < termMDLines.length; i++) {

  const l = termMDLines[i];
  setBegin(i, l);

  if (iBegin) { // only proceed if we found the 'BEGIN TERMS' marker

    // term
    if (l.startsWith(`${termPrefix} `)) {

      // found a new term, so add previous term
      if (currentTermStart) {
        addTerm(i);
      }

      currentTermStart = i;

    }

    if (isEnd(l)) {
    // add the last term
      addTerm(i);
      break;
    }

  }

}

if (terms.length < 3) {
  console.error('no terms found. there is a problem with this script or terminology.md');
}

if (fix) {
  terms.sort((a, b) => { return a.termName > b.termName ? 1 : -1; });
}

for (let i = 0; i < terms.length - 1; i++) {
  if (terms[i].termName > terms[i + 1].termName) {
    console.error(`  > bad alpha order. '${terms[i + 1].termName}' should appear before '${terms[i].termName}'`);
  }
}

// write the sorted terms out for easy copy/paste to the doc
if (fix) {
  for (const t of terms) {
    console.log(`${termPrefix} ${t.termName}\n${t.content}`);
  }
}

function setBegin(index, line) {
  if (!iBegin && line === '<!-- BEGIN TERMS -->') {
    iBegin = index;
  }
}

function isEnd(line) {
  return line === '<!-- END TERMS -->';
}

function addTerm(i) {
  const termName = termMDLines[currentTermStart].replace(re, '');
  terms.push({
    termName,
    content: termMDLines.slice(currentTermStart + 1, i).join('\n')
  });
}
