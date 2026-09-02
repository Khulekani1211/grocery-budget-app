import {useState} from 'react';
import Money from './Money.jsx';
import { COLORS } from "../constants/colors.js";

export default function ExtrasSection({ extras, onAdd}){
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
        <div className="mb-5">
            <h2 style={{ fontFamily: '"Space Grotesk", sans-serif' , color: COLORS.ink }} className="text-lg font-bold mb-2">Extras</h2>
            <div style={{ backgroundColor: COLORS.chalk }} className="rounded-2xl p-4 shadow-sm">
                <div className="flex gap-2 mb-3">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="What are you adding?"
                        style={{ backgroundColor: COLORS.paper, color: COLORS.ink }}
                        className="flex-1 rounded-lg px-3 py-3 text-sm"
                    />
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0"
                        style={{ backgroundColor: COLORS.paper, color: COLORS.ink, fontFamily: '"IBM Plex Mono", monospace' }}
                        className="w-16 rounded-lg px-2 py-3 text-sm"
                    />
                    <button
                        onClick={handleAdd}
                        style={{ backgroundColor: COLORS.basil}}
                        className="px-4 rounded-lg text-white font-semibold shrink-0"
                    >
                        Add
                    </button>
                </div>
            </div>

            <ul>
            {extras.map((item,index) => (
                <div key={item.id} style={{ borderTop: index > 0 ? `1px dashed ${COLORS.grid}` : 'none' }} className="flex justify-between py-2 text-sm">
                    <span style={{ color: COLORS.ink }}>{item.name}</span>
                    <Money value={item.price} />
                </div>
                
            ))}
            </ul>
      </div>
    )
}