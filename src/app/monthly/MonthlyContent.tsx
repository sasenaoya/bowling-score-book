"use client";
import { useState } from "react";

import { Button } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import dayjs from "dayjs";

import styles from "./MonthlyContent.module.scss";
import { useRouter } from "next/navigation";

export default function MonthlyContent() {
  const [date, setDate] = useState(dayjs().startOf("date"));
  const router = useRouter();

  /** カレンダーを1か月前に移動 */
  function hadnlePrevMonthClick() {
    setDate(date.add(-1, 'month'));
  }

  /** カレンダーを1か月後に移動 */
  function hadnleNextMonthClick() {
    setDate(date.add(1, 'month'));
  }

  /** 日付をクリック */
  function handleDateClick(date: dayjs.Dayjs) {
    router.push(`create-event?date=${date.format("YYYY-MM-DD")}`);
  }

  /** ヘッダーを描画 */
  function renderMonthHeader() {
    return (
      <div className={styles.monthHeader}>
        <Button onClick={hadnlePrevMonthClick}><FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon></Button>
        <Button onClick={hadnleNextMonthClick}><FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon></Button>
        <div className='date'>{date.format('YYYY/MM')}</div>
      </div>
    );
  }

  /** カレンダーの1行目（曜日）を描画 */
  function renderWeekday() {
    return (
      <tr className={`${styles.week}`}>
        {
          ['日', '月', '火', '水', '木', '金', '土'].map((value, i) => (
            <td
              key={i}
              className={[styles.day, styles[`day-${i}`]].join(" ")}
            >
              <div className={styles.dayHeader}>{value}</div>
            </td>
          ))
        }
      </tr>
    );
  }

  /** 6週描画 */
  function renderWeeks() {
    return [0, 1, 2, 3, 4, 5].map(i => {
      return renderWeek(i);
    });
  }

  /** 1週間描画 */
  function renderWeek(week: number) {
    const elems = [];
    let d = date.date(1).add(week, "week").day(0);
    for (let i = 0; i < 7; i++) {
      elems.push(renderDay(d.day(i)))
    }
    return <tr key={week} className={styles.week}>{elems}</tr>;
  }

  /** 日を描画 */
  function renderDay(renderDate: dayjs.Dayjs) {
    const className = [
      styles.day,
      styles[`day-${renderDate.day()}`],
      renderDate.month() < date.month() ? styles.prevMonth : undefined,
      renderDate.month() > date.month() ? styles.nextMonth : undefined
    ].filter(v => v).join(" ");
    
    return (
      <td key={renderDate.format('YYYY-MM-DD')} className={className} onClick={() => handleDateClick(renderDate)}>
        <div className={styles.wrapper}>
          <div className={styles.date}>{renderDate.date()}</div>
        </div>
      </td>
    );
  }

  return (
    <div className={styles.content}>
      { renderMonthHeader() }
      <table>
        <thead>
          { renderWeekday() }
        </thead>
        <tbody>
          { renderWeeks() }
        </tbody>
      </table>
    </div>
  );
}
