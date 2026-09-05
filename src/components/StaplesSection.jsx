import { useState } from "react";
import StapleRow from "./StapleRow";
import { COLORS } from "../constants/colors.js";

export default function StaplesSection({ staples, onToggle, onConfirmPrice, onAdd, onRemove }) {
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStapleName, setNewStapleName] = useState('');
  const [newStaplePrice, setNewStaplePrice] = useState('');

  function handleRowClick(item) {
    if (item.checked){
        onToggle(item.id, null);
    }else{
        setEditingId(item.id);
    }
  }

  function handleConfirm(id, price){
    onConfirmPrice(id, price);
    setEditingId(null);
  }

  function hadleStapleAdd(){
    const price = parseFloat(newStaplePrice);
    if(!newStapleName.trim() || isNaN(price)) return;
    onAdd(newStapleName.trim(), price);
    setNewStapleName('');
    setNewStaplePrice('');
    setShowAddForm(false);
  }
  
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Staples</h2>
      <ul>
        <div style={{ backgroundColor: COLORS.chalk }} className="rounded-2xl p-4 shadow-sm">
          {staples.map((item, index) => (
            <div key={item.id} style={{ borderBottom: index < staples.length - 1 ? `1px dashed ${COLORS.grid}` : 'none' }} className="py-2">
              <StapleRow 
                key={item.id} 
                item={item} 
                isEditing={editingId === item.id}
                onRowClick={() => handleRowClick(item)}
                onConfirm={(price) => handleConfirm(item.id, price)}
                onCancel={() => setEditingId(null)}
                onRemove={() => onRemove(item.id)}
              />
            </div>
            
          ))}

          {
            showAddForm ? (
              <div className="flex items-center gap-2 py-3">
                <input 
                  autoFocus
                  value={newStapleName}
                  onChange={(e) => setNewStapleName(e.target.value)}
                  placeholder="Item name"
                  style={{ backgroundColor: COLORS.paper, color: COLORS.ink }}
                  className="w-16 rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="number"
                  value={newStaplePrice}
                  onChange={(e) => setNewStaplePrice(e.target.value)}
                  placeholder="0.00"
                  style={{ backgroundColor: COLORS.paper, color: COLORS.ink, fontFamily: '"IBM Plex Mono", monospace' }}
                  className="w-16 rounded-lg px-2 py-2 text-sm"
                />
                <button
                  onClick={hadleStapleAdd}
                  style={{ backgroundColor: COLORS.basil}}
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  style={{ backgroundColor: COLORS.ink}}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                style={{ backgroundColor: COLORS.basil}}
                className="w-full py-3 text-sm font-medium"
              >
                + Add Staple
              </button>
            )
          }
        </div>
        
      </ul>
    </div>
  );
}
    