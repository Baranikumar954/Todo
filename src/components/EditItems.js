import React, { useRef } from 'react'
import { AiOutlineClear } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export const EditItems = ({items,newItem,setNewItem,handleSubmit,handleUpdateTime,handleClearAll,search,setSearch}) => {
  const inputRef = useRef();
  function toTitleCase(str) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }
  return (
    <div className='editTab'>
      <div className='edit-AddItemContainer'>
        <form className="addForm" onSubmit={handleSubmit}>
              <label htmlFor="addItem">Add Schedule</label>
              <input
                type="text"
                ref={inputRef}
                autoFocus
                id="addItem"
                placeholder="Add New Schedule"
                required
                value={newItem.item} // Access item property
                onChange={(e) =>
                  setNewItem((prevState) => ({ ...prevState, item: toTitleCase(e.target.value) }))
                } // Update only the item property
              />
              <input
                type="time"
                required
                value={newItem.time} // Access time property
                onChange={(e) =>
                  setNewItem((prevState) => ({ ...prevState, time: e.target.value }))
                } 
              />
              <button
                type="submit"
                aria-label="Add Item"
                onClick={() => inputRef.current.focus()}
              >
                <FaPlus />
              </button>
              {items.length > 1 && <button
                onClick={handleClearAll}
                aria-label="Clear All Items"
              >
                <AiOutlineClear />
                Clear All
              </button>}
            </form>
      </div>
      <div className='edit-SearchItemContainer'>
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
      </div>
    </div>
  )
}
