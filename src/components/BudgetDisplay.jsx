export default function BudgetDisplay({ budget }) {
    return <p>Your budget is: R {budget || 0}</p>
}