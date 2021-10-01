import moment from "moment";

export function stripTags(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export function cut(text: string, length: number): string {
  if (!length) return text;
  if (text.length < length) return text;
  return text.substr(0, length) + `... + ${text.length - length} symbols`;
}

export function toCamelCase(str: string): string {
  const PascalCase = toPascalCase(str);
  return PascalCase.substr(0, 1).toLowerCase() + PascalCase.substr(1);
}

export function toPascalCase(str: string): string {
  return str.split(/\W/g).map(capitalizeFirst).join("");
}

export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_] + /g, "-")
    .toLowerCase();
}

export function capitalizeFirst(str: string): string {
  return str.substr(0, 1).toUpperCase() + str.substr(1);
}

/** Removes slashes, dots and spaces at start and end of path */
export function trimPath(path: string): string {
  return path.replace(/^[\s/.]+/, "").replace(/[\s/.]+$/, "");
}

export function filename(path: string): string {
  return path.substring(path.lastIndexOf("/") + 1);
}

/** Filename without extension */
export function basename(path: string): string {
  return filename(path).replace(/\.\w+$/, "");
}

export function dirname(path: string): string {
  path = path.trim();
  // if ending is a slash - suppose it"s a folder
  if (path.substr(-1) === "/") return trimPath(path);
  // remove filename at the end of path
  return trimPath(path).replace(/\/\w*\.\w+$/, "");
}
/** resolves double dots a/../b in path */
export function normalizePath(path: string) {
  path = path.replace(/\w+\/\.\.\//g, "/");
  return path;
}

export function varNameToTitle(varName: string): string {
  let title = varName.replace(/[-_]+/, " ");
  title = title.replace(/[A-Z]/, " $0");
  return capitalizeFirst(title.toLowerCase());
}

/** Returns first dirname of path */
export function firstDir(path: string): string {
  return trimPath(path).split("/")[0];
}

export function numericNoun(num: number, [oneForm, twoForm, fiveForm]: [string, string, string | undefined]): string {
  const lastNum = Number(String(num).substr(-1));
  const firstNum = Number(String(num).substr(-2, 1));
  if (String(num).length === 1 && lastNum === 1) return oneForm;
  if (firstNum === 1 && lastNum <= 9) return fiveForm || twoForm;
  if (lastNum === 0 || lastNum > 4) return fiveForm || twoForm;
  if (lastNum === 1) return oneForm;
  return twoForm;
}

export function durationFormater(start: number, end: number, secondsInc = true): string {
  const duration = {
    years: moment.duration(end - start).get("y")
      ? `${moment.duration(end - start).get("y") + " " + numericNoun(moment.duration(end - start).get("y"), ["год", "года", "лет"])}`
      : null,
    months: moment.duration(end - start).get("M")
      ? `${moment.duration(end - start).get("M") + " " + numericNoun(moment.duration(end - start).get("M"), ["месяц", "месяца", "месяцев"])}`
      : null,
    days: moment.duration(end - start).get("d")
      ? `${moment.duration(end - start).get("d") + " " + numericNoun(moment.duration(end - start).get("d"), ["день", "дня", "дней"])}`
      : null,
    hours: moment.duration(end - start).get("h")
      ? `${moment.duration(end - start).get("h") + " " + numericNoun(moment.duration(end - start).get("h"), ["час", "часа", "часов"])}`
      : null,
    minutes: moment.duration(end - start).get("m")
      ? `${moment.duration(end - start).get("m") + " " + numericNoun(moment.duration(end - start).get("m"), ["минута", "минуты", "минут"])}`
      : null,
    seconds:
      moment.duration(end - start).get("s") && secondsInc
        ? `${moment.duration(end - start).get("s") + " " + numericNoun(moment.duration(end - start).get("s"), ["секунда", "секунды", "секунд"])}`
        : null,
  };

  let stringDuration = "";
  for (const val of Object.values(duration)) {
    if (val) stringDuration += ` ${val} `;
  }
  return stringDuration;
}
export function str2date(date: string, time?: string): Date {
  if (time) {
    const timeToArr = time.split(":");
    const timeToMinutes = Number(timeToArr[0]) * 60 + Number(timeToArr[1]);
    const newDate = moment(date, "YYYY-MM-DD").add(timeToMinutes, "minutes").format();
    return new Date(newDate);
  }
  date.replace(/ /gi, "T");
  return new Date(moment(date).format());
}
