import Money from "./Money.jsx";
import { COLORS } from "../constants/colors.js";

export default function Receipt({ staples, extras, spent}) {

    const purchasedStaples = staples
        .filter(item => item.checked)
        .map((item) => ({ id: item.id, name: item.name, price: item.price, purchasedAt: item.purchasedAt }));

    const purchasedExtras = extras.map((item) => ({ 
        id: item.id, 
        name: item.name, 
        price: item.price, 
        purchasedAt: item.purchasedAt 
    }));

    const receiptItems = [...purchasedStaples, ...purchasedExtras].sort((a, b) => a.purchasedAt - b.purchasedAt);

    return (
        <div className="mt-6">
            <div style={{ backgroundColor: COLORS.chalk}} className="rounded-t-xl p-4">
               <h2 style={{ fontFamily: '"IBM Plex Mono", monospace', color: COLORS.ink }} className="text-xl font-bold mb-2">Receipt</h2>
            
                {
                    receiptItems.length === 0 ? (
                        <p className="text-gray-400 text-sm">Nothing bought yet</p>
                    ) : (
                        <ul className="mb-2">
                            {receiptItems.map((item) => (
                                <li key={item.id} className="flex justify-between text-sm">
                                    <span>{item.name}</span>
                                    <span style={{ fontFamily: '"IBM Plex Mono", monospace' }}><Money value={item.price} /></span>
                                </li>
                            ))}
                        </ul>
                    )
                }

                <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total:</span>
                    <span><Money value={spent} /></span>
                </div>

                <div
                    style={{
                    height: 12,
                    backgroundColor: COLORS.chalk,
                    backgroundImage: `linear-gradient(135deg, ${COLORS.paper} 50%, transparent 50%),
                                        linear-gradient(45deg, ${COLORS.paper} 50%, transparent 50%)`,
                    backgroundSize: '16px 16px',
                    backgroundPosition: 'left top',
                    backgroundRepeat: 'repeat-x',        
                    }}
                /> 
            </div>
            
        </div>
    )
}