import useGroceryState from './hooks/useGroceryState.js';
import StaplesSection from './components/StaplesSection.jsx';
import ExtrasSection from './components/ExtrasSection.jsx';
import BudgetDisplay from './components/BudgetDisplay.jsx';

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
      <h1 className="text-3xl font-bold text-green-700">Grocery Budget</h1>

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
    </div>
    
  )
}
