export function getGreeting(): string {
  const hour = new Date().getHours()
  
  if (hour >= 5 && hour < 12) {
    return 'Good morning'
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon'
  } else if (hour >= 17 && hour < 22) {
    return 'Good evening'
  } else {
    return 'Good night'
  }
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function triggerNotification(title: string, message: string) {
  // Check if Chrome extension API is available
  if (typeof window !== 'undefined' && (window as any).chrome?.runtime) {
    try {
      (window as any).chrome.runtime.sendMessage({ type: 'TIMER_COMPLETE' })
    } catch (error) {
      console.log('Chrome extension context not available')
    }
  }
  // Fallback to Web Notification API
  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification(title, { body: message })
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, { body: message })
        }
      })
    }
  }
}
