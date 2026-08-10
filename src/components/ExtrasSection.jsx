import {useState} from 'react';

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
        <div>
            <h2 className="text-xl font-bold mb-2">Extras</h2>
            <div className="flex gap-2 mb-3">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Item name"
                    className="border rounded px-3 py-2"
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    className="border rounded px-3 py-2"
                />
                <button
                    onClick={handleAdd}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Add
                </button>
            </div>

            <ul>
            {extras.map((item) => (
                <li key={item.id}>
                {item.name} - R {item.price}
                </li>
            ))}
            </ul>
      </div>
    )
}