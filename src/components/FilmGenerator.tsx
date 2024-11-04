'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const API_KEY = 'YOUR_OMDB_API_KEY' // Replace with your actual OMDB API key

export default function FilmGenerator() {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(false)

  const generateRandomMovie = async () => {
    setLoading(true)
    const randomId = Math.floor(Math.random() * 2155529).toString().padStart(7, '0')
    try {
      const response = await fetch(`http://www.omdbapi.com/?i=tt${randomId}&apikey=${API_KEY}`)
      const data = await response.json()
      if (data.Response === "True") {
        setMovie(data)
      } else {
        generateRandomMovie()
      }
    } catch (error) {
      console.error("Error fetching movie:", error)
    }
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Random Film Generator</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <Button onClick={generateRandomMovie} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Random Film'}
        </Button>
        {movie && (
          <div className="text-center">
            <h2 className="text-xl font-semibold">{movie.Title}</h2>
            <p>Year: {movie.Year}</p>
            <p>Director: {movie.Director}</p>
            <p>Genre: {movie.Genre}</p>
            {movie.Poster !== "N/A" && <img src={movie.Poster} alt={movie.Title} className="mt-4 mx-auto max-w-full h-auto" />}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
