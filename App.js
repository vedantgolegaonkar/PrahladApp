import React from 'react'
import AppNavigator from './navigation/AppNavigator'
import { BookingProvider } from './context/BookingContext'

export default function App() {
  return (
    <BookingProvider>
    <AppNavigator />
    </BookingProvider>
  )
}

