import {useState, useEffect} from 'react';
import BudgetDisplay from './components/BudgetDisplay.jsx';
import {DEFAULT_STAPLES} from './data/defaultStaples.js';
import StapleRow from './components/StapleRow.jsx';
import StaplesSection from './components/StaplesSection.jsx';
import ExtrasSection from './components/ExtrasSection.jsx';

export default function App() {

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

      <StaplesSection staples={staples} onToggle={toggleStaple} onConfirmPrice={confirmStaplePrice} />

      <ExtrasSection extras={extras} onAdd={addExtra} />
    </div>
    
  )
}
