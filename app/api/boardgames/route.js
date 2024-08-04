import Boardgame from "@/models/boardgame";
import connectToDB from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const boardgames = await Boardgame.find({});
    return NextResponse.json(boardgames, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error in creating boardgame" + err },
      { status: 500 }
    );
  }
}
