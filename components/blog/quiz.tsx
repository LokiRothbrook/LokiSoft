"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Context for tracking quiz group score
interface QuizContextType {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  registerQuestion: () => void;
  recordAnswer: (isCorrect: boolean) => void;
}

const QuizContext = createContext<QuizContextType | null>(null);

// Quiz Group - wraps multiple questions and tracks score
interface QuizGroupProps {
  children: ReactNode;
  title?: string;
}

export function QuizGroup({ children, title }: QuizGroupProps) {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const registerQuestion = () => {
    setTotalQuestions((prev) => prev + 1);
  };

  const recordAnswer = (isCorrect: boolean) => {
    setAnsweredQuestions((prev) => prev + 1);
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const allAnswered = answeredQuestions === totalQuestions && totalQuestions > 0;
  const scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  return (
    <QuizContext.Provider value={{ totalQuestions, answeredQuestions, correctAnswers, registerQuestion, recordAnswer }}>
      <div className="my-8 rounded-xl border-2 border-neon-cyan/40 bg-neon-cyan/5 p-6 max-w-[80%]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neon-cyan/20">
              <HelpCircle className="w-5 h-5 text-neon-cyan" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {title || "Knowledge Check"}
            </h3>
          </div>

          {/* Score display */}
          <div className="text-sm">
            <span className="text-muted-foreground">Score: </span>
            <span className={`font-semibold ${allAnswered ? (scorePercentage >= 70 ? "text-green-400" : "text-red-400") : "text-neon-cyan"}`}>
              {correctAnswers}/{totalQuestions}
            </span>
            {allAnswered && (
              <span className={`ml-2 ${scorePercentage >= 70 ? "text-green-400" : "text-red-400"}`}>
                ({scorePercentage}%)
              </span>
            )}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {children}
        </div>

        {/* Final result message */}
        <AnimatePresence>
          {allAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-6 p-4 rounded-lg border ${
                scorePercentage >= 70
                  ? "bg-green-500/10 border-green-500/30 text-green-400"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}
            >
              {scorePercentage === 100 ? (
                <span>Perfect score! You got all questions correct!</span>
              ) : scorePercentage >= 70 ? (
                <span>Great job! You passed with {scorePercentage}%!</span>
              ) : (
                <span>Keep studying! You scored {scorePercentage}%. Review the explanations above.</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </QuizContext.Provider>
  );
}

// Individual Quiz Question
interface QuizQuestionProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export function QuizQuestion({ question, options, correctIndex, explanation }: QuizQuestionProps) {
  const context = useContext(QuizContext);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Register this question with the group on mount
  useEffect(() => {
    if (context) {
      context.registerQuestion();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOptionClick = (index: number) => {
    if (revealed) return;
    setSelectedIndex(index);
  };

  const handleReveal = () => {
    if (selectedIndex === null) return;
    setRevealed(true);
    if (context) {
      context.recordAnswer(selectedIndex === correctIndex);
    }
  };

  const isCorrect = selectedIndex === correctIndex;

  return (
    <div className="rounded-lg border border-border/30 bg-background/50 p-4">
      {/* Question */}
      <p className="font-medium text-foreground mb-4">{question}</p>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrectOption = index === correctIndex;

          let optionStyles = "border-border/30 hover:border-neon-cyan/50 hover:bg-neon-cyan/5";

          if (revealed) {
            if (isCorrectOption) {
              optionStyles = "border-green-500/50 bg-green-500/10";
            } else if (isSelected && !isCorrectOption) {
              optionStyles = "border-red-500/50 bg-red-500/10";
            } else {
              optionStyles = "border-border/20 opacity-50";
            }
          } else if (isSelected) {
            optionStyles = "border-neon-cyan/60 bg-neon-cyan/10";
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={revealed}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${optionStyles} ${revealed ? "cursor-default" : "cursor-pointer"}`}
            >
              {/* Option letter */}
              <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${
                revealed && isCorrectOption
                  ? "bg-green-500/20 text-green-400"
                  : revealed && isSelected && !isCorrectOption
                  ? "bg-red-500/20 text-red-400"
                  : isSelected
                  ? "bg-neon-cyan/20 text-neon-cyan"
                  : "bg-muted/50 text-muted-foreground"
              }`}>
                {String.fromCharCode(65 + index)}
              </span>

              {/* Option text */}
              <span className={`flex-1 ${
                revealed && isCorrectOption
                  ? "text-green-400"
                  : revealed && isSelected && !isCorrectOption
                  ? "text-red-400"
                  : "text-foreground"
              }`}>
                {option}
              </span>

              {/* Result icon */}
              {revealed && isCorrectOption && (
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              )}
              {revealed && isSelected && !isCorrectOption && (
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Check Answer button */}
      {!revealed && (
        <Button
          onClick={handleReveal}
          disabled={selectedIndex === null}
          className="bg-neon-cyan hover:bg-neon-cyan/80 disabled:opacity-50"
        >
          Check Answer
        </Button>
      )}

      {/* Explanation */}
      <AnimatePresence>
        {revealed && explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-3 rounded-lg bg-muted/30 border border-border/30"
          >
            <div className="flex items-start gap-2">
              <span className={`font-medium ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                {isCorrect ? "Correct!" : "Incorrect."}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show result without explanation */}
      {revealed && !explanation && (
        <div className={`mt-4 text-sm font-medium ${isCorrect ? "text-green-400" : "text-red-400"}`}>
          {isCorrect ? "Correct!" : `Incorrect. The correct answer was ${String.fromCharCode(65 + correctIndex)}.`}
        </div>
      )}
    </div>
  );
}
