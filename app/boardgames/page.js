"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BoardgamesPage() {
  const [boardgames, setBoardgames] = useState([]);
  const getBoardgames = async () => {
    const res = await fetch("/api/boardgames");
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setBoardgames(data);
    }
  };
  useEffect(() => {
    getBoardgames();
  }, []);
  return (
    <div>
      {boardgames.map((bg) => (
        <Link href={`/boardgames/${bg._id}`}>
          <h2>{bg.title}</h2>
          <img src={bg.image} style={{width:"128px"}} />
        </Link>
      ))}
    </div>
  );
}
