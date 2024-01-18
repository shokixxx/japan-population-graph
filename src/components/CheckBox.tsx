import utilStyles from '../styles/utils.module.css'

type CheckBoxProps = {
  prefCode: number
  prefName: string
  isChecked: boolean
  onChange: (prefCode: number, checked: boolean) => void
}

const CheckBox = (checkBoxProps: CheckBoxProps) => {
  const { prefCode, prefName, isChecked, onChange } = checkBoxProps
  const handleCheckBoxChange = () => {
    onChange(prefCode, !isChecked)
  }

  return (
    <label className={utilStyles.textL}>
      <input
        type="checkbox"
        className={utilStyles.checkBox}
        value={prefName}
        onChange={handleCheckBoxChange}
      />
      {prefName}
    </label>
  )
}

export default CheckBox
