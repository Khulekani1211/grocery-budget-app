import { useState } from "react";
import StapleRow from "./StapleRow";

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
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Staples</h2>
      <ul>
        {staples.map((item) => (
          <StapleRow 
            key={item.id} 
            item={item} 
            isEditing={editingId === item.id}
            onRowClick={() => handleRowClick(item)}
            onConfirm={(price) => handleConfirm(item.id, price)}
            onCancel={() => setEditingId(null)}
          />
        ))}
      </ul>
    </div>
  );
}
    