import React from 'react'
import { FaSearch } from "react-icons/fa";

export const SearchItem = ({search,setSearch}) => {
  return (
    <form className='searchForm' onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="search">Search</label>
        <input type="text" 
                id='search'
                // role='searchBox'
                placeholder='Search Schedule'
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
        />
        <button
          type='submit'
          aria-label='Search Item'
        >
        <FaSearch />
        </button>
    </form>
  )
}
