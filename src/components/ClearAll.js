import React from 'react'
import { AiOutlineClear } from "react-icons/ai";
export const ClearAll = ({handleClearAll}) => {
  return (
    <button
  onClick={handleClearAll}
  aria-label="Clear All Items"
>
  <AiOutlineClear />
  Clear All
</button>

  )
}
