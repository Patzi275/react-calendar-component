function Selector({ elements, selected, onChange }) {
    
    const handleChange = function (e) {
        onChange(e.target.value);
    };

    return (
        <select value={selected} onChange={handleChange}>
            {
                Array.from({ length: elements.length }, (_, index) =>
                    <option key={index} value={elements[index].value}>{elements[index].label}</option>
                )
            }
        </select>
    );
}

export default Selector;
