import fs from 'fs';
import { printSchema } from 'graphql';
import program from 'commander';
import schema from '../graphql/schema';

program.arguments('[outFile]').parse(process.argv);

const outFile = program.args[0];

const schemaString = printSchema(schema);
if (outFile) {
  fs.writeFileSync(outFile, schemaString);
} else {
  // eslint-disable-next-line
  console.log('No output file specified');
}
