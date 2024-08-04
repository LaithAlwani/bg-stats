import Boardgame from "@/models/boardgame";
import connectToDB from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { boardgames } = await req.json();

  try {
    await connectToDB();

    boardgames.forEach(async (bg) => {
      const tempBg = {
        title: bg.title,
        thumbnail: bg.thumbnail,
        image: bg.image,
        isExpansion: bg.isExpansion === "true" ? true : false,
        year: bg.year,
        minPlayers: parseInt(bg.minPlayers),
        maxPlayers: parseInt(bg.maxPlayers),
        minPlayTime: parseInt(bg.minPlayTime),
        maxPlayTime: parseInt(bg.maxPlayTime),
        minAge: parseInt(bg.minAge),
        description: bg.description,
        bggId: bg.bggId,
        year: bg.year,
      };
      const boardgameExist = await Boardgame.findOne({ bggId: tempBg.bggId });
      console.log(!boardgameExist)
      if (!boardgameExist) await Boardgame.create(bg);
    });

    return NextResponse.json(
      { message: `boardgames have been created` },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error in creating boardgame" + err },
      { status: 500 }
    );
  }
}
