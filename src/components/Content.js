import React from 'react';
import { FaTrash } from 'react-icons/fa';

export const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <main>
      <div className='List-Container'>
        {items && items.length > 0 ? (
          <ul style={{margin:"0px"}}>
            <p style={{ marginTop: '0px' }}>Your List is...</p>
            {items.map((item) => (
              <li className="item" key={item.id}>
                <input
                  type="checkbox"
                  onChange={() => handleCheck(item.id)}
                  checked={item.checked}
                />
                <label
                  style={item.checked ? { textDecoration: 'line-through' } : null}
                  onClick={() => handleCheck(item.id)}
                  >
                    {console.log(typeof item.time)}
                  {item.time} {item.item}
                </label>

                <FaTrash
                  role="button"
                  onClick={() => handleDelete(item.id)}
                  tabIndex="0"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ marginTop: '0px' }}>Your List is Empty</p>
        )}
      </div>
      
    </main>
  );
};
