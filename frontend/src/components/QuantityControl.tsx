type QuantityControlProps = {
  quantity: number
  max: number
  disabled: boolean
  onChange: (quantity: number) => void
}

export function QuantityControl({
  quantity,
  max,
  disabled,
  onChange,
}: QuantityControlProps) {
  return (
    <div className="quantity-row">
      <span className="control-label">Quantity</span>
      <div className="quantity-control">
        <button
          aria-label="Decrease quantity"
          disabled={disabled || quantity <= 1}
          onClick={() => onChange(quantity - 1)}
          type="button"
        >
          -
        </button>
        <input
          aria-label="Quantity"
          disabled={disabled}
          inputMode="numeric"
          max={max}
          min="1"
          onChange={(event) => onChange(Number(event.target.value))}
          type="number"
          value={quantity}
        />
        <button
          aria-label="Increase quantity"
          disabled={disabled || quantity >= max}
          onClick={() => onChange(quantity + 1)}
          type="button"
        >
          +
        </button>
      </div>
    </div>
  )
}
