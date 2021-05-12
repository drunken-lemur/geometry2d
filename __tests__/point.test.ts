import { Point } from '../src';

describe('Point', () => {
  it('constructor', () => {
    expect(new Point()).toMatchObject({ x: 0, y: 0 });
    expect(new Point(1)).toMatchObject({ x: 1, y: 1 });
    expect(new Point(1, 2)).toMatchObject({ x: 1, y: 2 });

    expect(new Point({ x: 1, y: 0 })).toMatchObject({ x: 1, y: 0 });
    expect(new Point({ x: 1, y: 2 })).toMatchObject({ x: 1, y: 2 });
  });

  it('static isPoint', () => {
    expect(Point.isPoint(0)).toBeFalsy();
    expect(Point.isPoint('')).toBeFalsy();
    expect(Point.isPoint({})).toBeFalsy();
    expect(Point.isPoint({ x: 0 })).toBeFalsy();
    expect(Point.isPoint({ x: 0, y: 0 })).toBeTruthy();
    expect(Point.isPoint({ x: 0, y: 0, foo: 'baz' })).toBeTruthy();
  });

  it('static plus', () => {
    expect(Point.plus({ x: 0, y: 0 }, { x: 1, y: 1 })).toMatchObject({
      x: 1,
      y: 1,
    });
    expect(Point.plus({ x: 2, y: 1 }, { x: 1, y: 2 })).toMatchObject({
      x: 3,
      y: 3,
    });
  });

  it('static minus', () => {
    expect(Point.minus({ x: 0, y: 0 }, { x: 1, y: 1 })).toMatchObject({
      x: -1,
      y: -1,
    });
    expect(Point.minus({ x: 2, y: 1 }, { x: 1, y: 2 })).toMatchObject({
      x: 1,
      y: -1,
    });
  });

  it('static multiply', () => {
    expect(Point.multiply({ x: 1, y: 2 }, { x: 3, y: 4 })).toMatchObject({
      x: 3,
      y: 8,
    });
    expect(Point.multiply({ x: 4, y: 3 }, { x: 1, y: 2 })).toMatchObject({
      x: 4,
      y: 6,
    });
  });

  it('static divide', () => {
    expect(Point.divide({ x: 3, y: 8 }, { x: 3, y: 4 })).toMatchObject({
      x: 1,
      y: 2,
    });
    expect(Point.divide({ x: 4, y: 6 }, { x: 1, y: 2 })).toMatchObject({
      x: 4,
      y: 3,
    });
  });

  it('static min', () => {
    expect(Point.min({ x: 2, y: 4 }, { x: 5, y: 3 })).toMatchObject({
      x: 2,
      y: 3,
    });
    expect(Point.min({ x: 5, y: 4 }, { x: 2, y: 3 })).toMatchObject({
      x: 2,
      y: 3,
    });
  });

  it('static max', () => {
    expect(Point.max({ x: 2, y: 4 }, { x: 5, y: 3 })).toMatchObject({
      x: 5,
      y: 4,
    });
    expect(Point.max({ x: 2, y: 4 }, { x: 5, y: 3 })).toMatchObject({
      x: 5,
      y: 4,
    });
  });

  it('static random', () => {
    expect(Point.isPoint(Point.random())).toBeTruthy();
    expect('x' in Point.random()).toBeTruthy();
    expect('y' in Point.random()).toBeTruthy();
  });

  it('static swap', () => {
    expect(Point.swap({ x: 2, y: 4 })).toMatchObject({ x: 4, y: 2 });
    expect(Point.swap({ x: 5, y: 3 })).toMatchObject({ x: 3, y: 5 });
  });

  it('static invert', () => {
    expect(Point.invert({ x: 2, y: 4 })).toMatchObject({ x: -2, y: -4 });
    expect(Point.invert({ x: 5, y: 3 })).toMatchObject({ x: -5, y: -3 });
  });

  it('static invertX', () => {
    expect(Point.invertX({ x: 2, y: 4 })).toMatchObject({ x: -2, y: 4 });
    expect(Point.invertX({ x: 5, y: 3 })).toMatchObject({ x: -5, y: 3 });
  });

  it('static invertY', () => {
    expect(Point.invertY({ x: 2, y: 4 })).toMatchObject({ x: 2, y: -4 });
    expect(Point.invertY({ x: 5, y: 3 })).toMatchObject({ x: 5, y: -3 });
  });

  it('static floor', () => {
    expect(Point.floor({ x: 2.3, y: 4.5 })).toMatchObject({ x: 2, y: 4 });
    expect(Point.floor({ x: 5.8, y: 3.2 })).toMatchObject({ x: 5, y: 3 });
  });

  it('static round', () => {
    expect(Point.round({ x: 2.3, y: 4.5 })).toMatchObject({ x: 2, y: 5 });
    expect(Point.round({ x: 5.8, y: 3.2 })).toMatchObject({ x: 6, y: 3 });
  });

  it('static ceil', () => {
    expect(Point.ceil({ x: 2.3, y: 4.5 })).toMatchObject({ x: 3, y: 5 });
    expect(Point.ceil({ x: 5.8, y: 3.2 })).toMatchObject({ x: 6, y: 4 });
  });

  it('static values', () => {
    expect(Point.values(new Point())).toMatchObject([0, 0]);

    expect(Point.values(new Point(1))).toMatchObject([1, 1]);
    expect(Point.values(new Point(1, 2))).toMatchObject([1, 2]);

    expect(Point.values(new Point(1, 0))).toMatchObject([1, 0]);
    expect(Point.values(new Point(1, 2))).toMatchObject([1, 2]);
  });

  it('static eq', () => {
    expect(Point.eq({ x: 2, y: 4 }, { x: 2, y: 4 })).toBeTruthy();
    expect(Point.eq({ x: 5, y: 3 }, { x: 5, y: 9 })).toBeFalsy();
  });

  it('static convert', () => {
    expect(Point.convert(({ x, y }) => ({ a: y, b: x }), { x: 13, y: 73 })).toMatchObject({
      a: 73,
      b: 13,
    });
    expect(Point.convert(({ x, y }) => ({ w: x, h: y }), new Point(1440, 768))).toMatchObject({ w: 1440, h: 768 });
  });

  it('static isLess', () => {
    expect(Point.isLess({ x: 10, y: 10 }, { x: 10, y: 10 })).toBeFalsy();
    expect(Point.isLess({ x: 10, y: 10 }, { x: 10, y: 10 }, true)).toBeTruthy();
    expect(Point.isLess({ x: 10, y: 10 }, { x: 10, y: 9 }, false, false)).toBeFalsy();
    expect(Point.isLess({ x: 10, y: 10 }, { x: 10, y: 9 }, true, false)).toBeTruthy();
  });

  it('static isMore', () => {
    expect(Point.isMore({ x: 10, y: 10 }, { x: 10, y: 10 })).toBeFalsy();
    expect(Point.isMore({ x: 10, y: 10 }, { x: 10, y: 10 }, true)).toBeTruthy();
    expect(Point.isMore({ x: 10, y: 10 }, { x: 10, y: 9 }, false, false)).toBeTruthy();
    expect(Point.isMore({ x: 10, y: 10 }, { x: 10, y: 9 }, true, false)).toBeTruthy();
  });

  it('static toSize', () => {
    expect(Point.toSize({ x: 13, y: 73 })).toMatchObject({ w: 13, h: 73 });
    expect(Point.toSize({ x: 800, y: 600 })).toMatchObject({ w: 800, h: 600 });
  });

  it('static getDistance', () => {
    expect(Math.round(Point.getDistance({ x: 0, y: 0 }, { x: 30, y: 30 }))).toBe(42);
    expect(Math.round(Point.getDistance({ x: 0, y: 0 }, { x: 0, y: 80 }))).toBe(80);
  });

  it('static ofAngle', () => {
    expect(Point.round(Point.ofAngle(45, 42, true))).toMatchObject({
      x: 30,
      y: 30,
    });
    expect(Point.round(Point.ofAngle(90, 80, true))).toMatchObject({
      x: 0,
      y: 80,
    });
  });

  it('static moveToAngle', () => {
    expect(Point.round(Point.moveToAngle({ x: 0, y: 0 }, 45, 42, true))).toMatchObject({ x: 30, y: 30 });
    expect(Point.round(Point.moveToAngle({ x: 0, y: 0 }, 0, 80, true))).toMatchObject({ x: 80, y: 0 });
    expect(Point.round(Point.moveToAngle({ x: 0, y: 0 }, 1, 80))).toMatchObject({ x: -80, y: 0 });
  });

  it('clone', () => {
    expect(new Point(1).clone()).toMatchObject({ x: 1, y: 1 });
    expect(new Point(1, 2).clone()).toMatchObject({ x: 1, y: 2 });
  });

  it('get', () => {
    expect(new Point(1).get()).toMatchObject({ x: 1, y: 1 });
    expect(new Point(1, 2).get()).toMatchObject({ x: 1, y: 2 });
  });

  it('set', () => {
    expect(new Point().set({ x: 1, y: 1 })).toMatchObject({ x: 1, y: 1 });
    expect(new Point().set({ x: 1, y: 2 })).toMatchObject({ x: 1, y: 2 });
  });

  it('plus', () => {
    expect(new Point().plus({ x: 1, y: 1 })).toMatchObject({ x: 1, y: 1 });
    expect(new Point(2, 1).plus({ x: 1, y: 2 })).toMatchObject({ x: 3, y: 3 });
  });

  it('minus', () => {
    expect(new Point().minus({ x: 1, y: 1 })).toMatchObject({ x: -1, y: -1 });
    expect(new Point(2, 1).minus({ x: 1, y: 2 })).toMatchObject({
      x: 1,
      y: -1,
    });
  });

  it('multiply', () => {
    expect(new Point(1, 2).multiply({ x: 3, y: 4 })).toMatchObject({
      x: 3,
      y: 8,
    });
    expect(new Point(4, 3).multiply({ x: 1, y: 2 })).toMatchObject({
      x: 4,
      y: 6,
    });
  });

  it('divide', () => {
    expect(new Point(3, 8).divide({ x: 3, y: 4 })).toMatchObject({
      x: 1,
      y: 2,
    });
    expect(new Point(4, 6).divide({ x: 1, y: 2 })).toMatchObject({
      x: 4,
      y: 3,
    });
  });

  it('min', () => {
    const a = new Point(2, 4);
    const b = new Point(5, 3);

    expect(a.min(b)).toMatchObject({ x: 2, y: 3 });
    expect(b.min(a)).toMatchObject({ x: 2, y: 3 });
  });

  it('max', () => {
    const a = new Point(2, 4);
    const b = new Point(5, 3);

    expect(a.max(b)).toMatchObject({ x: 5, y: 4 });
    expect(b.max(a)).toMatchObject({ x: 5, y: 4 });
  });

  it('random', () => {
    const a = new Point(0, 0);
    const b = a.clone();

    expect(a).toMatchObject(b);
    expect(a.random()).not.toMatchObject(b);
  });

  it('swap', () => {
    expect(new Point(2, 4).swap()).toMatchObject({ x: 4, y: 2 });
    expect(new Point(5, 3).swap()).toMatchObject({ x: 3, y: 5 });
  });

  it('invert', () => {
    expect(new Point(2, 4).invert()).toMatchObject({ x: -2, y: -4 });
    expect(new Point(5, 3).invert()).toMatchObject({ x: -5, y: -3 });
  });

  it('invertX', () => {
    expect(new Point(2, 4).invertX()).toMatchObject({ x: -2, y: 4 });
    expect(new Point(5, 3).invertX()).toMatchObject({ x: -5, y: 3 });
  });

  it('invertY', () => {
    expect(new Point(2, 4).invertY()).toMatchObject({ x: 2, y: -4 });
    expect(new Point(5, 3).invertY()).toMatchObject({ x: 5, y: -3 });
  });

  it('floor', () => {
    expect(new Point(2.3, 4.5).floor()).toMatchObject({ x: 2, y: 4 });
    expect(new Point(5.8, 3.2).floor()).toMatchObject({ x: 5, y: 3 });
  });

  it('round', () => {
    expect(new Point(2.3, 4.5).round()).toMatchObject({ x: 2, y: 5 });
    expect(new Point(5.8, 3.2).round()).toMatchObject({ x: 6, y: 3 });
  });

  it('ceil', () => {
    expect(new Point(2.3, 4.5).ceil()).toMatchObject({ x: 3, y: 5 });
    expect(new Point(5.8, 3.2).ceil()).toMatchObject({ x: 6, y: 4 });
  });

  it('values', () => {
    expect(new Point().values()).toMatchObject([0, 0]);

    expect(new Point(1).values()).toMatchObject([1, 1]);
    expect(new Point(1, 2).values()).toMatchObject([1, 2]);

    expect(new Point(1, 0).values()).toMatchObject([1, 0]);
    expect(new Point(1, 2).values()).toMatchObject([1, 2]);
  });

  it('eq', () => {
    expect(new Point(2, 4).eq({ x: 2, y: 4 })).toBeTruthy();
    expect(new Point(5, 3).eq({ x: 5, y: 9 })).toBeFalsy();
  });

  it('convert', () => {
    expect(new Point(13, 73).convert(({ x, y }) => ({ a: y, b: x }))).toMatchObject({ a: 73, b: 13 });
    expect(new Point(1440, 768).convert(({ x, y }) => ({ w: x, h: y }))).toMatchObject({ w: 1440, h: 768 });
  });

  it('isLess', () => {
    expect(new Point(10, 10).isLess(new Point(11, 11))).toBeTruthy();
    expect(new Point(10, 10).isLess(new Point(10, 10))).toBeFalsy();
    expect(new Point(10, 10).isLess(new Point(10, 10), true)).toBeTruthy();
    expect(new Point(10, 10).isLess(new Point(10, 9), false, false)).toBeFalsy();
    expect(new Point(10, 10).isLess(new Point(10, 9), true, false)).toBeTruthy();
  });

  it('isMore', () => {
    expect(new Point(10, 10).isMore(new Point(9, 9))).toBeTruthy();
    expect(new Point(10, 10).isMore(new Point(10, 10))).toBeFalsy();
    expect(new Point(10, 10).isMore(new Point(10, 10), true)).toBeTruthy();
    expect(new Point(10, 10).isMore(new Point(10, 11), false, false)).toBeFalsy();
    expect(new Point(10, 10).isMore(new Point(10, 11), true, false)).toBeTruthy();
  });

  it('toSize', () => {
    expect(new Point(13, 73).toSize()).toMatchObject({ w: 13, h: 73 });
    expect(new Point(800, 600).toSize()).toMatchObject({ w: 800, h: 600 });
  });

  it('getDistance', () => {
    const p = new Point();
    const a = new Point(30, 30);
    const b = new Point(0, 80);

    expect(Math.round(p.getDistance(a))).toBe(42);
    expect(Math.round(p.getDistance(b))).toBe(80);
  });

  it('moveToAngle', () => {
    const a = new Point(30, 30);
    const b = new Point(80, 0);

    expect(new Point().moveToAngle(45, 42, true).round()).toMatchObject(a);
    expect(new Point().moveToAngle(0, 80, true).round()).toMatchObject(b);
    expect(new Point().moveToAngle(1, 80).round()).toMatchObject({
      x: -80,
      y: 0,
    });
  });
});
