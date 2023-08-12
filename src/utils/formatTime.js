import { format, getTime, formatDistanceToNow } from 'date-fns';

// -----------------------------------------------

export function fDate(date) {
  if (!date) {
    return '';
  }
  return format(new Date(date), 'dd MMM yyyy');
}

export function fDateTime(date) {
  if (!date) {
    return '';
  }
  return format(new Date(date), 'dd MMM yyyy • HH:mm');
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}
