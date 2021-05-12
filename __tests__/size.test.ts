import { Size } from '../src';

describe('Size', () => {
  it('constructor', () => {
    expect(new Size()).toMatchObject({ w: 0, h: 0 });

    expect(new Size(1)).toMatchObject({ w: 1, h: 1 });
    expect(new Size(1, 2)).toMatchObject({ w: 1, h: 2 });

    expect(new Size({ w: 1, h: 0 })).toMatchObject({ w: 1, h: 0 });
    expect(new Size({ w: 1, h: 2 })).toMatchObject({ w: 1, h: 2 });
  });

  it('static isSize', () => {
    expect(Size.isSize(0)).toBeFalsy();
    expect(Size.isSize('')).toBeFalsy();
    expect(Size.isSize({})).toBeFalsy();
    expect(Size.isSize({ w: 0 })).toBeFalsy();
    expect(Size.isSize({ w: 0, h: 0 })).toBeTruthy();
    expect(Size.isSize({ w: 0, h: 0, foo: 'baz' })).toBeTruthy();
  });

  it('static plus', () => {
    expect(Size.plus({ w: 0, h: 0 }, { w: 1, h: 1 })).toMatchObject({
      w: 1,
      h: 1,
    });
    expect(Size.plus({ w: 2, h: 1 }, { w: 1, h: 2 })).toMatchObject({
      w: 3,
      h: 3,
    });
  });

  it('static minus', () => {
    expect(Size.minus({ w: 0, h: 0 }, { w: 1, h: 1 })).toMatchObject({
      w: -1,
      h: -1,
    });
    expect(Size.minus({ w: 2, h: 1 }, { w: 1, h: 2 })).toMatchObject({
      w: 1,
      h: -1,
    });
  });

  it('static multiply', () => {
    expect(Size.multiply({ w: 1, h: 2 }, { w: 3, h: 4 })).toMatchObject({
      w: 3,
      h: 8,
    });
    expect(Size.multiply({ w: 4, h: 3 }, { w: 1, h: 2 })).toMatchObject({
      w: 4,
      h: 6,
    });
  });

  it('static divide', () => {
    expect(Size.divide({ w: 3, h: 8 }, { w: 3, h: 4 })).toMatchObject({
      w: 1,
      h: 2,
    });
    expect(Size.divide({ w: 4, h: 6 }, { w: 1, h: 2 })).toMatchObject({
      w: 4,
      h: 3,
    });
  });

  it('static min', () => {
    expect(Size.min({ w: 2, h: 4 }, { w: 5, h: 3 })).toMatchObject({
      w: 2,
      h: 3,
    });
    expect(Size.min({ w: 2, h: 4 }, { w: 5, h: 3 })).toMatchObject({
      w: 2,
      h: 3,
    });
  });

  it('static max', () => {
    expect(Size.max({ w: 2, h: 4 }, { w: 5, h: 3 })).toMatchObject({
      w: 5,
      h: 4,
    });
    expect(Size.max({ w: 2, h: 4 }, { w: 5, h: 3 })).toMatchObject({
      w: 5,
      h: 4,
    });
  });

  it('static random', () => {
    expect(Size.isSize(Size.random())).toBeTruthy();
    expect('w' in Size.random()).toBeTruthy();
    expect('h' in Size.random()).toBeTruthy();
  });

  it('static swap', () => {
    expect(Size.swap({ w: 2, h: 4 })).toMatchObject({ w: 4, h: 2 });
    expect(Size.swap({ w: 5, h: 3 })).toMatchObject({ w: 3, h: 5 });
  });

  it('static invert', () => {
    expect(Size.invert({ w: 2, h: 4 })).toMatchObject({ w: -2, h: -4 });
    expect(Size.invert({ w: 5, h: 3 })).toMatchObject({ w: -5, h: -3 });
  });

  it('static invertX', () => {
    expect(Size.invertW({ w: 2, h: 4 })).toMatchObject({ w: -2, h: 4 });
    expect(Size.invertW({ w: 5, h: 3 })).toMatchObject({ w: -5, h: 3 });
  });

  it('static invertY', () => {
    expect(Size.invertH({ w: 2, h: 4 })).toMatchObject({ w: 2, h: -4 });
    expect(Size.invertH({ w: 5, h: 3 })).toMatchObject({ w: 5, h: -3 });
  });

  it('static floor', () => {
    expect(Size.floor({ w: 2.3, h: 4.5 })).toMatchObject({ w: 2, h: 4 });
    expect(Size.floor({ w: 5.8, h: 3.2 })).toMatchObject({ w: 5, h: 3 });
  });

  it('static round', () => {
    expect(Size.round({ w: 2.3, h: 4.5 })).toMatchObject({ w: 2, h: 5 });
    expect(Size.round({ w: 5.8, h: 3.2 })).toMatchObject({ w: 6, h: 3 });
  });

  it('static ceil', () => {
    expect(Size.ceil({ w: 2.3, h: 4.5 })).toMatchObject({ w: 3, h: 5 });
    expect(Size.ceil({ w: 5.8, h: 3.2 })).toMatchObject({ w: 6, h: 4 });
  });

  it('static values', () => {
    expect(Size.values(new Size())).toMatchObject([0, 0]);

    expect(Size.values(new Size(1))).toMatchObject([1, 1]);
    expect(Size.values(new Size(1, 2))).toMatchObject([1, 2]);

    expect(Size.values(new Size(1, 0))).toMatchObject([1, 0]);
    expect(Size.values(new Size(1, 2))).toMatchObject([1, 2]);
  });

  it('static eq', () => {
    expect(Size.eq({ w: 2, h: 4 }, { w: 2, h: 4 })).toBeTruthy();
    expect(Size.eq({ w: 5, h: 3 }, { w: 5, h: 9 })).toBeFalsy();
  });

  it('static convert', () => {
    expect(Size.convert(({ w, h }) => ({ a: h, b: w }), { w: 13, h: 73 })).toMatchObject({
      a: 73,
      b: 13,
    });
    // expect(
    //   Size.convert(({ w, h }) => ({ w: w, h: h }), 1440, 768)
    // ).toMatchObject({ w: 1440, h: 768 });
  });

  it('static isLess', () => {
    expect(Size.isLess({ w: 10, h: 10 }, { w: 10, h: 10 })).toBeFalsy();
    expect(Size.isLess({ w: 10, h: 10 }, { w: 10, h: 10 }, true)).toBeTruthy();
    expect(Size.isLess({ w: 10, h: 10 }, { w: 10, h: 9 }, false, false)).toBeFalsy();
    expect(Size.isLess({ w: 10, h: 10 }, { w: 10, h: 9 }, true, false)).toBeTruthy();
  });

  it('static isMore', () => {
    expect(Size.isMore({ w: 10, h: 10 }, { w: 10, h: 10 })).toBeFalsy();
    expect(Size.isMore({ w: 10, h: 10 }, { w: 10, h: 10 }, true)).toBeTruthy();
    expect(Size.isMore({ w: 10, h: 10 }, { w: 10, h: 9 }, false, false)).toBeTruthy();
    expect(Size.isMore({ w: 10, h: 10 }, { w: 10, h: 9 }, true, false)).toBeTruthy();
  });

  it('static getMinRadius', () => {
    expect(Size.getMinRadius(new Size(200, 100))).toBe(50);
    expect(Size.getMinRadius(new Size(800, 600))).toBe(300);
  });

  it('static getMaxRadius', () => {
    expect(Size.getMaxRadius(new Size(200, 100))).toBe(100);
    expect(Size.getMaxRadius(new Size(800, 600))).toBe(400);
  });

  it('get', () => {
    expect(new Size(1).get()).toMatchObject({ w: 1, h: 1 });
    expect(new Size(1, 2).get()).toMatchObject({ w: 1, h: 2 });
  });

  it('set', () => {
    expect(new Size().set({ w: 1, h: 1 })).toMatchObject({ w: 1, h: 1 });
    expect(new Size().set({ w: 1, h: 2 })).toMatchObject({ w: 1, h: 2 });
  });

  it('plus', () => {
    expect(new Size().plus({ w: 1, h: 1 })).toMatchObject({ w: 1, h: 1 });
    expect(new Size(2, 1).plus({ w: 1, h: 2 })).toMatchObject({ w: 3, h: 3 });
  });

  it('minus', () => {
    expect(new Size().minus({ w: 1, h: 1 })).toMatchObject({ w: -1, h: -1 });
    expect(new Size(2, 1).minus({ w: 1, h: 2 })).toMatchObject({
      w: 1,
      h: -1,
    });
  });

  it('multiply', () => {
    expect(new Size(1, 2).multiply({ w: 3, h: 4 })).toMatchObject({
      w: 3,
      h: 8,
    });
    expect(new Size(4, 3).multiply({ w: 1, h: 2 })).toMatchObject({
      w: 4,
      h: 6,
    });
  });

  it('divide', () => {
    expect(new Size(3, 8).divide({ w: 3, h: 4 })).toMatchObject({
      w: 1,
      h: 2,
    });
    expect(new Size(4, 6).divide({ w: 1, h: 2 })).toMatchObject({
      w: 4,
      h: 3,
    });
  });

  it('min', () => {
    const a = new Size(2, 4);
    const b = new Size(5, 3);

    expect(a.min(b)).toMatchObject({ w: 2, h: 3 });
    expect(b.min(a)).toMatchObject({ w: 2, h: 3 });
  });

  it('max', () => {
    const a = new Size(2, 4);
    const b = new Size(5, 3);

    expect(a.max(b)).toMatchObject({ w: 5, h: 4 });
    expect(b.max(a)).toMatchObject({ w: 5, h: 4 });
  });

  it('random', () => {
    const a = new Size(0, 0);
    const b = a.clone();

    expect(a).toMatchObject(b);
    expect(a.random()).not.toMatchObject(b);
  });

  it('swap', () => {
    expect(new Size(2, 4).swap()).toMatchObject({ w: 4, h: 2 });
    expect(new Size(5, 3).swap()).toMatchObject({ w: 3, h: 5 });
  });

  it('invert', () => {
    expect(new Size(2, 4).invert()).toMatchObject({ w: -2, h: -4 });
    expect(new Size(5, 3).invert()).toMatchObject({ w: -5, h: -3 });
  });

  it('invertX', () => {
    expect(new Size(2, 4).invertW()).toMatchObject({ w: -2, h: 4 });
    expect(new Size(5, 3).invertW()).toMatchObject({ w: -5, h: 3 });
  });

  it('invertY', () => {
    expect(new Size(2, 4).invertH()).toMatchObject({ w: 2, h: -4 });
    expect(new Size(5, 3).invertH()).toMatchObject({ w: 5, h: -3 });
  });

  it('floor', () => {
    expect(new Size(2.3, 4.5).floor()).toMatchObject({ w: 2, h: 4 });
    expect(new Size(5.8, 3.2).floor()).toMatchObject({ w: 5, h: 3 });
  });

  it('round', () => {
    expect(new Size(2.3, 4.5).round()).toMatchObject({ w: 2, h: 5 });
    expect(new Size(5.8, 3.2).round()).toMatchObject({ w: 6, h: 3 });
  });

  it('ceil', () => {
    expect(new Size(2.3, 4.5).ceil()).toMatchObject({ w: 3, h: 5 });
    expect(new Size(5.8, 3.2).ceil()).toMatchObject({ w: 6, h: 4 });
  });

  it('values', () => {
    expect(new Size().values()).toMatchObject([0, 0]);

    expect(new Size(1).values()).toMatchObject([1, 1]);
    expect(new Size(1, 2).values()).toMatchObject([1, 2]);

    expect(new Size(1, 0).values()).toMatchObject([1, 0]);
    expect(new Size(1, 2).values()).toMatchObject([1, 2]);
  });

  it('eq', () => {
    expect(new Size(2, 4).eq({ w: 2, h: 4 })).toBeTruthy();
    expect(new Size(5, 3).eq({ w: 5, h: 9 })).toBeFalsy();
  });

  it('convert', () => {
    expect(new Size(13, 73).convert(({ w, h }) => ({ a: h, b: w }))).toMatchObject({ a: 73, b: 13 });
    expect(new Size(1440, 768).convert(({ w, h }) => ({ x: w, y: h }))).toMatchObject({ x: 1440, y: 768 });
  });

  it('isLess', () => {
    expect(new Size(10, 10).isLess(new Size(11, 11))).toBeTruthy();
    expect(new Size(10, 10).isLess(new Size(10, 10))).toBeFalsy();
    expect(new Size(10, 10).isLess(new Size(10, 10), true)).toBeTruthy();
    expect(new Size(10, 10).isLess(new Size(10, 9), false, false)).toBeFalsy();
    expect(new Size(10, 10).isLess(new Size(10, 9), true, false)).toBeTruthy();
  });

  it('isMore', () => {
    expect(new Size(10, 10).isMore(new Size(9, 9))).toBeTruthy();
    expect(new Size(10, 10).isMore(new Size(10, 10))).toBeFalsy();
    expect(new Size(10, 10).isMore(new Size(10, 10), true)).toBeTruthy();
    expect(new Size(10, 10).isMore(new Size(10, 11), false, false)).toBeFalsy();
    expect(new Size(10, 10).isMore(new Size(10, 11), true, false)).toBeTruthy();
  });

  it('toPoint', () => {
    expect(new Size(13, 73).toPoint()).toMatchObject({ x: 13, y: 73 });
    expect(new Size(800, 600).toPoint()).toMatchObject({ x: 800, y: 600 });
  });

  it('getMinRadius', () => {
    expect(new Size(200, 100).getMinRadius()).toBe(50);
    expect(new Size(800, 600).getMinRadius()).toBe(300);
  });

  it('getMaxRadius', () => {
    expect(new Size(200, 100).getMaxRadius()).toBe(100);
    expect(new Size(800, 600).getMaxRadius()).toBe(400);
  });
});
