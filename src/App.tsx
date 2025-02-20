import { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "./components/HangmanDrawing";
import { HangmanWord } from "./components/HangmanWord";
import { Keyboard } from "./components/Keyboard";
import wordsEs from "./data/wordList.json";
import wordsEn from "./data/wordListENG.json";
import { ConfettiSideCannons } from "./components/Confetti";
import { ButtonHover } from "./components/ui/ButtonHover";
import ThemeButton from "./components/ui/ThemeButton";

import correctSound from "./assets/sounds/correct.mp3";
import wrongSound from "./assets/sounds/wrong.mp3";
import winSound from "./assets/sounds/win.mp3";
import loseSound from "./assets/sounds/lose.mp3";
import { AnimatedSubscribeButtonDemo } from "./components/ui/suscribeButton";

function App() {
  // Setear por defecto el idioma español
  const [language, setLanguage] = useState<"en" | "es">("es");

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  function getWord(lang: "en" | "es") {
    const wordList = lang === "es" ? wordsEs : wordsEn;
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    return removeAccents(word);
  }

  const [wordToGuess, setWordToGuess] = useState(() => getWord(language));
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const playSound = (type: "correct" | "wrong" | "win" | "lose") => {
    const sounds: Record<string, string> = {
      correct: correctSound,
      wrong: wrongSound,
      win: winSound,
      lose: loseSound,
    };
    const audio = new Audio(sounds[type]);
    audio.volume = 0.25;
    audio.play();
  };

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);

      if (wordToGuess.includes(letter)) {
        playSound("correct");
      } else {
        playSound("wrong");
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
      if (e.key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord(language));
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [language]);

  useEffect(() => {
    if (isWinner) playSound("win");
    if (isLoser) playSound("lose");
  }, [isWinner, isLoser]);

  const handleLanguageToggle = () => {
    const newLanguage = language === "en" ? "es" : "en";
    setLanguage(newLanguage);
    setGuessedLetters([]);
    setWordToGuess(getWord(newLanguage));
  };

  const handleGameReset = () => {
    setGuessedLetters([]);
    setWordToGuess(getWord(language));
  };

  return (
    <div
      style={{
        position: "relative",
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
          top: "50%",
          right: "900px",
          transform: "translateY(-50%)",
          fontSize: "2rem",
          textAlign: "center",
          width: "100px",
          padding: "1rem",
          zIndex: 10,
        }}
      >
        <AnimatedSubscribeButtonDemo
          currentLanguage={language}
          onLanguageToggle={handleLanguageToggle}
          className="w-36"
        />
        <ThemeButton />
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "-200px",
          transform: "translateY(-50%)",
          fontSize: "2rem",
          textAlign: "center",
          width: "300px",
          padding: "1rem",
          zIndex: 10,
        }}
        className="bg-white dark:bg-black"
      >
        {isWinner && (language === "es" ? "Ganaste!" : "You won!")}
        {isLoser && (language === "es" ? "Perdiste!" : "You lost!")}
        <br />
        {(isWinner || isLoser) &&
          (language === "es"
            ? "Haz click aquí para jugar de nuevo"
            : "Click here to restart the game")}
        <ButtonHover onClick={handleGameReset} language={language} />
        <ConfettiSideCannons isWinner={isWinner} />
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
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
          isWin={isWinner}
          isLose={isLoser}
        />
      </div>
    </div>
  );
}

export default App;