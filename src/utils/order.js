


export const getStatusColor = (status) => {
  switch (status) {
    case '2':
      return 'info'
    case '3':
      return 'warning'
    case '8':
      return 'error'
    default:
      return 'success'
  }
}



export const getStatusVariant = (status) => {
  switch (status) {
    case '1':
      return 'contained'
    case '2':
      return 'outlined'
    default:
      return 'soft'
  }
}


export const getTotal = (total, delivery, discount) => (total + delivery - discount)

