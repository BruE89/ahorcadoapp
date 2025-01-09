import { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import words from "./wordList.json";

// Función para eliminar tildes
const removeAccents = (str: string) => {
  let normalizedStr = str.normalize('NFD');
  normalizedStr = normalizedStr.replace(/[\u0300-\u036f]/g, '');
  return normalizedStr;
};

function getWord() {
  const word = words[Math.floor(Math.random() * words.length)];
  return removeAccents(word);
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter));

  const playSound = (type: "correct" | "wrong" | "win" | "lose") => {
    const sounds: Record<string, string> = {
      correct: "src/sounds/correct.mp3",
      wrong: "src/sounds/wrong.mp3",
      win: "src/sounds/win.mp3",
      lose: "src/sounds/lose.mp3",
    };
    const audio = new Audio(sounds[type]);
    audio.volume = 0.25;
    audio.play();
  };

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters(currentLetters => [...currentLetters, letter]);

      if (wordToGuess.includes(letter)) {
        playSound("correct"); // Sonido cuando la letra es correcta
      } else {
        playSound("wrong"); // Sonido cuando la letra es incorrecta
      }
    },
    [guessedLetters, isWinner, isLoser, wordToGuess]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [addGuessedLetter]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  useEffect(() => {
    if (isWinner) playSound("win");
    if (isLoser) playSound("lose");
  }, [isWinner, isLoser]);

  return (
    <div
      style={{
        position: "relative", // Necesario para el contenedor padre
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%", // Ajusta esto según tus necesidades
          right: "-200px", // Cambia esto para ajustar la posición horizontal
          transform: "translateY(-50%)", // Centra verticalmente
          fontSize: "2rem",
          textAlign: "center",
          width: "200px", // Ajusta el ancho si es necesario
          backgroundColor: "white", // Opcional, para un fondo visible
          padding: "1rem",
          zIndex: 10, // Asegúrate de que esté sobre otros elementos
        }}
      >
        {isWinner && "Ganaste! - Refresca la página para jugar de nuevo"}
        {isLoser && "Perdiste! - Refresca la página para jugar de nuevo"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
          isWin={isWinner} // O la lógica para determinar si ganó
          isLose={isLoser} // O la lógica para determinar si perdió
        />
      </div>
    </div>
  );
}

export default App;
