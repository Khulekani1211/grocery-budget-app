export default function Money({ value, color }) {
    
    return (
        <span style={{ fontFamily: '"IBM Plex Mono", monospace', color }}>
            R {value.toFixed(2)}
        </span>
    );
}