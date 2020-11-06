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

export const color = (background: string) => ({
  display: 'inline-flex',
  position: 'relative' as 'relative', // Workaround for weird TS issue.
  cursor: 'pointer',
  backgroundColor: background,
  width: 25,
  height: 25,
  marginBottom: -8,
  marginRight: 5,
  borderRadius: 5,
})

export const picker = {
  wrapper: (hovering: boolean) => ({
    display: hovering ? 'flex' : 'none',
    flexDirection: 'column' as 'column',
    position: 'absolute' as 'absolute',
    top: '-100%',
    cursor: 'default',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  }),
  board: (selectedColor: string) => ({
    display: 'flex',
    position: 'relative' as 'relative',
    height: 100,
    backgroundColor: selectedColor,
    backgroundImage: `linear-gradient(to right, #FFFFFF 0%, transparent 100%)`,
  }),
  boardOverlay: {
    position: 'absolute' as 'absolute',
    backgroundImage: `linear-gradient(to top, #000000 0%, transparent 100%)`,
    width: '100%',
    height: '100%',
  },
  popularWrapper: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap' as 'wrap',
    marginTop: 10,
  },
  popular: (background: string) => ({
    position: 'relative' as 'relative',
    width: '10%',
    height: 0,
    paddingBottom: '10%',
    backgroundColor: background,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  }),
}
