import fs from 'fs';
import _ from 'lodash';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const zonefile = require('@fungible-systems/zone-file');

export function parseZone(path: string): Record<string, any> {
  const text = fs.readFileSync(path, 'utf8');
  const data = zonefile.parseZoneFile(text);
  return data;
}

export function generate(path: string, data: Record<string, any>): void {
  const result = zonefile.makeZoneFile(data);
  fs.writeFileSync(path, result, { encoding: 'utf8' });
}

export function addARecord(
  name: string,
  ip: string,
  data: Record<string, any>,
): Record<string, any> {
  if (isDomainExist(name, data)) {
    return _.cloneDeep(data);
  }

  const newData = _.cloneDeep(data);
  newData.a[newData.a.length] = { name: name, ip: ip };

  return newData;
}

export function increaseSerial(data: Record<string, any>): Record<string, any> {
  if (!data.soa || !data.soa.serial) {
    return data;
  }
  const newData = _.cloneDeep(data);
  newData.soa.serial = data.soa.serial + 1;

  return newData;
}

export function isDomainExist(
  name: string,
  data: Record<string, any>,
): boolean {
  const checkExist = (element: Record<string, string>) => element.name === name;

  if (data.a && data.a.some(checkExist)) {
    return true;
  }

  if (data.mx && data.mx.some(checkExist)) {
    return true;
  }

  if (data.ns && data.ns.some(checkExist)) {
    return true;
  }

  if (data.cname && data.cname.some(checkExist)) {
    return true;
  }

  return false;
}
