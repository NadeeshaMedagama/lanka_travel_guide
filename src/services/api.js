/**
 * API Service Layer
 * 
 * WHY ONE FILE: Separation of Concerns — if the API URL changes, only one file needs editing. Components should not know WHERE data comes from.
 * WHAT IS REST API: Representational State Transfer — stateless, resource-based HTTP architecture. Each URL represents a resource (/attractions is the collection, /attractions/5 is one item).
 * WHAT IS JSON-SERVER: A zero-config npm tool that reads db.json and exposes it as a real HTTP REST API on localhost. Perfect for development without a real backend.
 * WHY ASYNC/AWAIT: Cleaner, more readable, easier to debug than .then()/.catch() — reads like synchronous code while being asynchronous.
 */

const BASE_URL = 'http://localhost:3001'

export async function fetchAllAttractions() {
  const response = await fetch(`${BASE_URL}/attractions`)
  // fetch() does NOT throw on HTTP errors (404, 500) — it only rejects (throws) on network failures. response.ok covers 200-299 status codes.
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
  // Reads the response body stream and parses it as JSON. Also returns a Promise, so it needs await.
  return response.json()
}

export async function fetchAttractionById(id) {
  const response = await fetch(`${BASE_URL}/attractions/${id}`)
  if (!response.ok) throw new Error(`Attraction ${id} not found: ${response.status}`)
  return response.json()
}

export async function fetchByCategory(category) {
  const url = category === 'All'
    ? `${BASE_URL}/attractions`
    // prevents URL injection if category names contain spaces or special characters
    : `${BASE_URL}/attractions?category=${encodeURIComponent(category)}`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to filter by ${category}: ${response.status}`)
  return response.json()
}
