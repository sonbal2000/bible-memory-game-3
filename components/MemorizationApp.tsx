import React, { useState, useEffect, useCallback } from 'react';
import { BibleVerse, WordStatus } from '../types';
import Button from './Button';
import ProgressBar from './ProgressBar';
import { BookOpen, RefreshCw, Trophy, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MemorizationAppProps {
  verse: BibleVerse;
}

const MemorizationApp: React.FC<MemorizationAppProps> = ({ verse }) => {
  const [words, setWords] = useState<WordStatus[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Initialize words
  useEffect(() => {
    resetVerse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verse]);

  const resetVerse = useCallback(() => {
    const splitWords = verse.text.split(' ');
    const initialWords = splitWords.map((word, index) => ({
      word,
      isHidden: false,
      originalIndex: index
    }));
    setWords(initialWords);
    setIsComplete(false);
  }, [verse]);

  const handleHideRandomWord = useCallback(() => {
    // Find indices of words that are NOT yet hidden
    const availableIndices = words
      .map((w, i) => w.isHidden ? -1 : i)
      .filter(i => i !== -1);

    if (availableIndices.length === 0) return;

    // Pick a random index from the available ones
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

    setWords(prevWords => {
      const newWords = [...prevWords];
      newWords[randomIndex] = { ...newWords[randomIndex], isHidden: true };
      
      // Check if this was the last word
      const allHidden = newWords.every(w => w.isHidden);
      if (allHidden) {
        setIsComplete(true);
        triggerConfetti();
      }
      return newWords;
    });
  }, [words]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#d8b4fe', '#f3e8ff', '#fbbf24'] // Purple & Gold theme
    });
  };

  const hiddenCount = words.filter(w => w.isHidden).length;
  const totalCount = words.length;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center justify-center min-h-[80vh]">
      
      {/* Header / Title Card */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-md mb-4 text-purple-500">
          <BookOpen size={32} />
        </div>
        <h1 className="text-2xl md:text-3xl text-purple-800 mb-1">
          세인기독학교 성경 암송
        </h1>
        <p className="text-purple-600 opacity-80">이번 주 암송 구절에 도전해보세요!</p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 w-full relative overflow-hidden">
        
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-purple-50 rounded-full z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-purple-50 rounded-full z-0"></div>

        <div className="relative z-10">
          <ProgressBar current={hiddenCount} total={totalCount} />

          {/* Reference Badge */}
          <div className="flex justify-center mb-6">
            <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-lg border border-purple-200">
              {verse.reference}
            </span>
          </div>

          {/* Verse Text Area */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 leading-loose min-h-[160px] content-center">
            {words.map((item, index) => (
              <span
                key={`${item.word}-${index}`}
                className={`
                  text-2xl md:text-4xl px-2 py-1 rounded-lg transition-all duration-300
                  ${item.isHidden 
                    ? 'text-purple-300 bg-purple-50 scale-95' 
                    : 'text-gray-800 scale-100 hover:text-purple-700'}
                `}
              >
                {item.isHidden ? 'ㅇ'.repeat(item.word.length) : item.word}
              </span>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-4">
            {!isComplete ? (
              <Button 
                onClick={handleHideRandomWord} 
                variant="primary" 
                fullWidth
                disabled={isComplete}
              >
                <ChevronUp className="w-6 h-6" />
                암송 단계 올리기
              </Button>
            ) : (
              <div className="animate-bounce text-center mb-2">
                <span className="text-xl text-purple-600">🎉 참 잘했어요! 🎉</span>
              </div>
            )}

            <Button 
              onClick={resetVerse} 
              variant="secondary" 
              fullWidth
            >
              <RefreshCw className={`w-5 h-5 ${isComplete ? 'text-purple-500' : 'text-gray-400'}`} />
              {isComplete ? '다시 도전하기' : '처음부터 다시'}
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="mt-8 text-center text-purple-400 text-sm">
        <p>하나님의 말씀을 마음에 새겨요 ❤️</p>
      </div>

    </div>
  );
};

export default MemorizationApp;