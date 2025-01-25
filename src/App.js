import { useState } from 'react';
import './App.css';
// import { AddItem } from './components/AddItem';
import { Content } from './components/Content';
import { Header } from './components/Header';
// import { SearchItem } from './components/SearchItem';
import { Footer } from './components/Footer';
// import { ClearAll } from './components/ClearAll';
import { EditItems } from './components/EditItems';

function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('todo_list');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [newItem, setNewItem] = useState({ item: '', time: '' });

  const [search, setSearch] = useState('');

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    localStorage.setItem('todo_list', JSON.stringify(listItems));
  };
  

  const handleUpdateTime = (id, newTime) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, time: newTime } : item // Keep the original item if id doesn't match
    );
    setItems(listItems);
    localStorage.setItem('todo_list', JSON.stringify(listItems));
  };
  

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    localStorage.setItem('todo_list', JSON.stringify(listItems));
  };

  const handleClearAll = () => {
    setItems([]);
    localStorage.removeItem('todo_list');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.item.trim()) return;
    addItem(newItem); 
    setNewItem({ item: '', time: '' }); 
  };
  

  const addItem = (itemObj) => {
    const id = (items || []).length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, ...itemObj }; // Spread the item object
    const listItems = [...(items || []), addNewItem];
    setItems(listItems);
    localStorage.setItem('todo_list', JSON.stringify(listItems));
  };
  

  return (
    <div className="App">
      <Header />
      <EditItems 
          items = {items}
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
          handleUpdateTime={handleUpdateTime}
          handleClearAll={handleClearAll}
          search={search} 
          setSearch={setSearch}
      />
      <Content
        items={items.filter(item =>
          item.item && item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleUpdateTime={handleUpdateTime}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />

      <Footer items={items || []} />
    </div>
  );
}

export default App;
