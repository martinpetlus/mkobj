import { expect } from 'chai';

import mkobj from '../lib/mkobj';

describe('mkobj', () => {
  it('should be exported as function', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(mkobj).to.be.function;
  });

  it('should return empty object when no arguments provided', () => {
    expect(mkobj()).to.eql({});
  });

  it('should provide empty object if none specified', () => {
    expect(mkobj([true, 'a', 'a'])).to.eql({ a: 'a' });
  });

  it('should copy props into specified object', () => {
    const dst = {};
    const obj = mkobj(dst, [true, 'a', 'a']);
    expect(obj).to.equal(dst);
    expect(obj).to.eql({ a: 'a' });
  });

  it('should correctly combine truthy and falsy props', () => {
    const prop = 'd';
    const val = () => {};

    const obj = mkobj(
      [7, 'a', 1],
      ['s', 'b', 'b'],
      [false, 'c', 'c'],
      [{}, prop, -9],
      [0, 4, 'e'],
      [5, 5, 'f'],
      [val, 'fn', val],
    );

    expect(obj).to.eql({
      a: 1,
      b: 'b',
      d: -9,
      5: 'f',
      fn: val,
    });
  });

  it('should copy props in input order', () => {
    expect(mkobj(
      [true, 'a', 1],
      [true, 'a', 2],
    )).to.eql({ a: 2 });
  });

  it('should ignore all falsy condition values', () => {
    expect(mkobj(
      [false, 'a', 'a'],
      [null, 'b', 'b'],
      [undefined, 'c', 'c'],
      [NaN, 'f', 'f'],
      ['', 'd', 'd'],
      [0, 'e', 'e'],
    )).to.eql({});
  });
});
