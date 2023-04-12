import { utcToZonedTime } from "date-fns-tz";
import { formatDistanceToNow } from "date-fns";
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
