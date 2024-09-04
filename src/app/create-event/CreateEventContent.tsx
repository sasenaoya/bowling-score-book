"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { FormProvider, useForm } from "react-hook-form";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import dayjs, { Dayjs } from "dayjs";

import styles from "./CreateEventContent.module.scss";

import Autocomplete from "@/components/form/Autocomplete";

export default function CreateEventContent() {
  const [date, setDate] = useState<Dayjs>();
  const [eventType, setEventType] = useState("tournament");
  const [bowlingAlleyList, setBowlingAlleyList] = useState<string[]>([]);
  const [eventList, setEventList] = useState<string[]>([]);
  const [leagueList, setleagueList] = useState<string[]>([]);
  const [seasonList, setSeasonList] = useState<string[]>([]);
  const methods = useForm();

  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const date = params.get("date");
    if (date) {
      setDate(dayjs(date));
    }
  }, [params]);

  function handleEventTypeChange(event: SelectChangeEvent) {
    setEventType(event.target.value);
  }

  function handleCancelClick() {
    router.back();
  }

  const handleSubmit = methods.handleSubmit((data) => {
    console.log("🔶", data);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <div>{date?.format('YYYY年MM月DD日')}</div>
        <div className={styles.content}>
          <Select {...methods.register("eventType")} value={eventType} onChange={handleEventTypeChange}>
            <MenuItem value="tournament">トーナメント</MenuItem>
            <MenuItem value="league">リーグ</MenuItem>
            <MenuItem value="practice">練習</MenuItem>
          </Select>
          <Autocomplete name="bowlingAlley" label="ボウリング場" values={bowlingAlleyList} />
          <Autocomplete name="eventName" label="イベント名" values={eventList} />
          <Autocomplete name="season" label="シーズン" values={seasonList} />

          <div className={styles.buttons}>
            <Button type="button" onClick={handleCancelClick}>キャンセル</Button>
            <Button type="submit" color='primary' variant="contained">作成</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}