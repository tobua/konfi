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
