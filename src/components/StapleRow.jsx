export default function StapleRow({ item, onToggle }) {
  return (
    <li>
        <label>
            <input
                type="checkbox"
                checked={!!item.checked}
                onChange={() => onToggle(item.id)}
            />
            {item.name} - R {item.price}
        </label>
    </li>

    );
}