export function useInterval() {
  const interval = null
  function clearInterval() {
    if (interval) clearInterval(interval)
  }

  return { interval, clearInterval }
}