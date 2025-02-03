import "./HangmanWord.css";

type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

export function HangmanWord({
  guessedLetters,
  wordToGuess,
  reveal = false,
}: HangmanWordProps) {
  return (
    <div className="hangman-word">
      {wordToGuess.split("").map((letter, index) => (
        <span key={index}>
          <span
            className={`${guessedLetters.includes(letter) || reveal ? "visible" : ""} 
                        ${!guessedLetters.includes(letter) && reveal ? "incorrect" : ""}`}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
