const convertTime = (seconds) => {
  const date = new Date(seconds * 1000);
  const padZero = (num) => (num < 10 ? "0" + num : num);

  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const year = date.getFullYear();
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());

  return `${month}/${day}/${year} ${hours}:${minutes}`;
};

const getTime = (seconds) => {
  const date = new Date(seconds * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutesStr} ${ampm}`;
};

const getMonth = (seconds) => {
  const date = new Date(seconds * 1000);
  const monthIndex = date.getMonth();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return monthNames[monthIndex];
};

const getDay = (seconds) => {
  const date = new Date(seconds * 1000);
  const day = date.getDate();
  return day < 10 ? "0" + day : day.toString();
};

const getYear = (seconds) => {
  const date = new Date(seconds * 1000);
  const year = date.getFullYear();
  return year.toString();
};

const getDayOfWeek = (seconds) => {
  const date = new Date(seconds * 1000);
  const dayIndex = date.getDay();

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return dayNames[dayIndex];
};

const capitalize = (s) => {
  return s[0].toUpperCase() + s.slice(1);
};
export {
  convertTime,
  capitalize,
  getDay,
  getMonth,
  getYear,
  getDayOfWeek,
  getTime,
};
