'use client'
import { useState } from 'react'

export default function AddBoardgamePage() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [minPlayers, setMinPlayers] = useState("");
    const [maxPlayers, setMaxPlayers] = useState("");
    const [isExpansion, setIsExpansion] = useState(false);

    const addBoargame = async(e)=>{
        e.preventDefault();
        await fetch("/api/boardgames/add",{
            method:"POST",
            body:JSON.stringify({title, image, minPlayers, maxPlayers, isExpansion})
        })
    }
  return (
    <form onSubmit={addBoargame}>
        <input type='text'placeholder='title' onChange={(e)=>setTitle(e.target.value)}/>
        <input type='text'placeholder='image' onChange={(e)=>setImage(e.target.value)}/>
        <input type='number'placeholder='min players' onChange={(e)=>setMinPlayers(e.target.value)}/>
        <input type='number'placeholder='max players' onChange={(e)=>setMaxPlayers(e.target.value)}/>
        <input type="checkbox" />
        <button>Submit</button>
    </form>
  )
}
