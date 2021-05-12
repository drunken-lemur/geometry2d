import { Manipulator } from './manipulator';

export enum SizeField {
  W,
  H,
}

export interface ISizeValue {
  w: number;
  h: number;
}

export interface ISizeBase extends ISizeValue {
  clone(): ISizeBase;
  get(): ISizeValue;
  set(w: number | ISizeValue, h?: number): this;
  plus(point: ISizeValue): this;
  minus(point: ISizeValue): this;
  multiply(point: ISizeValue): this;
  divide(point: ISizeValue, euclidean?: boolean): this;
  min(point: ISizeValue): this;
  max(point: ISizeValue): this;
  random(max?: ISizeValue, min?: ISizeValue): this;
  swap(): this;
  invert(): this;
  invertW(): this;
  invertH(): this;
  floor(): this;
  round(): this;
  ceil(): this;
  values(): number[];
  eq(point: ISizeValue, or?: boolean): boolean;
  convert<T>(mapper: (point: ISizeValue) => T): T;
}

export abstract class SizeBase implements ISizeBase {
  w: number;
  h: number;

  constructor(w: number | ISizeValue = 0, h?: number) {
    if (typeof w === 'number') {
      this.w = w;
      this.h = h ?? w;
    } else {
      this.w = w.w ?? 0;
      this.h = w.h ?? w.w ?? 0;
    }
  }

  static isSize<T = Record<string, unknown>>(size: T | ISizeValue): size is ISizeValue | ISizeBase {
    return <T>size instanceof Object && 'w' in size && 'h' in size;
  }

  static plus(a: ISizeValue, b: ISizeValue): ISizeValue {
    const [w, h] = Manipulator.plus([a.w, a.h], [b.w, b.h]);

    return { w, h };
  }

  static minus(a: ISizeValue, b: ISizeValue): ISizeValue {
    const [w, h] = Manipulator.minus([a.w, a.h], [b.w, b.h]);

    return { w, h };
  }

  static multiply(a: ISizeValue, b: ISizeValue): ISizeValue {
    const [w, h] = Manipulator.multiply([a.w, a.h], [b.w, b.h]);

    return { w, h };
  }

  static divide(a: ISizeValue, b: ISizeValue, euclidean?: boolean): ISizeValue {
    const [w, h] = Manipulator.divide([a.w, a.h], [b.w, b.h], euclidean);

    return { w, h };
  }

  static min(a: ISizeValue, b: ISizeValue): ISizeValue {
    const [w, h] = Manipulator.min([a.w, a.h], [b.w, b.h]);

    return { w, h };
  }

  static max(a: ISizeValue, b: ISizeValue): ISizeValue {
    const [w, h] = Manipulator.max([a.w, a.h], [b.w, b.h]);

    return { w, h };
  }

  static random(max?: ISizeValue, min?: ISizeValue): ISizeValue {
    const [w, h] = Manipulator.random([max?.w ?? 1, max?.h ?? 1], [min?.w ?? 0, min?.h ?? 0]);

    return { w, h };
  }

  static swap(size: ISizeValue): ISizeValue {
    const [w, h] = Manipulator.swap([size.w, size.h]);

    return { w, h };
  }

  static invert(size: ISizeValue): ISizeValue {
    const [w, h] = Manipulator.invert([size.w, size.h]);

    return { w, h };
  }

  static invertW(size: ISizeValue): ISizeValue {
    const [w, h] = Manipulator.invertByKey([size.w, size.h], SizeField.W);

    return { w, h };
  }

  static invertH(size: ISizeValue): ISizeValue {
    const [w, h] = Manipulator.invertByKey([size.w, size.h], SizeField.H);

    return { w, h };
  }

  static floor(size: ISizeValue): ISizeValue {
    const [w, h] = Manipulator.floor([size.w, size.h]);

    return { w, h };
  }

  static round(size: ISizeValue): ISizeValue {
    const [w, h] = Manipulator.round([size.w, size.h]);

    return { w, h };
  }

  static ceil(size: ISizeValue): ISizeValue {
    const [w, h] = Manipulator.ceil([size.w, size.h]);

    return { w, h };
  }

  static values(size: ISizeValue): number[] {
    const { w, h } = size;

    return [w ?? 0, h ?? 0];
  }

  static eq(a: ISizeValue, b: ISizeValue, allFields = true): boolean {
    return Manipulator.eq([a.w, a.h], [b.w, b.h], allFields);
  }

  static convert<T>(mapper: (size: ISizeValue) => T, size: ISizeValue): T {
    return mapper(size);
  }

  abstract clone(): ISizeBase;

  get(): ISizeValue {
    return { w: this.w, h: this.h };
  }

  set(w: number | ISizeValue = 0, h?: number) {
    if (typeof w === 'number') {
      this.w = w;
      this.h = h ?? w;
    } else {
      this.w = w.w ?? 0;
      this.h = w.h ?? w.w ?? 0;
    }

    return this;
  }

  plus(size: ISizeValue) {
    return this.set(SizeBase.plus(this, size));
  }

  minus(size: ISizeValue) {
    return this.set(SizeBase.minus(this, size));
  }

  multiply(size: ISizeValue) {
    return this.set(SizeBase.multiply(this, size));
  }

  divide(size: ISizeValue, euclidean = false) {
    return this.set(SizeBase.divide(this, size, euclidean));
  }

  min(size: ISizeValue) {
    return this.set(SizeBase.min(this, size));
  }

  max(size: ISizeValue) {
    return this.set(SizeBase.max(this, size));
  }

  random(max?: ISizeValue, min?: ISizeValue) {
    return this.set(SizeBase.random(max, min));
  }

  swap() {
    return this.set(SizeBase.swap(this));
  }

  invert() {
    return this.set(SizeBase.invert(this));
  }

  invertW() {
    return this.set(SizeBase.invertW(this));
  }

  invertH() {
    return this.set(SizeBase.invertH(this));
  }

  floor() {
    return this.set(SizeBase.floor(this));
  }

  round() {
    return this.set(SizeBase.round(this));
  }

  ceil() {
    return this.set(SizeBase.ceil(this));
  }

  values() {
    return SizeBase.values(this);
  }

  eq(size: ISizeValue, allFields = true): boolean {
    return SizeBase.eq(this, size, allFields);
  }

  convert<T>(mapper: (point: ISizeValue) => T) {
    return SizeBase.convert(mapper, this);
  }
}
