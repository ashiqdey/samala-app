// -----------------------------------------------

const PRIMARY_NAME = ['A', 'N', 'H', 'L', 'Q', '9', '8'];
const INFO_NAME = ['F', 'G', 'T', 'I', 'J', '1', '2', '3'];
const SUCCESS_NAME = ['K', 'D', 'Y', 'B', 'O', '4', '5'];
const WARNING_NAME = ['P', 'E', 'R', 'S', 'C', 'U', '6', '7'];
const ERROR_NAME = ['V', 'W', 'X', 'M', 'Z'];

function getFirstCharacter(name) {
  return name && name.charAt(0).toUpperCase();
}

function getAvatarColor(name) {
  const n = getFirstCharacter(name);
  if (PRIMARY_NAME.includes(n)) return 'primary';
  if (INFO_NAME.includes(n)) return 'info';
  if (SUCCESS_NAME.includes(n)) return 'success';
  if (WARNING_NAME.includes(n)) return 'warning';
  if (ERROR_NAME.includes(n)) return 'error';
  return 'default';
}

export default function createAvatar(name) {
  return {
    name: getFirstCharacter(name),
    color: getAvatarColor(name),
  };
}