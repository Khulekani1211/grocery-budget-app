import {useState, useEffect} from 'react';
import BudgetDisplay from './components/BudgetDisplay.jsx';
import {DEFAULT_STAPLES} from './data/defaultStaples.js';
import StapleRow from './components/StapleRow.jsx';
import StaplesSection from './components/StaplesSection.jsx';

export default function App() {
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem('grocery-budget');
    return savedBudget ? parseFloat(savedBudget) : '';
  });

  const [staples, setStaples] = useState(() => {
    const savedStaples = localStorage.getItem('grocery-staples');
    return savedStaples ? JSON.parse(savedStaples) : DEFAULT_STAPLES;
  });
  const [extras, setExtras] = useState(() => {
    const savedExtras = localStorage.getItem('grocery-extras');
    return savedExtras ? JSON.parse(savedExtras) : [];
  });

  const [extraName, setExtraName] = useState('');
  const [extraPrice, setExtraPrice] = useState('');


  useEffect(() => {
    localStorage.setItem('grocery-budget', budget);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('grocery-staples', JSON.stringify(staples));
  }, [staples]);

  useEffect(() => {
    localStorage.setItem('grocery-extras', JSON.stringify(extras));
  }, [extras]);

  function toggleStaple(id) {
    setStaples(
      staples.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function addExtra() {
    const price = parseFloat(extraPrice);

    if(!extraName.trim() || isNaN(price))  return;

  const newItem = {
    id: Date.now(),
    name: extraName.trim(),
    price,
  }

    setExtras([...extras, newItem]);
    setExtraName('');
    setExtraPrice('');
  }

  const spentOnStaples = staples
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price, 0);

  const spentOnExtras = extras.reduce((sum, item) => sum + item.price, 0);
  const spent = spentOnStaples + spentOnExtras;
  const remainingBudget = (parseFloat(budget) || 0) - spent;

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-700">Grocery Budget</h1>

      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="Enter your budget"
        className="border rounded px-3 py-2 mb-2"
      />

      <p className="mb-4 font-semibold">
        Remaining: R {remainingBudget.toFixed(2)}
      </p>

      <BudgetDisplay budget={budget} />

      <StaplesSection staples={staples} onToggle={toggleStaple} />

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Extras</h2>
        <div className="flex gap-2 mb-3">
          <input
            value={extraName}
            onChange={(e) => setExtraName(e.target.value)}
            placeholder="Item name"
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            value={extraPrice}
            onChange={(e) => setExtraPrice(e.target.value)}
            placeholder="Price"
            className="border rounded px-3 py-2"
          />
          <button
            onClick={addExtra}
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
    </div>
    
  )
}
