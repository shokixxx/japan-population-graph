import layout from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'

type CheckBoxProps = {
  label: string
  isChecked: boolean
  onChange: (isChecked: boolean) => void
}

const CheckBox = (checkBoxProps: CheckBoxProps) => {
  const { label, isChecked, onChange } = checkBoxProps
  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  return (
    <label className={`${layout.checkBoxMenu} ${utilStyles.textL}`}>
      <input
        type="checkbox"
        className={utilStyles.checkBox}
        checked={isChecked}
        onChange={handleCheckBoxChange}
      />
      {label}
    </label>
  )
}

export default CheckBox
