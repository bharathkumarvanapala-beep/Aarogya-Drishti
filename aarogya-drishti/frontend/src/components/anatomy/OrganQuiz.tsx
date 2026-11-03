import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { OrganData, QuizQuestion } from '../../data/anatomyData';
import { 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  BookOpen, 
  Sparkles, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface OrganQuizProps {
  organ: OrganData;
}

export const OrganQuiz: React.FC<OrganQuizProps> = ({ organ }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIndex: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const questions = organ.quiz;
  const currentQ: QuizQuestion | undefined = questions[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
    setShowExplanation(true);

    // If answer is correct on last question or any question, add small celebratory feel
    if (optionIndex === currentQ?.correctAnswerIndex && currentQuestionIndex === questions.length - 1) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      setIsQuizCompleted(true);
      // Check score for mastery
      const score = calculateScore();
      if (score.percentage >= 75) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsQuizCompleted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    };
  };

  if (!currentQ) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-[#dce8e9]">
        <p className="text-gray-500">Quiz questions loading for {organ.name}...</p>
      </div>
    );
  }

  const scoreResult = calculateScore();

  return (
    <div className="bg-[#faf6ed] text-[#2c221a] rounded-2xl border border-[#d6c7b2] p-6 sm:p-8 shadow-xl font-serif">
      
      {/* Header */}
      <div className="border-b-2 border-[#8c7853]/40 pb-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8c7853] font-bold block mb-1">
            Examen Anatomicum • Clinical Knowledge Assessment
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#382216] tracking-tight">
            Anatomical & Clinical Quiz: {organ.name}
          </h2>
          <p className="text-sm italic text-[#6e5847] mt-0.5">
            {organ.latinName}
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white/80 border border-[#8c7853]/30 px-3.5 py-1.5 rounded-xl text-xs font-sans font-bold text-[#6e5847]">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>

      {!isQuizCompleted ? (
        <div className="max-w-3xl mx-auto font-sans">
          
          {/* Clinical Vignette Box */}
          <div className="bg-[#ebdcc9]/40 border-l-4 border-[#087F8C] p-4 rounded-r-xl mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#087F8C] flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Clinical Scenario
            </span>
            <p className="text-sm text-[#382216] font-medium leading-relaxed italic font-serif">
              "{currentQ.clinicalScenario}"
            </p>
          </div>

          {/* Question Title */}
          <h3 className="text-lg sm:text-xl font-serif font-black text-[#2c221a] mb-5 leading-snug">
            {currentQ.question}
          </h3>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === idx;
              const isCorrect = idx === currentQ.correctAnswerIndex;
              
              let btnStyle = 'bg-white hover:bg-[#faf6ed] border-[#e8dccb] text-[#2c221a]';
              if (showExplanation) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-medium';
                } else {
                  btnStyle = 'bg-white/50 border-gray-200 text-gray-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${btnStyle}`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    showExplanation && isCorrect 
                      ? 'bg-emerald-600 text-white' 
                      : (showExplanation && isSelected ? 'bg-rose-600 text-white' : 'bg-[#e8dccb] text-[#6e5847]')
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm leading-relaxed flex-1">
                    {option}
                  </span>
                  {showExplanation && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {showExplanation && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Immediate Clinical Rationale & Pearl Box */}
          {showExplanation && (
            <div className="bg-white rounded-xl p-5 border border-[#8c7853]/40 shadow-sm mb-6 animate-fadeIn">
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswers[currentQuestionIndex] === currentQ.correctAnswerIndex ? (
                  <span className="text-emerald-700 font-bold text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Correct Clinical Deduction!
                  </span>
                ) : (
                  <span className="text-rose-700 font-bold text-sm flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    Review Clinical Anatomy:
                  </span>
                )}
              </div>
              <p className="text-xs text-[#524133] leading-relaxed mb-3">
                {currentQ.explanation}
              </p>
              <div className="bg-[#fcfaf7] border border-[#8c7853]/30 p-2.5 rounded-lg text-xs text-[#705030] font-serif italic">
                <strong>Clinical Pearl:</strong> {currentQ.clinicalPearl}
              </div>
            </div>
          )}

          {/* Navigation Action */}
          {showExplanation && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="bg-[#087F8C] hover:bg-[#075B66] text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz & View Score'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Final Certificate of Anatomical Mastery */
        <div className="max-w-2xl mx-auto text-center font-sans">
          
          <div className="bg-white rounded-2xl p-8 border-4 border-[#8c7853]/40 shadow-2xl relative overflow-hidden">
            {/* Watermark seal */}
            <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none">
              <Award className="w-64 h-64 text-[#8c7853]" />
            </div>

            <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-500 text-amber-700 flex items-center justify-center mx-auto mb-4 shadow-xs">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#8c7853] font-bold block mb-1">
              Aarogya Drishti • Digital Anatomical Atlas
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#382216] mb-2">
              Diploma of Anatomical Mastery
            </h3>
            <p className="text-sm italic text-[#6e5847] mb-6 font-serif">
              In recognition of demonstrated proficiency in {organ.name} ({organ.latinName})
            </p>

            {/* Score Ring */}
            <div className="inline-flex flex-col items-center justify-center w-28 h-28 rounded-full border-4 border-[#087F8C] bg-[#F5FAFA] mb-6 shadow-inner">
              <span className="text-3xl font-black text-[#087F8C]">
                {scoreResult.percentage}%
              </span>
              <span className="text-[11px] font-semibold text-[#647681]">
                {scoreResult.correct} of {scoreResult.total} Correct
              </span>
            </div>

            <p className="text-xs text-[#524133] max-w-md mx-auto mb-8 leading-relaxed">
              {scoreResult.percentage >= 75
                ? 'Excellent clinical reasoning! You have achieved mastery of this organ’s functional morphology, vascular relationships, and oncological triage criteria.'
                : 'Good effort! Anatomy requires repetitive spatial reinforcement. We recommend reviewing the 3D plinth sections and retaking the assessment.'}
            </p>

            <button
              onClick={handleReset}
              className="bg-[#087F8C] hover:bg-[#075B66] text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz & Refresh Memory</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
