export class Manipulator {
  static plus = (a: number[], b: number[]) => a.map((val, key) => val + b[key] ?? 0);

  static minus = (a: number[], b: number[]) => a.map((val, key) => val - b[key] ?? 0);

  static multiply = (a: number[], b: number[]) => a.map((val, key) => val * b[key] ?? 1);

  static divide = (a: number[], b: number[], euclidean?: boolean) =>
    a.map((val, key) => (!euclidean ? val / b[key] ?? 1 : val % b[key] ?? 1));

  static min = (a: number[], b: number[]) => a.map((val, key) => Math.min(val, b[key] ?? 0));

  static max = (a: number[], b: number[]) => a.map((val, key) => Math.max(val, b[key] ?? 0));

  static random = (max: number[] = [1, 1], min: number[] = [0, 0]) =>
    max.map((val, key) => Math.random() * val + min[key] ?? 0);

  static swap = (data: number[]) => {
    const ret = [];

    for (let i = 0; i < data.length; i += 2) {
      ret[i + 1] = data[i];
      ret[i] = data[i + 1] ?? 0;
    }

    return ret;
  };

  static invert = (data: number[]) => data.map(val => -val);

  static invertByKey = (data: number[], key: number) => {
    const ret = [...data];

    if (key in ret) {
      ret[key] = -ret[key];
    }

    return ret;
  };

  static floor = (data: number[]) =>
    // eslint-disable-next-line no-bitwise
    data.map(val => val | 0);

  static round = (data: number[]) => data.map(Math.round);

  static ceil = (data: number[]) => data.map(Math.ceil);

  static eq = (a: number[], b: number[], allFields = true) => {
    const result = [];

    for (let i = 0; i < a.length; i += 1) {
      if (!allFields) {
        result[i] = a[i] === b[i];
      } else if (a[i] !== b[i]) {
        return false;
      }
    }

    if (!allFields) {
      return result.includes(true);
    }
    return true;
  };

  static isLess = (a: number[], b: number[], orEqual = false, allFields = true) => {
    const result = [];

    for (let i = 0; i < a.length; i += 1) {
      if (!allFields) {
        if (!orEqual) {
          result[i] = a[i] < b[i];
        } else {
          result[i] = a[i] <= b[i];
        }
      } else if (!orEqual) {
        if (!(a[i] < b[i])) {
          return false;
        }
      } else if (!(a[i] <= b[i])) {
        return false;
      }
    }

    if (!allFields) {
      return result.includes(true);
    }
    return true;
  };

  static isMore = (a: number[], b: number[], orEqual = false, allFields = true) => {
    const result = [];

    for (let i = 0; i < a.length; i += 1) {
      if (!allFields) {
        if (!orEqual) {
          result[i] = a[i] > b[i];
        } else {
          result[i] = a[i] >= b[i];
        }
      } else if (!orEqual) {
        if (!(a[i] > b[i])) {
          return false;
        }
      } else if (!(a[i] >= b[i])) {
        return false;
      }
    }

    if (!allFields) {
      return result.includes(true);
    }
    return true;
  };
}
