const HEAD = (
  <div
    className="w-[70px] h-[70px] rounded-full border-[10px] border-black dark:border-white absolute top-[50px] right-[-30px]"
  />
)

const BODY = (
  <div
    className="w-[10px] h-[100px] bg-black dark:bg-white absolute top-[120px] right-0"
  />
)

const RIGHT_ARM = (
  <div
    className="w-[100px] h-[10px] bg-black dark:bg-white absolute top-[130px] right-[-90px] -rotate-[30deg] origin-left-bottom"
  />
)

const LEFT_ARM = (
  <div
    className="w-[100px] h-[10px] bg-black dark:bg-white absolute top-[130px] right-[0px] rotate-[30deg] origin-right-bottom"
  />
)

const RIGHT_LEG = (
  <div
    className="w-[100px] h-[10px] bg-black dark:bg-white absolute top-[250px] right-[-70px] rotate-[60deg] origin-left-bottom"
  />
)

const LEFT_LEG = (
  <div
    className="w-[100px] h-[10px] bg-black dark:bg-white absolute top-[250px] right-[-20px] -rotate-[60deg] origin-right-bottom"
  />
)

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

// En este archivo se define el tamaño, color y posicion de las partes del cuerpo
// del hombre ahorcado

type HangmanDrawingProps = {
  numberOfGuesses: number
}

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div className="relative top-[10px]">
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div
        className="h-[50px] w-[10px] bg-black dark:bg-white absolute top-0 right-0"
      />
      <div
        className="h-[10px] w-[200px] bg-black dark:bg-white ml-[120px]"
      />
      <div
        className="h-[400px] w-[10px] bg-black dark:bg-white ml-[120px]"
      />
      <div className="h-[10px] w-[250px] bg-black dark:bg-white" />
    </div>
  )
}
