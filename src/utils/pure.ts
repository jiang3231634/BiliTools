import { random as baseRandom } from 'lodash';

/**
 * 返回本月天数
 */
export function getMonthHasDays(now?: Date) {
  const nowTime = now || getPRCDate(),
    year = nowTime.getFullYear(),
    month = nowTime.getMonth() + 1,
    smallMonth = [4, 6, 9, 11];

  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  if (month === 2) {
    return isLeapYear ? 29 : 28;
  } else if (smallMonth.includes(month)) {
    return 30;
  } else {
    return 31;
  }
}

/**
 * 生成一个 UUID
 */
export function createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, t => {
    const e = (16 * Math.random()) | 0;
    return (t === 'x' ? e : (3 & e) | 8).toString(16);
  });
}

export const random = baseRandom;

/**
 * 不同时区获取北京时间
 */
export function getPRCDate(): Date {
  const now = new Date(),
    nowTime = now.getTime(),
    timezone = now.getTimezoneOffset() / 60;
  // 3600000 为每小时毫秒数
  return new Date(nowTime + (timezone + 8) * 3_600_000);
}

/**
 * 将 JSONP 返回的数据转换为对象
 */
export function jsonp2Object(jsonp: string) {
  const jsonpData = jsonp.replace(/^\w+\(/, '').replace(/\)$/, '');
  return JSON.parse(jsonpData);
}

/**
 * 一页有 n 条数据，第 m 个数据在第几页
 * @param n 每页数据条数
 * @param m 第几条数据
 */
export function getPageNum(n: number, m: number) {
  return Math.ceil(m / n);
}
