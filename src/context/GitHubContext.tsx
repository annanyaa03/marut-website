'use client'

import React, { createContext, use, useMemo, useSyncExternalStore } from 'react'

export interface Contributor {
  login: string
  avatar_url: string
  html_url: string
}

export interface GitHubData {
  stars: number
  forks: number
  contributorsCount: number
  contributors: Contributor[]
}

interface GitHubContextType {
  data: GitHubData | null
  loading: boolean
  error: boolean
}

const GitHubContext = createContext<GitHubContextType>({
  data: null,
  loading: false,
  error: false,
})

const fallbackGitHubData: GitHubData = {
  stars: 13,
  forks: 2,
  contributorsCount: 5,
  contributors: [
    { login: 'lawslefthand', avatar_url: 'https://github.com/lawslefthand.png', html_url: 'https://github.com/lawslefthand' },
  ],
}

let snapshot: GitHubContextType = {
  data: null,
  loading: true,
  error: false,
}

let requestStarted = false
const listeners = new Set<() => void>()

function emitChange() {
  listeners.forEach((listener) => listener())
}

function setSnapshot(nextSnapshot: GitHubContextType) {
  snapshot = nextSnapshot
  emitChange()
}

function loadGitHubData() {
  if (requestStarted) {
    return
  }

  requestStarted = true

  fetch('/api/github')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub data')
      }

      return response.json() as Promise<GitHubData>
    })
    .then((data) => {
      setSnapshot({
        data,
        loading: false,
        error: false,
      })
    })
    .catch((error) => {
      console.error('Error fetching GitHub data in client:', error)
      setSnapshot({
        data: fallbackGitHubData,
        loading: false,
        error: true,
      })
    })
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  loadGitHubData()

  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return snapshot
}

const serverSnapshot: GitHubContextType = {
  data: fallbackGitHubData,
  loading: false,
  error: false,
}

function getServerSnapshot() {
  return serverSnapshot
}

export function GitHubProvider({ children }: { children: React.ReactNode }) {
  const githubState = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const value = useMemo<GitHubContextType>(() => githubState, [githubState])

  return (
    <GitHubContext.Provider value={value}>
      {children}
    </GitHubContext.Provider>
  )
}

export function useGitHub() {
  return use(GitHubContext)
}
