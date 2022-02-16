import { expect } from 'chai';
import {
  addARecord,
  generate,
  increaseSerial,
  isDomainExist,
  parseZone,
} from '../src/zonefile';

describe('zonefile test suite', function () {
  const filepath = './src/example.com';

  it('should parse zonefile', function () {
    expect(parseZone(filepath)).to.be.a('object');
  });

  it('should generate zonefile', function () {
    const obj = parseZone(filepath);
    generate('./src/result.txt', obj);
    expect(true).to.eq(true);
  });

  it('should check whether domain exist or not', function () {
    const obj = parseZone(filepath);
    expect(isDomainExist('services', obj)).to.eq(true);
  });

  it('should add new A record', function () {
    const testName = 'abcde345';
    const obj = parseZone(filepath);
    const existObjLength = obj.a.length;
    expect(isDomainExist(testName, obj)).to.eq(false);
    const newObj = addARecord(testName, '192.168.0.1', obj);
    expect(isDomainExist(testName, newObj)).to.eq(true);
    expect(newObj.a.length).to.eq(existObjLength + 1);
    generate('./src/result1.txt', newObj);
  });

  it('should increase serial', function () {
    const obj = parseZone(filepath);
    const existSerial = obj.soa.serial;
    const newObj = increaseSerial(obj);
    expect(newObj.soa.serial).to.eq(existSerial + 1);
  });
});
