import {useState, useEffect} from 'react';
import {DEFAULT_STAPLES} from '../data/defaultStaples.js';

export default function useGroceryState() {
  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem('grocery-budget');
    return savedBudget ? parseFloat(savedBudget) : null;
  });

  const [staples, setStaples] = useState(() => {
    const savedStaples = localStorage.getItem('grocery-staples');
    return savedStaples ? JSON.parse(savedStaples) : DEFAULT_STAPLES;
  });

  const [extras, setExtras] = useState(() => {
    const savedExtras = localStorage.getItem('grocery-extras');
    return savedExtras ? JSON.parse(savedExtras) : [];
  });

    const [confirmReset, setConfirmReset] = useState(false);

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
        item.id === id ? { ...item, price: null, checked: false, purchasedAt: null } : item
      )
    );
  }

  function confirmStaplePrice(id, price) {
    setStaples(
      staples.map((item) =>
        item.id === id ? { ...item, price, checked: true, purchasedAt: Date.now() } : item
      )
    );
  }

  function addExtra(item) {

    setExtras([...extras, {...item, purchasedAt: Date.now()}]);
    
  }

  function addStaple(name, defaultPrice) {
    const newStaple = {
      id: Date.now(),
      name,
      defaultPrice,
      price: null,
      checked: false,
      purchasedAt: null
    };
    setStaples([...staples, newStaple]);
  }

  function removeStaple(id) {
    setStaples(staples.filter((item) => item.id !== id));
  }

  function newTrip(){
    setStaples(staples.map((item) => ({ ...item, price: null, checked: false, purchasedAt: null })));
    setExtras([]);
  }

  function removeExtra(id) {
    setExtras(extras.filter((item) => item.id !== id));
  }

  const spentOnStaples = staples
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price, 0);

  const spentOnExtras = extras.reduce((sum, item) => sum + item.price, 0);
  const spent = spentOnStaples + spentOnExtras;
  const remainingBudget = (parseFloat(budget) || 0) - spent;

  return {
    budget,
    staples,
    extras,
    spentOnStaples,
    spentOnExtras,
    spent,
    remainingBudget,
    toggleStaple,
    confirmStaplePrice,
    addExtra,
    addStaple,
    removeStaple,
    setBudget,
    newTrip,
    confirmReset,
    setConfirmReset,
    removeExtra
  };

}