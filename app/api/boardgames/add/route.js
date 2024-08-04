import Boardgame from "@/models/boardgame";
import connectToDB from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { boardgames } = await req.json();

  try {
    await connectToDB();

    boardgames.forEach(async (bg) => {
      console.log(bg);
      // const boardgameExist = await Boardgame.findOne({ bggId: bg.bggId });
      // console.log(!boardgameExist)
      // if (!boardgameExist)
        await Boardgame.create(bg);
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
