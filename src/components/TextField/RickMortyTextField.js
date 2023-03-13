const { InputBase, useTheme } = require("@mui/material")

const RickMortyTextField = ({
  inputProps,
  sx,
  ...rest
}) => {
  const { typography, palette } = useTheme()
  return (
    <InputBase
      inputProps={{ ...inputProps }}
      sx={{
        fontSize: typography.body1,
        backgroundColor: 'white.main',
        minWidth: '30%',
        marginTop: "6px",
        marginBottom: "6px",
        minHeight: 45,
        paddingTop: 0.5,
        paddingBottom: 0.5,
        paddingX: 1.75,
        outline: 1,
        outlineStyle: 'solid',
        borderRadius: 1,
        outlineColor: palette["gray-outline"].main,
        "&.Mui-focused": {
          outline: 1,
          outlineStyle: 'solid',
          outlineColor: palette.secondary.main
        },
        ...sx
      }}
      {...rest}
    />
  )
}

export default RickMortyTextField