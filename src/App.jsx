import useGroceryState from './hooks/useGroceryState.js';
import StaplesSection from './components/StaplesSection.jsx';
import ExtrasSection from './components/ExtrasSection.jsx';
import BudgetDisplay from './components/BudgetDisplay.jsx';
import Receipt from './components/Receipt.jsx';
import Money from './components/Money.jsx';
import { COLORS } from './constants/colors.js';

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

  const overBudget = remainingBudget < 0;

  return (
    <div style={{ backgroundColor: COLORS.paper, minHeight: '100vh'}}>
      <div className="max-w-md mx-auto px-4 py-6">
        <div style={{ backgroundColor: COLORS.paper, minHeight: '100vh'}} className="p-6">
          <h1 style={{fontFamily: '"Space Grotesk", sans-serif', color: COLORS.ink}} className="text-3xl font-bold">Grocery Budget</h1>

          <div style={{ backgroundColor: COLORS.chalk }} className="rounded-2xl p-5 mb-5 shadow-sm">
            <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter your budget"
            className="border rounded px-3 py-2 mb-2"
            />

            <BudgetDisplay budget={budget} spent={spent} remaining={remainingBudget} />

            <p style={{ color: overBudget ? COLORS.tomato : COLORS.ink }} className="mb-4 font-semibold">
              {overBudget ? 'Over Budget: ' : 'Remaining: '}
              <Money value={Math.abs(remainingBudget)} />
            </p>
          </div>
          

          <StaplesSection staples={staples} onToggle={toggleStaple} onConfirmPrice={confirmStaplePrice} />

          <ExtrasSection extras={extras} onAdd={addExtra} />

          <Receipt staples={staples} extras={extras} spent={spent} />

        </div>
      </div>
      
    </div>
    
    
  )
}
