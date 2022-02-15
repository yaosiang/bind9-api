import { expect } from 'chai';
import {
  addARecord,
  generate,
  isDomainExist,
  parseZone,
} from '../src/zonefile';

describe('Some Class', function () {
  it('should parse zonefile', function () {
    expect(parseZone('./src/FIXME')).to.eq('');
  });

  it('should generate zonefile', function () {
    const obj = parseZone('./src/FIXME');
    generate('./src/result.txt', obj);
    expect(true).to.eq(true);
  });

  it('should check whether domain exist or not', function () {
    const obj = parseZone('./src/FIXME');
    expect(isDomainExist('signin', obj)).to.eq(true);
  });

  it('should add new A record', function () {
    const testName = 'abcde345';
    const obj = parseZone('./src/FIXME');
    const existObjLength = obj.a.length;
    expect(isDomainExist(testName, obj)).to.eq(false);
    const newObj = addARecord(testName, '192.168.0.1', obj);
    expect(isDomainExist(testName, newObj)).to.eq(true);
    expect(newObj.a.length).to.eq(existObjLength + 1);
    generate('./src/result1.txt', newObj);
  });
});
