import db from "../../../db";
import { advocates, type Advocate } from "../../../db/schema";
import { NextResponse } from "next/server";
// import { advocateData } from "../../../db/seed/advocates";

type AdvocateResponse = NextResponse<{ data: Advocate[]}> | NextResponse<{ error: string }>;

export async function GET(): Promise<AdvocateResponse> {
  // Uncomment this line to use a database

  try {
    const data = await db.select().from(advocates);
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "There was an error returning the advocates" },
      { status: 500 }
    );
  }
  // const data = advocateData;
}
