import React from 'react'



export const LoginSpotify = () => {

const CLIENT_ID = '2a317120184f4601b4cc039800c05256'
const REDIRECT_URI = 'http://localhost:3000'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const RESPONSE_TYPE = 'token'

  return (
    <div className='flex flex-col justify-center items-center text-[#ffffff] h-12 bg-[#000000] mx-auto py-4'>
      <h1> Log in to get access token</h1> 
     <a href={ `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>LOGIN TO SPOTIFY</a>
    </div>
  )
}
