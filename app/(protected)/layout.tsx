// app/(protected)/layout.tsx
'use client'

import Spinner from '@/components/Spinner'
import { useUser } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <Spinner />
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
