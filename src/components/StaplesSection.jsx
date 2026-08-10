import StapleRow from "./StapleRow";

export default function StaplesSection({ staples, onToggle }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Staples</h2>
      <ul>
        {staples.map((item) => (
          <StapleRow key={item.id} item={item} onToggle={onToggle} />
        ))}
      </ul>
    </div>
  );
}
    