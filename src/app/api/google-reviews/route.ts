import { NextResponse } from "next/server"
import { fetchPlaceData } from "@/lib/google-reviews"

export const revalidate = 21600

export async function GET() {
  const data = await fetchPlaceData()
  return NextResponse.json(data)
}
