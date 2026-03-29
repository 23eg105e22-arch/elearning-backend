export default function FormInput({ label, type = 'text', placeholder, value, onChange, error, required = false }) {
  return (
    <div className="form-group">
      {label && (
        <label>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}
