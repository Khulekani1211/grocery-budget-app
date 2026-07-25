import {useState} from 'react';
import BudgetDisplay from './components/BudgetDisplay.jsx';
import {DEFAULT_STAPLES} from './data/defaultStaples.js';

export default function App() {
  const [budget, setBudget] = useState('');
  const [staples, setStaples] = useState(DEFAULT_STAPLES);

  function toggleStaple(id) {
    setStaples(
      staples.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  const spent = staples
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price, 0);

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
      <ul>
        {staples.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleStaple(item.id)}
              />
              {item.name} - R {item.price}
            </label>
          </li>
        ))}
      </ul>
    </div>
    
  )
}
