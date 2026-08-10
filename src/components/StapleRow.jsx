import {useState} from 'react';

export default function StapleRow({ item, isEditing, onRowClick, onConfirm, onCancel }) {
  const [priceDraft, setPriceDraft] = useState(String(item.price));

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
        <li>
            <label>
                <input
                    type="checkbox"
                    checked={!!item.checked}
                    onChange={onRowClick}
                />
                {item.name} - R {item.checked ? item.price : `¬${item.price}`}
            </label>
        </li>
    );
}