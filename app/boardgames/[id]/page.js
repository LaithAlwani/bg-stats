"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BoardgamePage() {
  const params = useParams();
  const [boardgame, setBoardgame] = useState({});
  const getBoardgame = async () => {
    const res = await fetch(`/api/boardgames/${params.id}`);
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setBoardgame(data);
    }
  };
  useEffect(() => {
    getBoardgame();
  }, []);
  return (
    <div>
      {boardgame && (
        <>
          <h2>{boardgame.title}</h2>
          <img src={boardgame.image} />
          <span>
            {boardgame.minPlayers} - {boardgame.maxPlayers}
          </span>
        </>
      )}
    </div>
  );
}
