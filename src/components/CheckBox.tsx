type CheckBoxProps = {
  label: string
}

const CheckBox = (checkBoxProps: CheckBoxProps) => {
  const { label } = checkBoxProps
  return (
    <label>
      <input type="checkbox" value={label} />
      {label}
    </label>
  )
}

export default CheckBox
