"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BoardgamesPage() {
  const [boardgames, setBoardgames] = useState([]);
  const getBoardgames = async () => {
    const res = await fetch("/api/boardgames",{cache:"no-store"});
    if (res.ok) {
      const data = await res.json();
      setBoardgames(data);
    }
  };
  
  useEffect(() => {
    getBoardgames();
  }, []);

  return (
    <div>
      {boardgames.map((bg) => (
        <Link href={`/boardgames/${bg._id}`} key={bg._id}>
          <img src={bg.thumbnail}  />
        </Link>
      ))}
    </div>
  );
}
