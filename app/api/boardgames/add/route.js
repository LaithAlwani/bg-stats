import Boardgame from "@/models/boardgame";
import connectToDB from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { boardgames } = await req.json();

  try {
    await connectToDB();

    for (const bg in boardgames) {
      const boardgameExist = await Boardgame.findOne({ bggId: boardgames[bg].bggId });
      console.log(bg)
      if (!boardgameExist)
        await Boardgame.create(boardgames[bg]);
      
    }

    return NextResponse.json(
      { message: `boardgames have been created` },
      { status: 200 }
    );
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { message: "Error in creating boardgame" + err },
      { status: 500 }
    );
  }
}
