"use client"
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

export default function SignoutButton() {
  return (
   
    <Button onClick={async () => {
        await signOut()
      }} type="submit"> Sign out</Button>
  )
}
