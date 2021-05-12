import { IPointValue } from './pointBase';
import { Manipulator } from './manipulator';
import { ISizeValue, ISizeBase, SizeBase } from './sizeBase';

export { ISizeValue, ISizeBase, SizeField } from './sizeBase';

export interface ISize extends ISizeBase {
  clone(): ISize;

  isLess(size: ISizeValue, orEqual?: boolean, both?: boolean): boolean;
  isMore(size: ISizeValue, orEqual?: boolean, both?: boolean): boolean;
  toPoint(): IPointValue;
  getMinRadius(): number;
  getMaxRadius(): number;
}

export class Size extends SizeBase implements ISize {
  static isSize<T = Record<string, never>>(size: T | ISizeValue): size is ISizeValue | ISizeBase | ISize {
    return <T>size instanceof Object && 'w' in size && 'h' in size;
  }

  static isLess(a: ISizeValue, b: ISizeValue, orEqual = false, allFields = true): boolean {
    return Manipulator.isLess([a.w, a.h], [b.w, b.h], orEqual, allFields);
  }

  static isMore(a: ISizeValue, b: ISizeValue, orEqual = false, allFields = true): boolean {
    return Manipulator.isMore([a.w, a.h], [b.w, b.h], orEqual, allFields);
  }

  static toPoint({ w, h }: ISizeValue): IPointValue {
    return { x: w, y: h };
  }

  static getMinRadius(size: ISizeValue): number {
    return Math.min(size.w, size.h) / 2;
  }

  static getMaxRadius(size: ISizeValue): number {
    return Math.max(size.w, size.h) / 2;
  }

  clone(): ISize {
    return new Size(this);
  }

  isLess(size: ISizeValue, orEqual = false, allFields = true): boolean {
    return Size.isLess(this, size, orEqual, allFields);
  }

  isMore(size: ISizeValue, orEqual = false, allFields = true): boolean {
    return Size.isMore(this, size, orEqual, allFields);
  }

  toPoint(): IPointValue {
    return Size.toPoint(this);
  }

  getMinRadius(): number {
    return Size.getMinRadius(this);
  }

  getMaxRadius(): number {
    return Size.getMaxRadius(this);
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
