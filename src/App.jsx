import useGroceryState from './hooks/useGroceryState.js';
import StaplesSection from './components/StaplesSection.jsx';
import ExtrasSection from './components/ExtrasSection.jsx';
import BudgetDisplay from './components/BudgetDisplay.jsx';
import BudgetSection from './components/BudgetSection.jsx';
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
    spent,
    addStaple,
    removeStaple,
    newTrip,
    confirmReset,
    setConfirmReset,
    removeExtra
  } = useGroceryState();

  const overBudget = remainingBudget < 0;

  return (
    <div style={{ backgroundColor: COLORS.paper, minHeight: '100vh'}}>
      <div className="max-w-md mx-auto px-4 py-6">
        <div style={{ backgroundColor: COLORS.paper, minHeight: '100vh'}} className="p-6">
          <div style={{ color: COLORS.basil }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.basil} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 11-1 9"></path><path d="m19 11-4-7"></path><path d="M2 11h20"></path><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"></path><path d="M4.5 15.5h15"></path><path d="m5 11 4-7"></path><path d="m9 11 1 9"></path></svg>
          </div>
          <p
            style={{ fontFamily: '"Space Grotesk", sans-serif', color: COLORS.ink, opacity: 0.6 }}
            className="text-sm mb-1"
          >
            Tracking Every Trip, One Cart at a Time
          </p>
          <h1 style={{fontFamily: '"Space Grotesk", sans-serif', color: COLORS.ink}} className="text-3xl font-bold mb-3">Grocery Budget</h1>

          <BudgetSection 
            budget={budget}
            spent={spent}
            remaining={remainingBudget}
            onBudgetChange={setBudget}
          />
          

          <StaplesSection 
            staples={staples} 
            onToggle={toggleStaple} 
            onConfirmPrice={confirmStaplePrice} 
            onAdd={addStaple}
            onRemove={removeStaple}
            />

          <ExtrasSection 
            extras={extras} 
            onAdd={addExtra} 
            onRemove={removeExtra} 
          />

          <Receipt staples={staples} extras={extras} spent={spent} />

        </div>
      </div>
      
      <div className="flex justify-center mt-3 pb-6">
        {
          confirmReset ? (
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: COLORS.ink, opacity: 0.7}}>
                Start a fresh trip?
              </span>
              <button
                onClick={() => {
                  newTrip();
                  setConfirmReset(false);
                }}
                style={{ backgroundColor: COLORS.tomato, color: COLORS.chalk}}
                className="px-3 py-2 rounded-lg"
              >
                Yes, reset
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                style={{ backgroundColor: COLORS.grid, color: COLORS.ink}}
                className="px-3 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center text-sm">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.kraft} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 16h5v5"></path></svg>
              </span>

              <button
              onClick={() => setConfirmReset(true)}
              style={{ color: COLORS.ink, opacity: 0.6}}
              className="text-sm font-medium px-4 py-2"
              >
                New Trip
              </button>
            </div>
            
          )
        }
      </div>
    </div>
    
  )
}
