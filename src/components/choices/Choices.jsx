import React from 'react'
import PropTypes from 'prop-types'
import styles from './choices.module.scss'
import Choice from './Choice'

const Choices = ({ options, defaultValue, value: valueProp, onSelect }) => {
  const [value, setValue] = React.useState(valueProp ?? defaultValue)

  const onClick = React.useCallback(
    (val, label) => {
      if (valueProp === undefined) {
        setValue(val)
        onSelect && onSelect(val, label)
      }
    },
    [onSelect, valueProp],
  )

  return (
    <div className={styles.choices}>
      {options?.map(({ value: val, label }) => (
        <Choice
          key={val}
          value={val}
          text={label}
          active={val === value}
          onClick={onClick}
        />
      ))}
    </div>
  )
}

Choices.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    }),
  ),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func,
}

Choices.defaultProps = {
  options: [],
  onSelect: () => {},
}

export default Choices
