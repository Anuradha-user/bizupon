import React from 'react'

const SelectedField = ({ masterLebel, value, label, list, onSelect }) => {
    return (
        <div className="form-group">
            <label className="form-label">{masterLebel}</label>
            <select
                className="form-select"
                value={value || ""}
                onChange={(e) => onSelect(e.target.value)}
            >
                <option value="">{label}</option>
                {list?.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default SelectedField;