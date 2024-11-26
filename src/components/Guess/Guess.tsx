import classNames from 'classnames';
import { WORD_LENGTH } from '../../App';

// LetterMatch?
export type LetterStatus = 'MISPLACED' | 'IN_PLACE' | 'NOT_IN_WORD' | 'COVERED';

const LetterStatusStyleMap: Record<LetterStatus, string> = {
  IN_PLACE: 'bg-lime-300',
  MISPLACED: 'bg-amber-400',
  NOT_IN_WORD: 'bg-zinc-500',
  // "UNUSED"?
  COVERED: 'bg-transparent',
};

function GuessLetter({
  letter,
  letterStatus,
}: {
  letter: string;
  letterStatus: LetterStatus;
}) {
  return (
    <div
      className={classNames('guess-letter', LetterStatusStyleMap[letterStatus])}
    >
      <span className='align-middle'>{letter}</span>
    </div>
  );
}

export type GuessLetter = { letter: string; status: LetterStatus };
export type Guess = Array<GuessLetter>;

export function Guess({ guess }: { guess: Guess }) {
  let content;
  if (guess.length === 0) {
    content = [
      ...Array.from({ length: WORD_LENGTH }, (_, index) => index + 1),
    ].map((_: number, i) => {
      return (
        <GuessLetter letter='' key={i} letterStatus='COVERED'></GuessLetter>
      );
    });
  } else {
    content = guess.map(({ letter, status }, i) => {
      return <GuessLetter key={i} letter={letter} letterStatus={status} />;
    });
  }

  return <div className='flex justify-center gap-4'>{content}</div>;
}
