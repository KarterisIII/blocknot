import {useEffect, useState} from 'react'

export function useSearch(value, delay = 30) {
  const [debounced, setDebounced] = useState(value)   

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debounced
}