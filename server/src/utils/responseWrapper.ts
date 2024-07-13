const error = (stausCode: number, message: string) => {
  return {
    stausCode,
    message
  }
}

const success = (stausCode: number, result: object) => {
  return {
    stausCode,
    result
  }
}

export {
  error,
  success
}