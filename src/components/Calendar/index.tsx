import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  Calendar as CustomCalendar,
  DateObject,
  LocaleConfig,
} from "react-native-calendars";

import { useTheme } from "styled-components/native";
import { ptBR } from "./localeConfig";

LocaleConfig.locales["pt-br"] = ptBR;

LocaleConfig.defaultLocale = "pt-br";

export interface MarkedDateObjectProps {
  color: string;
  textColor: string;
  disabled?: boolean;
  disabledTouchEvent?: boolean;
}

export interface MarkedDateProps {
  [date: string]: MarkedDateObjectProps;
}

export interface DayProps {
  dateString: string;
  day: string;
  month: string;
  year: string;
  timestamp: number;
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: (date: DateObject) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  markedDates,
  onDayPress,
}) => {
  const theme = useTheme();
  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather
          size={32}
          color={theme.colors.text}
          name={direction === "left" ? "chevron-left" : "chevron-right"}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        textMonthFontFamily: theme.fonts.secondary_600,

        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
};
