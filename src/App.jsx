import useGroceryState from './hooks/useGroceryState.js';
import StaplesSection from './components/StaplesSection.jsx';
import ExtrasSection from './components/ExtrasSection.jsx';
import BudgetDisplay from './components/BudgetDisplay.jsx';
import Receipt from './components/Receipt.jsx';

export default function App() {

  const {
    budget,
    setBudget,
    staples,
    toggleStaple,
    confirmStaplePrice,
    extras,
    addExtra,
    remainingBudget,
    spent
  } = useGroceryState();

  return (
    <div>
      <h1 style={{fontFamily: '"Space Grotesk", sans-serif'}} className="text-3xl font-bold">Grocery Budget</h1>

      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="Enter your budget"
        className="border rounded px-3 py-2 mb-2"
      />

      <BudgetDisplay budget={budget} spent={spent} remaining={remainingBudget} />

      <p className="mb-4 font-semibold">
        Remaining: R {remainingBudget.toFixed(2)}
      </p>

      <StaplesSection staples={staples} onToggle={toggleStaple} onConfirmPrice={confirmStaplePrice} />

      <ExtrasSection extras={extras} onAdd={addExtra} />

      <Receipt staples={staples} extras={extras} spent={spent} />
    </div>
    
  )
}
