import { utcToZonedTime } from "date-fns-tz";
import { formatDistanceToNow, format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const getTimeDistanceFromNowInTimeZoneBr = (date: string) => {
  const saoPauloTimeZone = "America/Sao_Paulo";
  const utcDate = new Date(date);
  const saoPauloDate = utcToZonedTime(utcDate, saoPauloTimeZone);
  return formatDistanceToNow(saoPauloDate, {
    addSuffix: true,
    locale: ptBR,
  });
};

export const getDetailedTimeInTimeZoneBr = (date: string) => {
  const saoPauloTimeZone = "America/Sao_Paulo";
  const utcDate = new Date(date);
  const saoPauloDate = utcToZonedTime(utcDate, saoPauloTimeZone);
  return format(
    saoPauloDate,
    "'dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm 'na zona de horário' zzzz",
    {
      locale: ptBR,
    }
  );
};
