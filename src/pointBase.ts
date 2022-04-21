import { Manipulator } from "./manipulator";

export enum PointField {
  X,
  Y,
}

export interface IPointValue {
  x: number;
  y: number;
}

export type IChangeCallback<T> = (value: T) => T;

export type IPointValueUnion = IPointValue | IChangeCallback<IPointValue>;

export type IPointArguments = [x: number | IPointValueUnion, y?: number];

export interface IPointBase extends IPointValue {
  clone(): IPointBase;
  get(): IPointValue;
  set(...[x, y]: IPointArguments): this;
  plus(point: IPointValueUnion): this;
  minus(point: IPointValueUnion): this;
  multiply(point: IPointValueUnion): this;
  divide(point: IPointValueUnion, euclidean?: boolean): this;
  min(point: IPointValueUnion): this;
  max(point: IPointValueUnion): this;
  random(max?: IPointValueUnion, min?: IPointValueUnion): this;
  swap(): this;
  invert(): this;
  invertX(): this;
  invertY(): this;
  floor(): this;
  round(): this;
  ceil(): this;
  values(): number[];
  eq(point: IPointValueUnion, or?: boolean): boolean;
  convert<T>(mapper: (point: IPointValue) => T): T;
}

export abstract class PointBase implements IPointBase {
  x: number;
  y: number;

  constructor(...[x, y]: Partial<IPointArguments>) {
    if (typeof x === "function") {
      const point = x({ x: 0, y: 0 });
      this.x = point.x;
      this.y = point.y;
    } else if (typeof x === "number") {
      this.x = x;
      this.y = y ?? x;
    } else {
      this.x = x?.x ?? 0;
      this.y = x?.y ?? x?.x ?? 0;
    }
  }

  static get(...[x, y]: IPointArguments): IPointValue {
    if (typeof x === "function") {
      return x({ x: 0, y: 0 });
    } else if (typeof x === "number") {
      return { x, y: y ?? x };
    } else {
      return {
        x: x.x ?? 0,
        y: x.y ?? x.x ?? 0
      };
    }
  }

  static isPoint<T = Record<string, unknown>>(point: T | IPointValue): point is IPointValue | IPointBase {
    return <T>point instanceof Object && "x" in point && "y" in point;
  }

  static plus(a: IPointValueUnion, b: IPointValueUnion): IPointValue {
    const [x, y] = Manipulator.plus(PointBase.values(a), PointBase.values(b));

    return { x, y };
  }

  static minus(a: IPointValueUnion, b: IPointValueUnion): IPointValue {
    const [x, y] = Manipulator.minus(PointBase.values(a), PointBase.values(b));

    return { x, y };
  }

  static multiply(a: IPointValueUnion, b: IPointValueUnion): IPointValue {
    const [x, y] = Manipulator.multiply(PointBase.values(a), PointBase.values(b));

    return { x, y };
  }

  static divide(a: IPointValueUnion, b: IPointValueUnion, euclidean?: boolean): IPointValue {
    const [x, y] = Manipulator.divide(PointBase.values(a), PointBase.values(b), euclidean);

    return { x, y };
  }

  static min(a: IPointValueUnion, b: IPointValueUnion): IPointValue {
    const [x, y] = Manipulator.min(PointBase.values(a), PointBase.values(b));

    return { x, y };
  }

  static max(a: IPointValueUnion, b: IPointValueUnion): IPointValue {
    const [x, y] = Manipulator.max(PointBase.values(a), PointBase.values(b));

    return { x, y };
  }

  static random(max?: IPointValueUnion, min?: IPointValueUnion): IPointValue {
    const [x, y] = Manipulator.random(
      PointBase.values(max ?? 1),
      PointBase.values(min ?? 0)
    );

    return { x, y };
  }

  static swap(point: IPointValueUnion): IPointValue {
    const [x, y] = Manipulator.swap(PointBase.values(point));

    return { x, y };
  }

  static invert(point: IPointValueUnion): IPointValue {
    const [x, y] = Manipulator.invert(PointBase.values(point));

    return { x, y };
  }

  static invertX(point: IPointValueUnion): IPointValue {
    const [x, y] = Manipulator.invertByKey(PointBase.values(point), PointField.X);

    return { x, y };
  }

  static invertY(point: IPointValueUnion): IPointValue {
    const [x, y] = Manipulator.invertByKey(PointBase.values(point), PointField.Y);

    return { x, y };
  }

  static floor(point: IPointValueUnion): IPointValue {
    const [x, y] = Manipulator.floor(PointBase.values(point));

    return { x, y };
  }

  static round(point: IPointValueUnion): IPointValue {
    const [x, y] = Manipulator.round(PointBase.values(point));

    return { x, y };
  }

  static ceil(point: IPointValueUnion): IPointValue {
    const [x, y] = Manipulator.ceil(PointBase.values(point));

    return { x, y };
  }

  static values(...[x, y]: IPointArguments): number[] {
    if (typeof x === "function") {
      const val = x({ x: 0, y: 0 });
      return [val.x, val.y];
    } else if (typeof x === "number") {
      return [x, y ?? x];
    } else {
      return [x.x ?? 0, x.y ?? x.x ?? 0];
    }
  }

  static eq(a: IPointValueUnion, b: IPointValueUnion, allFields = true): boolean {
    return Manipulator.eq(PointBase.values(a), PointBase.values(b), allFields);
  }

  static convert<T>(mapper: (point: IPointValue) => T, point: IPointValue): T {
    return mapper(point);
  }

  abstract clone(): IPointBase;

  get(): IPointValue {
    const { x, y } = this;

    return { x, y };
  }

  set(...[x, y]: IPointArguments) {
    const value = PointBase.get(x, y);
    this.x = value.x;
    this.y = value.y;

    return this;
  }

  plus(point: IPointValueUnion) {
    return this.set(PointBase.plus(this, point));
  }

  minus(point: IPointValueUnion) {
    return this.set(PointBase.minus(this, point));
  }

  multiply(point: IPointValueUnion) {
    return this.set(PointBase.multiply(this, point));
  }

  divide(point: IPointValueUnion, euclidean = false) {
    return this.set(PointBase.divide(this, point, euclidean));
  }

  min(point: IPointValueUnion) {
    return this.set(PointBase.min(this, point));
  }

  max(point: IPointValueUnion) {
    return this.set(PointBase.max(this, point));
  }

  random(max?: IPointValueUnion, min?: IPointValueUnion) {
    return this.set(PointBase.random(max, min));
  }

  swap() {
    return this.set(PointBase.swap(this));
  }

  invert() {
    return this.set(PointBase.invert(this));
  }

  invertX() {
    return this.set(PointBase.invertX(this));
  }

  invertY() {
    return this.set(PointBase.invertY(this));
  }

  floor() {
    return this.set(PointBase.floor(this));
  }

  round() {
    return this.set(PointBase.round(this));
  }

  ceil() {
    return this.set(PointBase.ceil(this));
  }

  values() {
    return PointBase.values(this);
  }

  eq(point: IPointValueUnion, allFields = true): boolean {
    return PointBase.eq(this, point, allFields);
  }

  convert<T>(mapper: (point: IPointValue) => T) {
    return PointBase.convert(mapper, this);
  }
}
