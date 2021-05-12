import { ISizeValue } from './sizeBase';
import { Manipulator } from './manipulator';
import { IPointValue, IPointBase, PointBase } from './pointBase';

export { IPointValue, IPointBase, PointField } from './pointBase';

export interface IPoint extends IPointBase {
  clone(): IPoint;

  isLess(point: IPointValue, orEqual?: boolean, both?: boolean): boolean;
  isMore(point: IPointValue, orEqual?: boolean, both?: boolean): boolean;
  toSize(): ISizeValue;
  getDistance(x: number | IPointValue, y?: number): number;
  moveToAngle(angle: number, length: number, deg: boolean): this;
}

export class Point extends PointBase implements IPoint {
  static isPoint<T = Record<string, never>>(point: T | IPointValue): point is IPointValue | IPointBase | IPoint {
    return PointBase.isPoint(point);
  }

  static isLess(a: IPointValue, b: IPointValue, orEqual = false, allFields = true): boolean {
    return Manipulator.isLess([a.x, a.y], [b.x, b.y], orEqual, allFields);
  }

  static isMore(a: IPointValue, b: IPointValue, orEqual = false, allFields = true): boolean {
    return Manipulator.isMore([a.x, a.y], [b.x, b.y], orEqual, allFields);
  }

  static toSize({ x, y }: IPointValue): ISizeValue {
    return { w: x, h: y };
  }

  static getDistance(a: IPointValue, b: IPointValue): number {
    const { abs, sqrt } = Math;

    return sqrt(abs(a.x - b.x) ** 2 + abs(a.y - b.y) ** 2);
  }

  static ofAngle(angle: number, length = 1, deg = false) {
    const a = angle * (deg ? Math.PI / 180 : Math.PI);

    const x = length * Math.cos(a);
    const y = length * Math.sin(a);

    return { x, y };
  }

  static moveToAngle(point: IPointValue, angle: number, length: number, deg = false): IPointValue {
    const a = angle * (deg ? Math.PI / 180 : Math.PI);

    const x = length * Math.cos(a);
    const y = length * Math.sin(a);

    return {
      x: point.x + x,
      y: point.y + y,
    };
  }

  clone(): IPoint {
    return new Point(this);
  }

  isLess(point: IPointValue, orEqual = false, allFields = true): boolean {
    return Point.isLess(this, point, orEqual, allFields);
  }

  isMore(point: IPointValue, orEqual = false, allFields = true): boolean {
    return Point.isMore(this, point, orEqual, allFields);
  }

  toSize(): ISizeValue {
    return Point.toSize(this);
  }

  getDistance(x: number | IPointValue, y?: number): number {
    return Point.getDistance(this, new Point(x, y));
  }

  moveToAngle(angle: number, length: number, deg = false) {
    return this.set(Point.moveToAngle(this, angle, length, deg));
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
