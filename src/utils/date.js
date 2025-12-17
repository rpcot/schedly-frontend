import { pluralize } from "./text";

export function getSecondsUntil(targetDate) {
  const now = new Date().getTime();
  const targetTime = targetDate.getTime();
  const differenceMs = targetTime - now;
  return differenceMs <= 0
    ? 0
    : Math.floor(differenceMs / 1000);
}

export function formatSecondsToHumanReadable(totalSeconds, maxItems, { plug = 'Время истекло', isAccusative } = {}) {
  if (totalSeconds <= 0) {
    return plug;
  }

  const units = isAccusative
    ? [
      { names: ['год', 'года', 'лет'], seconds: 365 * 24 * 60 * 60 },
      { names: ['месяц', 'месяца', 'месяцев'], seconds: 30 * 24 * 60 * 60 },
      { names: ['неделю', 'недели', 'недель'], seconds: 7 * 24 * 60 * 60 },
      { names: ['день', 'дня', 'дней'], seconds: 24 * 60 * 60 },
      { names: ['час', 'часа', 'часов'], seconds: 60 * 60 },
      { names: ['минуту', 'минуты', 'минут'], seconds: 60 },
      { names: ['секунду', 'секунды', 'секунд'], seconds: 1 },
    ] : [
      { names: ['год', 'года', 'лет'], seconds: 365 * 24 * 60 * 60 },
      { names: ['месяц', 'месяца', 'месяцев'], seconds: 30 * 24 * 60 * 60 },
      { names: ['неделя', 'недели', 'недель'], seconds: 7 * 24 * 60 * 60 },
      { names: ['день', 'дня', 'дней'], seconds: 24 * 60 * 60 },
      { names: ['час', 'часа', 'часов'], seconds: 60 * 60 },
      { names: ['минута', 'минуты', 'минут'], seconds: 60 },
      { names: ['секунда', 'секунды', 'секунд'], seconds: 1 },
    ];

  let result = [];
  let remainingSeconds = totalSeconds;

  for (const unit of units) {
    const value = Math.floor(remainingSeconds / unit.seconds);
    if (value > 0) {
      const word = pluralize(value, unit.names);
      result.push(`${value} ${word}`);
      remainingSeconds %= unit.seconds;
    }
    if (result.length >= maxItems) {
      break;
    }
  }

  if (result.length === 0 && totalSeconds > 0) {
    return `${totalSeconds} ${pluralize(totalSeconds, ['секунда', 'секунды', 'секунд'])}`;
  }

  return result.join(' ');
}