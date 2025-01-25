import React, { useRef } from 'react'
import { FaPlus } from "react-icons/fa";
export const AddItem = ({newItem,setNewItem,handleSubmit,handleUpdateTime}) => {
  const inputRef = useRef()
  return (
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
          setNewItem((prevState) => ({ ...prevState, item: e.target.value }))
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
    </form>
  )
}
