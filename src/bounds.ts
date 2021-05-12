import { Position } from './position';
import { IPoint, Point } from './point';
import { IBoundsValue, IBoundsBase, BoundsBase } from './boundsBase';

export { IBoundsValue, IBoundsBase, BoundsField } from './boundsBase';

export interface ICorners {
  [Position.TopLeft]: IPoint;
  [Position.TopRight]: IPoint;
  [Position.BottomLeft]: IPoint;
  [Position.BottomRight]: IPoint;
}

export interface ISides {
  [Position.Top]: IBounds;
  [Position.Right]: IBounds;
  [Position.Bottom]: IBounds;
  [Position.Left]: IBounds;
}

export type ISidesIntersect = Record<keyof ISides, boolean>;

export interface IBounds extends IBoundsBase {
  clone(): IBounds;
  merge(bounds: IBoundsValue): this;
  crop(bounds: IBoundsValue): this;
  getCorners(): ICorners;
  getSides(w?: number, h?: number): ISides;
  isIntersect(bounds: IBoundsValue): boolean;
  getIntersectSides(bounds: IBoundsValue): ISidesIntersect;
  isIntersectByRadius(bounds: IBoundsValue, maxSide?: boolean): boolean;
  align(frame: IBoundsValue, position: Position): this;
}

export class Bounds extends BoundsBase implements IBounds {
  static isBounds<T = Record<string, unknown>>(
    bounds: T | IBoundsValue | IBounds
  ): bounds is IBoundsValue | IBoundsBase | IBounds {
    return <T>bounds instanceof Object && 'x' in bounds && 'y' in bounds && 'w' in bounds && 'h' in bounds;
  }

  static merge(a: IBoundsValue, b: IBoundsValue): IBoundsValue {
    const x = Math.min(a.x, b.x);
    const y = Math.min(a.y, b.y);

    return {
      x,
      y,
      w: Math.max(a.x + a.w, b.x + b.w) - x,
      h: Math.max(a.y + a.h, b.y + b.h) - y,
    };
  }

  static crop(a: IBoundsValue, b: IBoundsValue): IBoundsValue {
    const x = Math.max(a.x, b.x);
    const y = Math.max(a.y, b.y);

    return {
      x,
      y,
      w: Math.min(a.x + a.w, b.x + b.w) - x,
      h: Math.min(a.y + a.h, b.y + b.h) - y,
    };
  }

  static getCorners(bounds: IBoundsValue): ICorners {
    const { x, y, w, h } = bounds;

    return {
      [Position.TopLeft]: new Point({ x, y }),
      [Position.TopRight]: new Point({ x: x + w, y }),
      [Position.BottomLeft]: new Point({ x, y: y + h }),
      [Position.BottomRight]: new Point({ x: x + w, y: y + h }),
    };
  }

  static getSides(bounds: IBoundsValue, w = 0, h = 0): ISides {
    return {
      [Position.Top]: new Bounds(bounds.x, bounds.y, bounds.w, h),
      [Position.Right]: new Bounds(bounds.x + bounds.w, bounds.y, w, bounds.h),
      [Position.Bottom]: new Bounds(bounds.x, bounds.y + bounds.h, bounds.w, h),
      [Position.Left]: new Bounds(bounds.x, bounds.y, w, bounds.h),
    };
  }

  static isIntersect(a: IBoundsValue, b: IBoundsValue): boolean {
    return a.x + a.w > b.x && a.x <= b.x + b.w && a.y + a.h > b.y && a.y <= b.y + b.h;
  }

  static getIntersectSides(a: IBoundsValue, b: IBoundsValue): ISidesIntersect {
    const sides = Bounds.getSides(a);

    return {
      [Position.Top]: Bounds.isIntersect(b, sides[Position.Top]),
      [Position.Right]: Bounds.isIntersect(b, sides[Position.Right]),
      [Position.Bottom]: Bounds.isIntersect(b, sides[Position.Bottom]),
      [Position.Left]: Bounds.isIntersect(b, sides[Position.Left]),
    };
  }

