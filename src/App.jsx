import {useState} from 'react';
import BudgetDisplay from './components/BudgetDisplay.jsx';

export default function App() {
  const [budget, setBudget] = useState('');

  return (
    <div>
      <h1>Grocery Budget</h1>
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="Enter your budget"
      />
      <BudgetDisplay budget={budget} />
    </div>
    
  )
}
