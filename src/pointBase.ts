import { Manipulator } from './manipulator';

export enum PointField {
  X,
  Y,
}

export interface IPointValue {
  x: number;
  y: number;
}

export interface IPointBase extends IPointValue {
  clone(): IPointBase;
  get(): IPointValue;
  set(x: number | IPointValue, y?: number): this;
  plus(point: IPointValue): this;
  minus(point: IPointValue): this;
  multiply(point: IPointValue): this;
  divide(point: IPointValue, euclidean?: boolean): this;
  min(point: IPointValue): this;
  max(point: IPointValue): this;
  random(max?: IPointValue, min?: IPointValue): this;
  swap(): this;
  invert(): this;
  invertX(): this;
  invertY(): this;
  floor(): this;
  round(): this;
  ceil(): this;
  values(): number[];
  eq(point: IPointValue, or?: boolean): boolean;
  convert<T>(mapper: (point: IPointValue) => T): T;
}

export abstract class PointBase implements IPointBase {
  x: number;
  y: number;

  constructor(x: number | IPointValue = 0, y?: number) {
    if (typeof x === 'number') {
      this.x = x;
      this.y = y ?? x;
    } else {
      this.x = x.x ?? 0;
      this.y = x.y ?? x.x ?? 0;
    }
  }

  static isPoint<T = Record<string, unknown>>(point: T | IPointValue): point is IPointValue | IPointBase {
    return <T>point instanceof Object && 'x' in point && 'y' in point;
  }

  static plus(a: IPointValue, b: IPointValue): IPointValue {
    const [x, y] = Manipulator.plus([a.x, a.y], [b.x, b.y]);

    return { x, y };
  }

  static minus(a: IPointValue, b: IPointValue): IPointValue {
    const [x, y] = Manipulator.minus([a.x, a.y], [b.x, b.y]);

    return { x, y };
  }

  static multiply(a: IPointValue, b: IPointValue): IPointValue {
    const [x, y] = Manipulator.multiply([a.x, a.y], [b.x, b.y]);

    return { x, y };
  }

  static divide(a: IPointValue, b: IPointValue, euclidean?: boolean): IPointValue {
    const [x, y] = Manipulator.divide([a.x, a.y], [b.x, b.y], euclidean);

    return { x, y };
  }

  static min(a: IPointValue, b: IPointValue): IPointValue {
    const [x, y] = Manipulator.min([a.x, a.y], [b.x, b.y]);

    return { x, y };
  }

  static max(a: IPointValue, b: IPointValue): IPointValue {
    const [x, y] = Manipulator.max([a.x, a.y], [b.x, b.y]);

    return { x, y };
  }

  static random(max?: IPointValue, min?: IPointValue): IPointValue {
    const [x, y] = Manipulator.random([max?.x ?? 1, max?.y ?? 1], [min?.x ?? 0, min?.y ?? 0]);

    return { x, y };
  }

  static swap(point: IPointValue): IPointValue {
    const [x, y] = Manipulator.swap([point.x, point.y]);

    return { x, y };
  }

  static invert(point: IPointValue): IPointValue {
    const [x, y] = Manipulator.invert([point.x, point.y]);

    return { x, y };
  }

  static invertX(point: IPointValue): IPointValue {
    const [x, y] = Manipulator.invertByKey([point.x, point.y], PointField.X);

    return { x, y };
  }

  static invertY(point: IPointValue): IPointValue {
    const [x, y] = Manipulator.invertByKey([point.x, point.y], PointField.Y);

    return { x, y };
  }

  static floor(point: IPointValue): IPointValue {
    const [x, y] = Manipulator.floor([point.x, point.y]);

    return { x, y };
  }

  static round(point: IPointValue): IPointValue {
    const [x, y] = Manipulator.round([point.x, point.y]);

    return { x, y };
  }

  static ceil(point: IPointValue): IPointValue {
    const [x, y] = Manipulator.ceil([point.x, point.y]);

    return { x, y };
  }

  static values(point: IPointValue): number[] {
    const { x, y } = point;

    return [x ?? 0, y ?? 0];
  }

  static eq(a: IPointValue, b: IPointValue, allFields = true): boolean {
    return Manipulator.eq([a.x, a.y], [b.x, b.y], allFields);
  }

  static convert<T>(mapper: (point: IPointValue) => T, point: IPointValue): T {
    return mapper(point);
  }

  abstract clone(): IPointBase;

  get(): IPointValue {
    const { x, y } = this;

    return { x, y };
  }

  set(x: number | IPointValue = 0, y?: number) {
    if (typeof x === 'number') {
      this.x = x;
      this.y = y ?? x;
    } else {
      this.x = x.x ?? 0;
      this.y = x.y ?? x.x ?? 0;
    }

    return this;
  }

  plus(point: IPointValue) {
    return this.set(PointBase.plus(this, point));
  }

  minus(point: IPointValue) {
    return this.set(PointBase.minus(this, point));
  }

  multiply(point: IPointValue) {
    return this.set(PointBase.multiply(this, point));
  }

  divide(point: IPointValue, euclidean = false) {
    return this.set(PointBase.divide(this, point, euclidean));
  }

  min(point: IPointValue) {
    return this.set(PointBase.min(this, point));
  }

  max(point: IPointValue) {
    return this.set(PointBase.max(this, point));
  }

  random(max?: IPointValue, min?: IPointValue) {
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

  eq(point: IPointValue, allFields = true): boolean {
    return PointBase.eq(this, point, allFields);
  }

  convert<T>(mapper: (point: IPointValue) => T) {
    return PointBase.convert(mapper, this);
  }
}
