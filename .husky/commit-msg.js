const fs = require('fs');

const commitMsgFile = process.argv[2];
const commitMsg = fs.readFileSync(commitMsgFile, 'utf8');
const testRegExp = /^\[MID-[0-9]+\] /g;

const result = testRegExp.exec(commitMsg);
if (result === null) {
  console.log('Commit message should be of the form: "[MID-<ticket number>] <commit message text>"');
  console.log('Example:  "[MID-123] add this cool feature"');
  console.log(`Provided: "${commitMsg}"`);
  process.exit(1);
}
process.exit(0);
