import Boardgame from "@/models/boardgame";
import connectToDB from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, image, minPlayers, maxPlayers, isExpansion } =
    await req.json();

  try {
    await connectToDB();

    const boardgame = await Boardgame.create({
      title,
      image,
      minPlayers,
      maxPlayers,
      isExpansion: isExpansion || false,
    });
    return NextResponse.json(
      { message: `${title} has been created`, boardgame },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error in creating boardgame" + err },
      { status: 500 }
    );
  }
}
