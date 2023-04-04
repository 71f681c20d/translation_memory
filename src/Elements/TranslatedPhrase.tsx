import { Button } from "@mui/material"


const TranslatedPhrase = () => {


  return(
    <>

    <Button
     variant="contained"
     color="success"
    >
      Correct
    </Button>
    <Button
     variant="contained"
     color="error"
    >
      Incorrect
    </Button>
    </>
  )
}

export default TranslatedPhrase;