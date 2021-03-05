export const input = ({ hasError }: { hasError: boolean }) => ({
  borderRadius: 5,
  paddingTop: 2,
  paddingRight: 2,
  paddingBottom: 2,
  paddingLeft: 5,
  borderWidth: 1,
  borderColor: hasError ? 'red' : 'black',
  color: hasError ? 'red' : 'black',
})

export const spaceRight = { marginRight: 10 }

export const propertyWrapper = { margin: '10px 0' }

export const objectIndentation = { marginLeft: 20 }
