import React from 'react'
import { Button, Text, View } from 'native-base'
import { stylesBody } from '../../../styles'

const SPButton = ({
  style,
  children,
  transparent = false,
  focus = false,
  onPress = undefined,
  bordered = false,
  onPressIn = undefined,
  disabled = false
}) => {
  let styleButton = style
  if (!transparent && focus) {
    styleButton = { ...styleButton, ...stylesBody.buttonFocus }
  } else if (!transparent) {
    styleButton = { ...styleButton, ...stylesBody.button }
  }

  if (bordered) {
    styleButton = { ...styleButton, ...stylesBody.border }
  }

  if (disabled) {
    styleButton = { ...styleButton, ...stylesBody.disabled }
  }

  if (style.backgroundColor) {
    styleButton.backgroundColor = style.backgroundColor
  }
  return (
    <Button
      disabled={disabled}
      onPressIn={onPressIn}
      style={styleButton}
      onPress={onPress}
      bordered={bordered}
      transparent={transparent}
    >
      {children}
    </Button>
  )
}

export { SPButton };
