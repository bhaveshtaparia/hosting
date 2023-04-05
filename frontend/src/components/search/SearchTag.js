import React from 'react'
import search from '../../Images/search.png'
import './search.css'
import { Link } from 'react-router-dom'
export default function SearchTag() {
  return (
      <Link className='search' to={`search`}>
<img src={search} alt="search"/>
    </Link>
  )
}
