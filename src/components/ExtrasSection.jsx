import {useState} from 'react';
import Money from './Money.jsx';
import { COLORS } from "../constants/colors.js";

export default function ExtrasSection({ extras, onAdd, onRemove }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    function handleAdd(){
        const parsePrice = parseFloat(price);
        if(!name.trim() || isNaN(parsePrice)) return;

        onAdd({
            id: Date.now(),
            name: name.trim(),
            price: parsePrice
        });
        setName('');
        setPrice('');
    }

    return (
        <div className="mb-5 mt-5">
            <h2 style={{ fontFamily: '"Space Grotesk", sans-serif' , color: COLORS.ink }} className="text-lg font-bold mb-2">Extras</h2>
            <div style={{ backgroundColor: COLORS.chalk }} className="rounded-2xl p-4 shadow-sm">
                <div className="flex gap-2 mb-3">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="What are you adding?"
                        style={{ backgroundColor: COLORS.paper, color: COLORS.ink }}
                        className="flex-1 min-w-0 rounded-lg px-3 py-3 text-sm"
                    />
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0"
                        style={{ backgroundColor: COLORS.paper, color: COLORS.ink, fontFamily: '"IBM Plex Mono", monospace' }}
                        className="w-16 shrink-0 rounded-lg px-2 py-3 text-sm"
                    />
                    <button
                        onClick={handleAdd}
                        style={{ backgroundColor: COLORS.basil}}
                        className="px-4 rounded-lg text-white font-semibold shrink-0"
                    >
                        Add
                    </button>
                </div>

                <ul>
                    {extras.map((item,index) => (
                        <div key={item.id} style={{ borderTop: index > 0 ? `1px dashed ${COLORS.grid}` : 'none' }} className="flex items-center py-2 text-sm">
                            <span style={{ color: COLORS.ink }}>{item.name}</span>
                            <div className="justify-end flex-1 text-right" style={{ color: COLORS.ink }}>
                                <Money value={item.price} />
                            </div>
                            

                            <button
                                onClick={() => onRemove(item.id)}
                                aria-label={`Remove ${item.name} from Extras`}
                                className="pl-3 shrink-0"
                            >
                                <span style={{ color: COLORS.ink, opacity: 0.3 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                                </span>
                            </button>
                        </div>
                        
                    ))}

                    
                </ul>
            </div>

            
        </div>
    )
}