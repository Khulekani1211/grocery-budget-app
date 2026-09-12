import {useState} from 'react';
import {COLORS} from '../constants/colors.js';
import Money from './Money.jsx';

export default function StapleRow({ item, isEditing, onRowClick, onConfirm, onCancel, onRemove }) {
  const [priceDraft, setPriceDraft] = useState(String(item.defaultPrice));

  if (isEditing) {
    return (
        <li className="flex items-center gap-2">
            <span className="flex-1 min-w-0">{item.name}</span>
            <input
                type="number"
                autoFocus
                value={priceDraft}
                onChange={(e) => setPriceDraft(e.target.value)}
                className="border shrink-0 rounded px-2 py-1 w-20"
            />
            <button
                onClick={() => onConfirm(parseFloat(priceDraft))}
                className="text-green-700 font-medium"
                style={{ backgroundColor: COLORS.basil, color: COLORS.chalk, padding: '0.5rem 0.5rem', borderRadius: '50%' }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
            </button>
            <button
                onClick={onCancel}
                className="text-red-700 font-bold"
                style={{ backgroundColor: COLORS.paper, color: COLORS.chalk, padding: '0.5rem 0.5rem', borderRadius: '50%', opacity: 0.5 }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
        </li>

        );
    }

    return (
        <li className="flex items-center gap-2 py-1">
            
            <button
                onClick={onRowClick}
                className="rounded-full flex items-center justify-center mr-2 shrink-0"
                aria-label={item.checked ? `Mark ${item.name} not purchased` : `Mark ${item.name} as purchased`}
                style={{
                    width: 28,
                    height: 28,
                    backgroundColor: item.checked ? COLORS.basil : 'transparent',
                    border: item.checked ? 'none' : `2px solid ${COLORS.kraft}`,
                    color: item.checked ? 'white' : COLORS.kraft,
                }}
            >
                {item.checked && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>}
            </button>

            <span
                style={{
                    color: COLORS.ink,
                    opacity: item.checked ? 0.5 : 1,
                    textDecoration: item.checked ? 'line-through' : 'none',
                }}
                className="flex-1 text-sm"
            >
                {item.name}
            </span>

            {
                item.checked ? (
                    <Money value={item.price} />
                ) : (
                    <span style={{ color: COLORS.ink, opacity: 0.4, fontFamily: '"IBM Plex Mono", monospace' }} className="text-xs">
                        ¬R {item.defaultPrice.toFixed(2)}
                    </span>
                )
            }

            <button
                onClick={onRemove}
                aria-label={`Remove ${item.name} from staples`}
                className="p-1 shrink-0"
            >
                <span style={{ color: COLORS.ink, opacity: 0.3 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                </span>
            </button>
        
        </li>
    );
}