"use client";
import { useState } from "react";
import { XMLParser } from "fast-xml-parser";
import { useRouter } from "next/navigation";

export default function AddBoardgamePage() {
  const [bggLink, setBggLink] = useState("");
  const [boardgames, setBoardgames] = useState([]);
  const router  = useRouter()
  const addBoargames = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/boardgames/add", {
      method: "POST",
      body: JSON.stringify({
        boardgames,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      router.push("/boardgames")
    }
  };

  const getBggGameInfo = (e) => {
    e.preventDefault();
    const id = bggLink.split("/")[4];
    fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${id}`)
      .then((res) => res.text())
      .then((data) => {
        const parser = new XMLParser({ ignoreAttributes: false });

        const {
          items: { item },
        } = parser.parse(data);
        if (item) {
          console.log(item)
          // const exp = item.link.filter((link) => link["@_type"] === "boardgameexpansion");
          setBoardgames((prevState) => [
            ...prevState,
            {
              title: item.name[0]
                ? item.name[0]["@_value"].toLowerCase()
                : item.name["@_value"].toLowerCase(),
              thumbnail: item.thumbnail,
              image: item.image,
              isExpansion: item["@_type"] === "boardgameexpansion",
              year: item.yearpublished["@_value"],
              minPlayers: item.minplayers["@_value"],
              maxPlayers: item.maxplayers["@_value"],
              minPlayTime: item.minplaytime["@_value"],
              maxPlayTime: item.maxplaytime["@_value"],
              minAge: item.minage["@_value"],
              description: item.description,
              bggId: id,
            },
          ]);
          setBggLink("");
        } else {
          console.log("please try again");
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      <form onSubmit={getBggGameInfo}>
        <input
          type="text"
          placeholder="bggLink"
          value={bggLink}
          onChange={(e) => setBggLink(e.target.value)}
        />

        <button>Submit</button>
      </form>
      {boardgames.length > 0 &&
        boardgames.map((bg) => (
          <div key={bg.bggId}>
            {console.log(bg)}
            <h2>{bg.title}</h2>
            <img src={bg.thumbnail} />
          </div>
        ))}
      <button onClick={addBoargames}>Add Games</button>
    </>
  );
}
