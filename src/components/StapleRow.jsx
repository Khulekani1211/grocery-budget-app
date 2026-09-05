import {useState} from 'react';
import {COLORS} from '../constants/colors.js';

export default function StapleRow({ item, isEditing, onRowClick, onConfirm, onCancel }) {
  const [priceDraft, setPriceDraft] = useState(String(item.defaultPrice));

  if (isEditing) {
    return (
        <li className="flex items-center gap-2">
            <span className="flex-1">{item.name}</span>
            <input
                type="number"
                autoFocus
                value={priceDraft}
                onChange={(e) => setPriceDraft(e.target.value)}
                className="border rounded px-2 py-1 w-20"
            />
            <button
                onClick={() => onConfirm(parseFloat(priceDraft))}
                className="text-green-700 font-bold"
            >
                ✔
            </button>
            <button
                onClick={onCancel}
                className="text-red-700 font-bold"
            >
                ✘
            </button>
        </li>

        );
    }

    return (
        <li className="flex items-center gap-2 py-1">
            
            {/* <input
                type="checkbox"
                checked={!!item.checked}
                onChange={onRowClick}
            />
            {item.name} - R {item.checked ? item.price : `¬${item.defaultPrice}`} */}
            <button
                onClick={onRowClick}
                className="rounded-full flex items-center justify-center mr-2 shrink-0"
                aria-label={item.checked ? `Mark ${item.name} not purchased` : `Mark ${item.name} as purchased`}
                style={{
                    width: 24,
                    height: 24,
                    backgroundColor: item.checked ? COLORS.basil : 'transparent',
                    border: item.checked ? 'none' : `2px solid ${COLORS.kraft}`,
                    color: item.checked ? 'white' : COLORS.kraft,
                }}
            >
                {item.checked && '✓'}
            </button>
            {item.name} - R {item.checked ? item.price : `¬${item.defaultPrice}`}
        
        </li>
    );
}