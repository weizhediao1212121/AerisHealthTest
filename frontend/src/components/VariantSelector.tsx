import type { Product, SelectedVariants, VariantName } from '../types'

type VariantSelectorProps = {
  product: Product
  selected: SelectedVariants
  onChange: (name: VariantName, value: string) => void
}

export function VariantSelector({
  product,
  selected,
  onChange,
}: VariantSelectorProps) {
  return (
    <div className="variant-groups">
      {product.variants.map((variant) => (
        <fieldset className="variant-group" key={variant.name}>
          <legend>{variant.label}</legend>
          <div className="variant-options">
            {variant.values.map((value) => {
              const isSelected = selected[variant.name] === value

              return (
                <button
                  className="variant-option"
                  aria-pressed={isSelected}
                  key={value}
                  onClick={() => onChange(variant.name, value)}
                  type="button"
                >
                  {value}
                </button>
              )
            })}
          </div>
        </fieldset>
      ))}
    </div>
  )
}
