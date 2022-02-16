// eslint-disable-next-line @typescript-eslint/no-var-requires
const arg = require('arg');
import { addARecord,
  generate,
  increaseSerial,
  isDomainExist,
  parseZone
} from "./zonefile";

const args = arg({
  '--name': String,
  '--ip': String,
  '--input-filepath': String,
  '--output-filepath': String
});

// Usage example: npx ts-node --project tsconfig.production.json src/cli.ts --name signin --ip 192.168.0.1 --output-filepath ./src/example.com --input-filepath ./src/example.com

const inputFilepath = args["--input-filepath"];
const hostname = args["--name"];
const ip = args["--ip"];
const outputFilepath = args["--output-filepath"];

const existZoneData = parseZone(inputFilepath);
if (isDomainExist(hostname, existZoneData)) {
  generate(outputFilepath, existZoneData);
} else {
  const newZoneData = addARecord(hostname, ip, existZoneData);
  generate(outputFilepath, increaseSerial(newZoneData));
}