  static isIntersectByRadius(a: IBoundsValue, b: IBoundsValue, maxSide = false): boolean {
    const { min, max, abs, sqrt } = Math;
    const compare = maxSide ? min : max;

    const aRadius = compare(a.w, a.h) / 2;
    const bRadius = compare(b.w, b.h) / 2;

    const distance = sqrt(abs(a.x - b.x) ** 2 + abs(a.y - b.y) ** 2);

    return distance < aRadius + bRadius;
  }

  private static readonly alignments: Record<Position, (bounds: IBoundsValue, frame: IBoundsValue) => IBoundsValue> = {
    [Position.TopLeft]: ({ w, h }, { x, y }) => ({ x, y, w, h }),
    [Position.Top]: ({ x, w, h }, { y }) => ({ x, y, w, h }),
    [Position.TopCenter]: ({ w, h }, f) => ({
      x: f.x + (f.w - w) / 2,
      y: f.y,
      w,
      h,
    }),
    [Position.TopRight]: ({ w, h }, f) => ({
      x: f.x + f.w - w,
      y: f.y,
      w,
      h,
    }),
    [Position.Left]: ({ y, w, h }, { x }) => ({ x, y, w, h }),
    [Position.CenterLeft]: ({ w, h }, f) => ({
      x: f.x,
      y: f.y + (f.h - h) / 2,
      w,
      h,
    }),
    [Position.Center]: ({ w, h }, f) => ({
      x: f.x + (f.w - w) / 2,
      y: f.y + (f.h - h) / 2,
      w,
      h,
    }),
    [Position.CenterRight]: ({ w, h }, f) => ({
      x: f.x + f.w - w,
      y: f.y + (f.h - h) / 2,
      w,
      h,
    }),
    [Position.Right]: ({ y, w, h }, f) => ({ x: f.x + f.w - w, y, w, h }),
    [Position.BottomLeft]: ({ w, h }, f) => ({
      x: f.x,
      y: f.y + f.h - h,
      w,
      h,
    }),
    [Position.Bottom]: ({ x, w, h }, f) => ({ x, y: f.y + f.h - h, w, h }),
    [Position.BottomCenter]: ({ w, h }, f) => ({
      x: f.x + (f.w - w) / 2,
      y: f.y + f.h - h,
      w,
      h,
    }),
    [Position.BottomRight]: ({ w, h }, f) => ({
      x: f.x + f.w - w,
      y: f.y + f.h - h,
      w,
      h,
    }),
  };

  static align(bounds: IBoundsValue, frame: IBoundsValue, position: Position): IBoundsValue {
    return Bounds.alignments[position](bounds, frame);
  }

  clone(): IBounds {
    return new Bounds(this);
  }

  merge(bounds: IBoundsValue) {
    return this.set(Bounds.merge(this, bounds));
  }

  crop(bounds: IBoundsValue) {
    return this.set(Bounds.crop(this, bounds));
  }

  getCorners() {
    return Bounds.getCorners(this);
  }

  getSides(w = 0, h = 0) {
    return Bounds.getSides(this, w, h);
  }

  isIntersect(bounds: IBoundsValue) {
    return Bounds.isIntersect(this, bounds);
  }

  getIntersectSides(bounds: IBoundsValue) {
    return Bounds.getIntersectSides(this, bounds);
  }

  isIntersectByRadius(bounds: IBoundsValue, maxSide?: boolean) {
    return Bounds.isIntersectByRadius(this, bounds, maxSide);
  }

  align(frame: IBoundsValue, position: Position) {
    return this.set(Bounds.align(this, frame, position));
  }

  toJSON() {
    return this.get();
  }

  valueOf() {
    return JSON.stringify(this.get());
  }

  toString() {
    return JSON.stringify(this.get());
  }
}
