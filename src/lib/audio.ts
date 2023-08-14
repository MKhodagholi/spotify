const getMinuteAudio = (time: number) => {
  let minute = Math.floor(time / 60).toString()

  if (minute.length < 2) minute = '0' + minute

  return minute
}

const getSecondAudio = (time: number) => {
  let second = Math.floor(time % 60).toString()

  if (second.length < 2) second = '0' + second

  return second
}

export { getMinuteAudio, getSecondAudio }
