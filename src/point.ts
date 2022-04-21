import { Manipulator } from "./manipulator";
import { IPointArguments, IPointBase, IPointValue, IPointValueUnion, PointBase } from "./pointBase";

export { IPointArguments, IPointBase, IPointValue, IPointValueUnion, PointBase } from "./pointBase";

export interface IPoint extends IPointBase {
  clone(): IPoint;
  isLess(point: IPointValueUnion, orEqual?: boolean, both?: boolean): boolean;
  isMore(point: IPointValueUnion, orEqual?: boolean, both?: boolean): boolean;
  getDistance(...[x, y]: IPointArguments): number;
  moveToAngle(angle: number, length: number, deg: boolean): this;
  toJSON(): string;
  valueOf(): string;
  toString(): string;
}

export class Point extends PointBase implements IPoint {
  static isPoint<T = Record<string, never>>(point: T | IPointValue): point is IPointValue | IPointBase | IPoint {
    return PointBase.isPoint(point);
  }

  static isLess(a: IPointValueUnion, b: IPointValueUnion, orEqual = false, allFields = true): boolean {
    return Manipulator.isLess(PointBase.values(a), PointBase.values(b), orEqual, allFields);
  }

  static isMore(a: IPointValueUnion, b: IPointValueUnion, orEqual = false, allFields = true): boolean {
    return Manipulator.isMore(PointBase.values(a), PointBase.values(b), orEqual, allFields);
  }

  static getDistance(a: IPointValueUnion, b: IPointValueUnion): number {
    const { abs, sqrt } = Math;
    const [A, B] = [PointBase.get(a), PointBase.get(b)];

    return sqrt(abs(A.x - B.x) ** 2 + abs(A.y - B.y) ** 2);
  }

  static ofAngle(angle: number, length = 1, deg = false) {
    const a = angle * (deg ? Math.PI / 180 : Math.PI);

    const x = length * Math.cos(a);
    const y = length * Math.sin(a);

    return { x, y };
  }

  static moveToAngle(point: IPointValueUnion, angle: number, length: number, deg = false): IPointValue {
    const a = angle * (deg ? Math.PI / 180 : Math.PI);
    const [x, y] = PointBase.values(point);

    return {
      x: x + length * Math.cos(a),
      y: y + length * Math.sin(a),
    };
  }

  clone(): IPoint {
    return new Point(this.x, this.y);
  }

  isLess(point: IPointValueUnion, orEqual = false, allFields = true): boolean {
    return Point.isLess(this, point, orEqual, allFields);
  }

  isMore(point: IPointValueUnion, orEqual = false, allFields = true): boolean {
    return Point.isMore(this, point, orEqual, allFields);
  }

  getDistance(...[x, y]: IPointArguments): number {
    return Point.getDistance(this, PointBase.get(x, y));
  }

  moveToAngle(angle: number, length: number, deg = false) {
    return this.set(Point.moveToAngle(this, angle, length, deg));
  }

  toJSON() {
    return JSON.stringify(this.get());
  }

  valueOf() {
    return JSON.stringify(this.get());
  }

  toString() {
    return JSON.stringify(this.get());
  }
}
