import { useQuery } from "@tanstack/react-query"
import React, { useState} from 'react'
import { HiPlusSm } from "react-icons/hi";

const CLIENT_ID = '2a317120184f4601b4cc039800c05256'
const CLIENT_SECRET = 'de46d69f83174e0bb126aa7b4f4f2a97'

export const SearchComp = () => {

  const [ searchInput, setSearchInput ] = useState('')
  const [tokenAccess, setTokenAccess] = useState('')
  const [ albums, setAlbums ] = useState([])


  let authParams = { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
  }
 
  const { data }= useQuery({

    queryKey : ["spotifyData"],
    queryFn : () => fetch("https://accounts.spotify.com/api/token", authParams)
                .then((res) => res.json())
                .then((data) => setTokenAccess(data.access_token))
  })

  async function search(){
    console.log('Search item: ' + searchInput);

    let searchArtistParams = {
      method: 'GET',
      headers: {
          'Content-Type' : 'application.json',
          'Authorization' : 'Bearer ' + tokenAccess 
           }
    }

   let artistID =  await fetch('https://api.spotify.com/v1/search?q=remaster' + searchInput + '&type=artist', searchArtistParams)
                   .then(response => response.json())
                   .then(data => {return data.artists.items[0].id})

    let playListID = await fetch('https://api.spotify.com/v1/search?q=remaster' + searchInput + '&type=track' + '&include_external=audio', searchArtistParams)
                  .then(response => response.json())
                  .then(data => console.log(data))
    
    

    let returnAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums', searchArtistParams)
                  .then(response => response.json())
                  .then(data => { 
                    console.log(data)
                    setAlbums(data.items)
                  })
                  
  }


  return (
    <div className='max-w-[1240px] m-auto py-12 px-12'>

    <div className='flex flex-col justify-center items-center space-y-2 md:w-[600px] m-auto 
    bg-[#ffffff] p-4 border-b-2 '>


       <label htmlFor='search' className='text-sm font-medium text-[#000000] md:w-full'>Search for Playlist</label>

       <input type='text' className='peer bg-transparent rounded-sm text-[#000000] placeholder-transparent 
       ring-2 px-2 ring-[#000000] focus:ring-[#000000] focus:outline-none focus:border-rose-600 md:w-full' 
       onChange={(event) => setSearchInput(event.target.value)}/>

       <button className='ring-2 px-2 ring-[#000000] focus:ring-[#000000] focus: outline-none rounded-sm md:w-full' onClick={search}>Search Artist</button>

       
    </div>


    <div className='flex flex-col w-full mx-auto md:w-[600px] bg-[#ffffff] divide-x'>
        <div className='flex flex-col pl-2 w-full'>
            <h1>Play List Search</h1>
            <div className='flex flex-col w-full m-2'>
              {albums.map((album, i)=>{
                  return(
                    <div className='flex py-2'>
                    <div className='flex-none px-2'><img src={album.images[2].url} /></div>
                    <div className='grow'><ul><li>{album.name}</li></ul></div>
                    <div className='flex-none w-8'><HiPlusSm /></div>
                    </div>
                  )
              })}
              
            </div>
            
        </div>
        <div className='flex flex-col pl-2 w-full'>
            <h1>Add to Spotify</h1>
        </div>
    </div>

    </div>
  )
}
