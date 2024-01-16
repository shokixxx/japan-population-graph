import utilStyles from '../styles/utils.module.css'

type CheckBoxProps = {
  label: string
}

const CheckBox = (checkBoxProps: CheckBoxProps) => {
  const { label } = checkBoxProps
  return (
    <label className={utilStyles.textL}>
      <input type="checkbox" value={label} className={utilStyles.checkBox} />
      {label}
    </label>
  )
}

export default CheckBox
