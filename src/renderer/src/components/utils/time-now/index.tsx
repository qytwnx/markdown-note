import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

const weekNames = {
  'en-US': [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ],
  'zh-CN': [
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日'
  ]
};

const TimeNow = () => {
  const [time, setTime] = useState(() => {
    return dayjs().format('YYYY/MM/DD HH:mm:ss');
  });

  const text = useMemo(() => {
    const weekday = dayjs().day();
    return `${time} ${weekNames['en-US'][weekday > 0 ? weekday - 1 : 6]}`;
  }, [time]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(dayjs().format('YYYY/MM/DD HH:mm:ss'));
    }, 1_000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return <span>{text}</span>;
};

export default TimeNow;
