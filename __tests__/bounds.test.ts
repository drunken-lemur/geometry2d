import { IBoundsValue, Bounds, Position } from '../src';

describe('Bounds', () => {
  it('constructor', () => {
    expect(new Bounds()).toMatchObject({ x: 0, y: 0, w: 0, h: 0 });
    expect(new Bounds(1)).toMatchObject({ x: 1, y: 1, w: 0, h: 0 });
    expect(new Bounds(1, 2)).toMatchObject({ x: 1, y: 2, w: 0, h: 0 });
    expect(new Bounds(1, 2, 3)).toMatchObject({ x: 1, y: 2, w: 3, h: 3 });
    expect(new Bounds(1, 2, 3, 4)).toMatchObject({ x: 1, y: 2, w: 3, h: 4 });
    expect(new Bounds(new Bounds(1, 2, 3, 5))).toMatchObject({
      x: 1,
      y: 2,
      w: 3,
      h: 5,
    });
    expect(new Bounds(1, 2, 3, 4).point).toMatchObject({ x: 1, y: 2 });
    expect(new Bounds(1, 2, 3, 4).size).toMatchObject({ w: 3, h: 4 });
  });

  it('static isBounds', () => {
    expect(Bounds.isBounds(0)).toBeFalsy();
    expect(Bounds.isBounds('')).toBeFalsy();
    expect(Bounds.isBounds({})).toBeFalsy();
    expect(Bounds.isBounds({ x: 0 })).toBeFalsy();
    expect(Bounds.isBounds({ x: 0, y: 0, w: 0, h: 0 })).toBeTruthy();
    expect(Bounds.isBounds({ x: 1, y: 2, w: 3, h: 4, foo: 'baz' })).toBeTruthy();
  });

  it('static random', () => {
    expect(Bounds.isBounds(Bounds.random())).toBeTruthy();
    expect('x' in Bounds.random()).toBeTruthy();
    expect('x' in Bounds.random()).toBeTruthy();
    expect('w' in Bounds.random()).toBeTruthy();
    expect('h' in Bounds.random()).toBeTruthy();
  });

  it('static floor', () => {
    expect(Bounds.floor({ x: 2.3, y: 4.5, w: 5.8, h: 3.2 })).toMatchObject({
      x: 2,
      y: 4,
      w: 5,
      h: 3,
    });
    expect(Bounds.floor({ x: 5.8, y: 3.2, w: 2.3, h: 4.5 })).toMatchObject({
      x: 5,
      y: 3,
      w: 2,
      h: 4,
    });
  });

  it('static round', () => {
    expect(Bounds.round({ x: 2.3, y: 4.5, w: 5.8, h: 3.2 })).toMatchObject({
      x: 2,
      y: 5,
      w: 6,
      h: 3,
    });
    expect(Bounds.round({ x: 5.8, y: 3.2, w: 2.3, h: 4.5 })).toMatchObject({
      x: 6,
      y: 3,
      w: 2,
      h: 5,
    });
  });

  it('static ceil', () => {
    expect(Bounds.ceil({ x: 2.3, y: 4.5, w: 5.8, h: 3.2 })).toMatchObject({
      x: 3,
      y: 5,
      w: 6,
      h: 4,
    });
    expect(Bounds.ceil({ x: 5.8, y: 3.2, w: 2.3, h: 4.5 })).toMatchObject({
      x: 6,
      y: 4,
      w: 3,
      h: 5,
    });
  });

  it('static values', () => {
    expect(Bounds.values(new Bounds())).toMatchObject([0, 0, 0, 0]);

    expect(Bounds.values(new Bounds(1))).toMatchObject([1, 1, 0, 0]);
    expect(Bounds.values(new Bounds(1, 2))).toMatchObject([1, 2, 0, 0]);

    expect(Bounds.values(new Bounds(1, 0))).toMatchObject([1, 0, 0, 0]);
    expect(Bounds.values(new Bounds(1, 2, 3))).toMatchObject([1, 2, 3, 3]);
    expect(Bounds.values(new Bounds(1, 2, 3, 0))).toMatchObject([1, 2, 3, 0]);
    expect(Bounds.values(new Bounds(1, 2, 3, 4))).toMatchObject([1, 2, 3, 4]);
  });

  it('static eq', () => {
    expect(Bounds.eq({ x: 2, y: 4, w: 5, h: 3 }, { x: 2, y: 4, w: 5, h: 3 })).toBeTruthy();
    expect(Bounds.eq({ x: 5, y: 3, w: 2, h: 4 }, { x: 5, y: 9, w: 2, h: 4 })).toBeFalsy();
  });

  it('static convert', () => {
    expect(
      Bounds.convert(({ x, y, w, h }) => ({ a: y, b: x, c: w, d: h }), {
        x: 13,
        y: 73,
        w: 7,
        h: 11,
      })
    ).toMatchObject({
      a: 73,
      b: 13,
      c: 7,
      d: 11,
    });
    expect(
      Bounds.convert(({ x, y, w, h }) => ({ x: w, y: h, w: x, h: y }), new Bounds(1440, 768, 800, 600))
    ).toMatchObject({ x: 800, y: 600, w: 1440, h: 768 });
  });

  it('clone', () => {
    expect(new Bounds(1, 0, 3).clone()).toMatchObject({
      x: 1,
      y: 0,
      w: 3,
      h: 3,
    });
    expect(new Bounds(1, 2, 3, 4).clone()).toMatchObject({
      x: 1,
      y: 2,
      w: 3,
      h: 4,
    });
  });

  it('get', () => {
    expect(new Bounds(1, 0, 3).get()).toMatchObject({ x: 1, y: 0, w: 3, h: 3 });
    expect(new Bounds(1, 2, 3, 4).get()).toMatchObject({
      x: 1,
      y: 2,
      w: 3,
      h: 4,
    });
  });

  it('set', () => {
    expect(new Bounds().set({ x: 1, y: 1, w: 2, h: 3 })).toMatchObject({
      x: 1,
      y: 1,
      w: 2,
      h: 3,
    });
    expect(new Bounds().set({ x: 1, y: 2, w: 3, h: 4 })).toMatchObject({
      x: 1,
      y: 2,
      w: 3,
      h: 4,
    });
  });

  it('static merge', () => {
    expect(Bounds.merge(new Bounds(-400, -300, 100, 200), new Bounds(400, 300, 200, 100))).toMatchObject({
      x: -400,
      y: -300,
      w: 1000,
      h: 700,
    });

    expect(Bounds.merge(new Bounds(4000, 4000, 100, 200), new Bounds(400, 300, 200, 100))).toMatchObject({
      x: 400,
      y: 300,
      w: 3700,
      h: 3900,
    });

    expect(Bounds.merge(new Bounds(-4000, -3000, 100, 200), new Bounds(-400, -300, 200, 100))).toMatchObject({
      x: -4000,
      y: -3000,
      w: 3800,
      h: 2800,
    });
  });

  it('static crop', () => {
    expect(Bounds.crop(new Bounds(50, 50, 200, 200), new Bounds(150, 150, 200, 200))).toMatchObject({
      x: 150,
      y: 150,
      w: 100,
      h: 100,
    });

    expect(Bounds.crop(new Bounds(50, 50, 200, 200), new Bounds(250, 250, 200, 200))).toMatchObject({
      x: 250,
      y: 250,
      w: 0,
      h: 0,
    });

    expect(Bounds.crop(new Bounds(50, 50, 200, 200), new Bounds(350, 350, 200, 200))).toMatchObject({
      x: 350,
      y: 350,
      w: -100,
      h: -100,
    });
  });

  it('static getCorners', () => {
    expect(Bounds.getCorners(new Bounds(100, 200, 300, 400))).toMatchObject({
      [Position.TopLeft]: { x: 100, y: 200 },
      [Position.TopRight]: { x: 400, y: 200 },
      [Position.BottomLeft]: { x: 100, y: 600 },
      [Position.BottomRight]: { x: 400, y: 600 },
    });
  });

  it('static getSides', () => {
    expect(Bounds.getSides(new Bounds(100, 200, 300, 400))).toMatchObject({
      [Position.Top]: { x: 100, y: 200, w: 300, h: 0 },
      [Position.Right]: { x: 400, y: 200, w: 0, h: 400 },
      [Position.Bottom]: { x: 100, y: 600, w: 300, h: 0 },
      [Position.Left]: { x: 100, y: 200, w: 0, h: 400 },
    });
  });

  it('static isIntersect', () => {
    expect(Bounds.isIntersect(new Bounds(50, 50, 200, 200), new Bounds(150, 150, 200, 200))).toBeTruthy();

    expect(Bounds.isIntersect(new Bounds(-400, -300, 100, 200), new Bounds(400, 300, 200, 100))).toBeFalsy();
  });

  it('static getIntersectSides', () => {
    expect(Bounds.getIntersectSides(new Bounds(50, 50, 200, 200), new Bounds(150, 150, 200, 200))).toMatchObject({
      [Position.Top]: false,
      [Position.Right]: true,
      [Position.Bottom]: true,
      [Position.Left]: false,
    });

    expect(Bounds.getIntersectSides(new Bounds(-400, -300, 100, 200), new Bounds(400, 300, 200, 100))).toMatchObject({
      [Position.Top]: false,
      [Position.Right]: false,
      [Position.Bottom]: false,
      [Position.Left]: false,
    });
  });

  it('static isIntersectByRadius', () => {
    expect(Bounds.getIntersectSides(new Bounds(50, 50, 200, 200), new Bounds(150, 150, 200, 200))).toBeTruthy();

    expect(Bounds.isIntersectByRadius(new Bounds(-400, -300, 100, 200), new Bounds(400, 300, 200, 100))).toBeFalsy();
  });

  it('static align', () => {
    const frame = new Bounds(-400, -300, 800, 600);
    const bounds = new Bounds(100, 200, 40, 60);

    const expects: Record<Position, IBoundsValue> = {
      [Position.TopLeft]: { x: -400, y: -300, w: 40, h: 60 },
      [Position.Top]: { x: 100, y: -300, w: 40, h: 60 },
      [Position.TopCenter]: { x: -20, y: -300, w: 40, h: 60 },
      [Position.TopRight]: { x: 360, y: -300, w: 40, h: 60 },
      [Position.Left]: { x: -400, y: 200, w: 40, h: 60 },
      [Position.CenterLeft]: { x: -400, y: -30, w: 40, h: 60 },
      [Position.Center]: { x: -20, y: -30, w: 40, h: 60 },
      [Position.CenterRight]: { x: 360, y: -30, w: 40, h: 60 },
      [Position.Right]: { x: 360, y: 200, w: 40, h: 60 },
      [Position.BottomLeft]: { x: -400, y: 240, w: 40, h: 60 },
      [Position.Bottom]: { x: 100, y: 240, w: 40, h: 60 },
      [Position.BottomCenter]: { x: -20, y: 240, w: 40, h: 60 },
      [Position.BottomRight]: { x: 360, y: 240, w: 40, h: 60 },
    };

    Object.keys(expects).forEach(pos => {
      expect(Bounds.align(bounds, frame, <Position>pos)).toMatchObject(expects[<Position>pos]);
    });
  });

  it('random', () => {
    const a = new Bounds(1, 2, 3, 4);
    const b = a.clone();

    expect(a).toMatchObject(b);
    expect(a.random()).not.toMatchObject(b);
  });

  it('floor', () => {
    expect(new Bounds(2.3, 4.5, 5.8, 3.2).floor()).toMatchObject({
      x: 2,
      y: 4,
      w: 5,
      h: 3,
    });
    expect(new Bounds(5.8, 3.2, 2.3, 4.5).floor()).toMatchObject({
      x: 5,
      y: 3,
      w: 2,
      h: 4,
    });
  });

  it('round', () => {
    expect(new Bounds(2.3, 4.5, 5.8, 3.2).round()).toMatchObject({
      x: 2,
      y: 5,
      w: 6,
      h: 3,
    });
    expect(new Bounds(5.8, 3.2, 2.3, 4.5).round()).toMatchObject({
      x: 6,
      y: 3,
      w: 2,
      h: 5,
    });
  });

  it('ceil', () => {
    expect(new Bounds(2.3, 4.5, 5.8, 3.2).ceil()).toMatchObject({
      x: 3,
      y: 5,
      w: 6,
      h: 4,
    });
    expect(new Bounds(5.8, 3.2, 2.3, 4.5).ceil()).toMatchObject({
      x: 6,
      y: 4,
      w: 3,
      h: 5,
    });
  });

  it('values', () => {
    expect(new Bounds().values()).toMatchObject([0, 0, 0, 0]);

    expect(new Bounds(1).values()).toMatchObject([1, 1, 0, 0]);
    expect(new Bounds(1, 2).values()).toMatchObject([1, 2, 0, 0]);

    expect(new Bounds(1, 0).values()).toMatchObject([1, 0, 0, 0]);
    expect(new Bounds(1, 2, 3).values()).toMatchObject([1, 2, 3, 3]);
    expect(new Bounds(1, 2, 3, 0).values()).toMatchObject([1, 2, 3, 0]);
    expect(new Bounds(1, 2, 3, 4).values()).toMatchObject([1, 2, 3, 4]);
  });

  it('eq', () => {
    expect(new Bounds(2, 4, 5, 3).eq({ x: 2, y: 4, w: 5, h: 3 })).toBeTruthy();
    expect(new Bounds(5, 3, 2, 4).eq({ x: 5, y: 9, w: 2, h: 4 })).toBeFalsy();
  });

  it('convert', () => {
    expect(
      new Bounds({
        x: 13,
        y: 73,
        w: 7,
        h: 11,
      }).convert(({ x, y, w, h }) => ({ a: y, b: x, c: w, d: h }))
    ).toMatchObject({
      a: 73,
      b: 13,
      c: 7,
      d: 11,
    });
    expect(
      new Bounds(1440, 768, 800, 600).convert(({ x, y, w, h }) => ({
        x: w,
        y: h,
        w: x,
        h: y,
      }))
    ).toMatchObject({ x: 800, y: 600, w: 1440, h: 768 });
  });

  it('merge', () => {
    expect(new Bounds(-400, -300, 100, 200).merge(new Bounds(400, 300, 200, 100))).toMatchObject({
      x: -400,
      y: -300,
      w: 1000,
      h: 700,
    });

    expect(new Bounds(4000, 4000, 100, 200).merge(new Bounds(400, 300, 200, 100))).toMatchObject({
      x: 400,
      y: 300,
      w: 3700,
      h: 3900,
    });

    expect(new Bounds(-4000, -3000, 100, 200).merge(new Bounds(-400, -300, 200, 100))).toMatchObject({
      x: -4000,
      y: -3000,
      w: 3800,
      h: 2800,
    });
  });

  it('crop', () => {
    expect(new Bounds(50, 50, 200, 200).crop(new Bounds(150, 150, 200, 200))).toMatchObject({
      x: 150,
      y: 150,
      w: 100,
      h: 100,
    });

    expect(new Bounds(50, 50, 200, 200).crop(new Bounds(250, 250, 200, 200))).toMatchObject({
      x: 250,
      y: 250,
      w: 0,
      h: 0,
    });

    expect(new Bounds(50, 50, 200, 200).crop(new Bounds(350, 350, 200, 200))).toMatchObject({
      x: 350,
      y: 350,
      w: -100,
      h: -100,
    });

    expect(new Bounds(50, 50, 200, 200).crop(new Bounds(350, 350, 200, 200)).size.invert()).toMatchObject({
      w: 100,
      h: 100,
    });
  });

  it('getCorners', () => {
    expect(new Bounds(100, 200, 300, 400).getCorners()).toMatchObject({
      [Position.TopLeft]: { x: 100, y: 200 },
      [Position.TopRight]: { x: 400, y: 200 },
      [Position.BottomLeft]: { x: 100, y: 600 },
      [Position.BottomRight]: { x: 400, y: 600 },
    });
  });

  it('getSides', () => {
    expect(new Bounds(100, 200, 300, 400).getSides()).toMatchObject({
      [Position.Top]: { x: 100, y: 200, w: 300, h: 0 },
      [Position.Right]: { x: 400, y: 200, w: 0, h: 400 },
      [Position.Bottom]: { x: 100, y: 600, w: 300, h: 0 },
      [Position.Left]: { x: 100, y: 200, w: 0, h: 400 },
    });
  });

  it('isIntersect', () => {
    expect(new Bounds(50, 50, 200, 200).isIntersect(new Bounds(150, 150, 200, 200))).toBeTruthy();

    expect(new Bounds(-400, -300, 100, 200).isIntersect(new Bounds(400, 300, 200, 100))).toBeFalsy();
  });

  it('getIntersectSides', () => {
    expect(new Bounds(50, 50, 200, 200).getIntersectSides(new Bounds(150, 150, 200, 200))).toMatchObject({
      [Position.Top]: false,
      [Position.Right]: true,
      [Position.Bottom]: true,
      [Position.Left]: false,
    });

    expect(new Bounds(-400, -300, 100, 200).getIntersectSides(new Bounds(400, 300, 200, 100))).toMatchObject({
      [Position.Top]: false,
      [Position.Right]: false,
      [Position.Bottom]: false,
      [Position.Left]: false,
    });
  });

  it('isIntersectByRadius', () => {
    expect(new Bounds(50, 50, 200, 200).getIntersectSides(new Bounds(150, 150, 200, 200))).toBeTruthy();

    expect(new Bounds(-400, -300, 100, 200).isIntersectByRadius(new Bounds(400, 300, 200, 100))).toBeFalsy();
  });

  it('align', () => {
    const frame = new Bounds(-400, -300, 800, 600);
    const bounds = new Bounds(100, 200, 40, 60);
    const clone = bounds.clone.bind(bounds);

    const expects: Record<Position, IBoundsValue> = {
      [Position.TopLeft]: { x: -400, y: -300, w: 40, h: 60 },
      [Position.Top]: { x: 100, y: -300, w: 40, h: 60 },
      [Position.TopCenter]: { x: -20, y: -300, w: 40, h: 60 },
      [Position.TopRight]: { x: 360, y: -300, w: 40, h: 60 },
      [Position.Left]: { x: -400, y: 200, w: 40, h: 60 },
      [Position.CenterLeft]: { x: -400, y: -30, w: 40, h: 60 },
      [Position.Center]: { x: -20, y: -30, w: 40, h: 60 },
      [Position.CenterRight]: { x: 360, y: -30, w: 40, h: 60 },
      [Position.Right]: { x: 360, y: 200, w: 40, h: 60 },
      [Position.BottomLeft]: { x: -400, y: 240, w: 40, h: 60 },
      [Position.Bottom]: { x: 100, y: 240, w: 40, h: 60 },
      [Position.BottomCenter]: { x: -20, y: 240, w: 40, h: 60 },
      [Position.BottomRight]: { x: 360, y: 240, w: 40, h: 60 },
    };

    Object.keys(expects).forEach(pos => {
      expect(clone().align(frame, <Position>pos)).toMatchObject(expects[<Position>pos]);
    });
  });
});
