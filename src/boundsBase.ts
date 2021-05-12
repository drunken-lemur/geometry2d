import { ISize, Size } from './size';
import { IPoint, Point } from './point';
import { ISizeValue } from './sizeBase';
import { IPointValue } from './pointBase';
import { Manipulator } from './manipulator';

export enum BoundsField {
  X,
  Y,
  W,
  H,
}

export interface IBoundsValue extends IPointValue, ISizeValue {}

export interface IBoundsBase extends IBoundsValue {
  size: ISize;
  point: IPoint;
  clone(): IBoundsBase;
  get(): IBoundsValue;
  set(x: number | IBoundsValue, y?: number, w?: number, h?: number): this;
  random(max?: IBoundsValue, min?: IBoundsValue): this;
  floor(): this;
  round(): this;
  ceil(): this;
  values(): number[];
  eq(bounds: IBoundsValue, or?: boolean): boolean;
  convert<T>(mapper: (bounds: IBoundsValue) => T): T;
}

export abstract class BoundsBase implements IBoundsBase {
  x!: number; // will redefine with getter/setter in constructor
  y!: number; // will redefine with getter/setter in constructor
  w!: number; // will redefine with getter/setter in constructor
  h!: number; // will redefine with getter/setter in constructor

  readonly size: ISize;
  readonly point: IPoint;

  constructor(x: number | IBoundsValue = 0, y?: number, w?: number, h?: number) {
    if (typeof x === 'number') {
      this.size = new Size(w, h);
      this.point = new Point(x, y);
    } else {
      this.size = new Size(x);
      this.point = new Point(x);
    }

    Object.defineProperties(this, {
      size: { enumerable: false },
      point: { enumerable: false },
      x: {
        enumerable: true,
        get: () => this.point.x,
        set: val => {
          this.point.x = val;
        },
      },
      y: {
        enumerable: true,
        get: () => this.point.y,
        set: val => {
          this.point.y = val;
        },
      },
      w: {
        enumerable: true,
        get: () => this.size.w,
        set: val => {
          this.size.w = val;
        },
      },
      h: {
        enumerable: true,
        get: () => this.size.h,
        set: val => {
          this.size.h = val;
        },
      },
    });
  }

  static isBounds<T = Record<string, unknown>>(bounds: T | IBoundsValue): bounds is IBoundsValue | IBoundsBase {
    return <T>bounds instanceof Object && 'x' in bounds && 'y' in bounds && 'w' in bounds && 'h' in bounds;
  }

  static random(max?: IBoundsValue, min?: IBoundsValue): IBoundsValue {
    const [x, y, w, h] = Manipulator.max(
      [max?.x ?? 1, max?.y ?? 1, max?.w ?? 1, max?.h ?? 1],
      [min?.x ?? 0, min?.y ?? 0, min?.w ?? 0, min?.h ?? 0]
    );

    return { x, y, w, h };
  }

  static floor(bounds: IBoundsValue): IBoundsValue {
    const [x, y, w, h] = Manipulator.floor([bounds.x, bounds.y, bounds.w, bounds.h]);

    return { x, y, w, h };
  }

  static round(bounds: IBoundsValue): IBoundsValue {
    const [x, y, w, h] = Manipulator.round([bounds.x, bounds.y, bounds.w, bounds.h]);

    return { x, y, w, h };
  }

  static ceil(bounds: IBoundsValue): IBoundsValue {
    const [x, y, w, h] = Manipulator.ceil([bounds.x, bounds.y, bounds.w, bounds.h]);

    return { x, y, w, h };
  }

  static values(bounds: IBoundsValue): number[] {
    const { x, y, w, h } = bounds;

    return [x ?? 0, y ?? 0, w ?? 0, h ?? 0];
  }

  static eq(a: IBoundsValue, b: IBoundsValue, allFields = true): boolean {
    return Manipulator.eq([a.x, a.y, a.w, a.h], [b.x, b.y, b.w, b.h], allFields);
  }

  static convert<T>(mapper: (bounds: IBoundsValue) => T, bounds: IBoundsValue): T {
    return mapper(bounds);
  }

  abstract clone(): IBoundsBase;

  get(): IBoundsValue {
    const { x, y, w, h } = this;

    return { x, y, w, h };
  }

  set(x: number | IBoundsValue = 0, y?: number, w?: number, h?: number) {
    if (typeof x === 'number') {
      this.x = x;
      this.y = y ?? x;
      this.w = w ?? x ?? 0;
      this.h = h ?? w ?? y ?? 0;
    } else {
      this.x = x.x ?? 0;
      this.y = x.y ?? x.x ?? 0;
      this.w = x.w ?? x.x ?? 0;
      this.h = x.h ?? x.w ?? x.y ?? 0;
    }

    return this;
  }

  random(max?: IBoundsValue, min?: IBoundsValue) {
    return this.set(BoundsBase.random(max, min));
  }

  floor() {
    return this.set(BoundsBase.floor(this));
  }

  round() {
    return this.set(BoundsBase.round(this));
  }

  ceil() {
    return this.set(BoundsBase.ceil(this));
  }

  values() {
    return BoundsBase.values(this);
  }

  eq(bounds: IBoundsValue, allFields = true): boolean {
    return BoundsBase.eq(this, bounds, allFields);
  }

  convert<T>(mapper: (bounds: IBoundsValue) => T) {
    return BoundsBase.convert(mapper, this);
  }
}
