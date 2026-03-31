import styled, { createGlobalStyle } from 'styled-components'
import { reboot } from 'styled-reboot'

export const GlobalStyle = createGlobalStyle`
${reboot}
html, body, .viewport {
  width: 100%;
  height: 100%;
}
body{
  overflow: hidden;
  min-width:300px;
  overflow-x:auto;
  color: #f9f9fa;
  background: #33313f;
  font-weight: 100;
}
#root {
  height: 100%;
}
`

export const selectStyle = ({
  background = '#3a3747',
  menuBackground = '#3a3747',
  primaryColor = '#6e66a6',
  borderColor = '#6e66a6',
  controlHeight = '35px',
  placeHolderColor = '#b3b2be',
  singleStyles = {},
  optionStyles = {},
  containerStyles = {},
  menuStyles = {},
  valueContainerStyles = {}
} = {}) => ({
  container: (defaults) => ({
    ...defaults,
    ...containerStyles
  }),
  control: (defaults, { isFocused }) => ({
    ...defaults,
    boxShadow: isFocused ? `0 0 0 1px ${borderColor}` : 'none',
    borderColor: isFocused ? borderColor : 'transparent',
    background,
    height: controlHeight,
    minHeight: controlHeight,
    ':hover': {
      ...defaults[':hover'],
      boxShadow: isFocused ? `0 0 0 1px ${borderColor}` : 'none',
      borderColor: borderColor
    }
  }),
  placeholder: (defaults) => ({
    ...defaults,
    color: placeHolderColor
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  singleValue: (defaults) => ({
    ...defaults,
    color: '#f9f9fa',
    ...singleStyles
  }),
  dropdownIndicator: (defaults) => ({
    ...defaults,
    color: '#6e66a6 !important',
    padding: '5px'
  }),
  menu: (defaults) => ({
    ...defaults,
    background: menuBackground,
    ...menuStyles
  }),
  valueContainer: (defaults) => ({
    ...defaults,
    ...valueContainerStyles
  }),
  option: (defaults, { isSelected }) => ({
    ...defaults,
    color: '#f9f9fa',
    background: isSelected ? primaryColor : menuBackground,
    ':hover': {
      ...defaults[':hover'],
      background: primaryColor
    },
    ...optionStyles
  }),
  input: (defaults) => ({
    ...defaults,
    color: '#f9f9fa'
  }),
  indicatorsContainer: (defaults) => ({
    ...defaults,
    padding: 0,
    '> div:nth-of-type(1)': {
      padding: '0 !important'
    }
  })
})

export const Outer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #403d4f;
  background: #2d2b37;
`

export const Title = styled.div`
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #403d4f;
`

export const Rows = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 0.5rem 1rem;
  font-size: 0.9rem;
  color: #8a879a;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

export const Label = styled.span`
  align-self: center;
  width: 50%;
  min-width: 50%;
  margin: 0;
`

export const FormSelect = styled.div`
  width: 100%;
`

export const InputOuter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
`

export const Input = styled.input`
  border: 1px solid #3a3747;
  outline: none;
  width: 100%;
  background-color: #3a3747;
  color: #f9f9fa;
  height: 35px;
  border-radius: 0.2rem;
  padding-left: 0.6rem;
  font-weight: 300 !important;
  &:hover {
    border-color: #6e66a6;
  }
`

export const ButtonOuter = styled.div`
  border-top: 1px solid #403d4f;
  padding: 1rem;
`

export const Button = styled.div`
  display: flex;
  justify-content: center;
  height: 2rem;
  align-items: center;
  padding: 0.2rem 1rem;
  cursor: pointer;
  background: #6e66a6;
  color: #f9f9fa;
  border-radius: 0.3rem;
  font-size: 0.9rem;
  width: 100%;
  &:hover {
    background: #585285;
  }
`
