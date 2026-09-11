import React, { useState } from 'react';
import { COLORS } from '../constants/colors.js';
import Money from './Money.jsx';

export default function BudgetSection({ budget, spent, remaining, onBudgetChange }) {
    const [showBudgetForm, setShowBudgetForm] = useState(false);

    const [budgetDraft, setBudgetDraft] = useState(budget !== null ? String(budget) : '');

    function handleConfirm() {
        const val = parseFloat(budgetDraft);
        if (!isNaN(val) && val > 0) {
            onBudgetChange(val);
            setShowBudgetForm(false);
        }
    }

    function toggleBudgetForm() {
        setBudgetDraft(budget !== null ? String(budget) : '');
        setShowBudgetForm((prev) => !prev);
    }

    const overBudget = remaining < 0;

    return (
       <div style={{ backgroundColor: COLORS.chalk }} className="rounded-2xl p-5 mb-5 shadow-sm">

            {
                showBudgetForm ? (
                    <div>
                        <p 
                            className="text-sm" style={{ color: COLORS.ink, opacity: 0.8 }}
                            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                        >
                            Update your budget
                        </p>
                        <div className="mt-3 flex gap-2">
                            <input
                                type="number"
                                value={budgetDraft}
                                onChange={(e) => setBudgetDraft(e.target.value)}
                                placeholder="Enter your budget"
                                className="border rounded px-3 py-2 flex-1"
                            />
                            <button 
                                onClick={handleConfirm} 
                                style={{ backgroundColor: COLORS.basil}}
                                className="px-4 rounded-lg text-white font-semibold shrink-0"
                            >
                                Set
                            </button>
                        </div>
                        <button 
                            onClick={() => setShowBudgetForm(false)}
                            className="text-sm mt-3"
                            style={{ color: COLORS.ink, opacity: 0.6}}
                        >
                            Cancel
                        </button>
                    </div>
                    
                ) : (
                    <div>
                        <div  className="flex items-start justify-between">
                            <p style={{ color: overBudget ? COLORS.tomato : COLORS.ink }} className="flex flex-col gap-1 font-semibold">
                                <span style={{ fontSize: '1.8rem' }}>
                                    <Money value={Math.abs(remaining)} color={overBudget ? COLORS.tomato : COLORS.ink} />
                                </span>

                    
                                <span>
                                    {overBudget ? 'Over budget' : 'left to spend'}
                                </span>
                            </p>

                            <button onClick={toggleBudgetForm} aria-label="Edit budget" className="p-2 rounded-full" style={{ backgroundColor: COLORS.paper }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                                    <path d="m15 5 4 4"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="flex justify-between mt-1">
                            <p className="text-sm mt-1" style={{ color: COLORS.ink, opacity: 0.6 }}>
                                Spent R {spent.toFixed(2)}
                            </p>

                            <p className="text-sm mt-1" style={{ color: COLORS.ink, opacity: 0.6 }}>
                                Budget R {budget?.toFixed(2)}
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    );
}