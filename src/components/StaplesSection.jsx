import { useState } from "react";
import StapleRow from "./StapleRow";
import { COLORS } from "../constants/colors.js";

export default function StaplesSection({ staples, onToggle, onConfirmPrice }) {
  const [editingId, setEditingId] = useState(null);

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
              />
            </div>
            
          ))}
        </div>
        
      </ul>
    </div>
  );
}
    