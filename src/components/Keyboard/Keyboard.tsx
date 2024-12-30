import { useCallback, useLayoutEffect, useState } from "react";
import { LetterStatus } from "../../models/Guess";

const keys = [
	"Q",
	"W",
	"E",
	"R",
	"T",
	"Y",
	"U",
	"I",
	"O",
	"P",
	"A",
	"S",
	"D",
	"F",
	"G",
	"H",
	"J",
	"K",
	"L",
	"Z",
	"X",
	"C",
	"V",
	"B",
	"N",
	"M",
] as const;

type Letter = (typeof keys)[number];

type KeyboardProps = {
	onSubmit: (guess: string) => void;
	onChange: (letter: string) => void;
	lettersStateMap: Map<Letter, LetterStatus>;
	maxLength?: number;
};

function Keyboard({ onSubmit, onChange, maxLength }: KeyboardProps) {
	const [content, setContent] = useState("");

	const handleChange = useCallback(
		(pressedKey: string) => {
			let newGuess = "";
			if (pressedKey === "Enter") {
				return;
			} else if (pressedKey === "Backspace") {
				newGuess = content.slice(0, -1);
			} else if (!/^[a-zA-Z]$/.test(pressedKey)) {
				return;
			} else {
				if (maxLength && maxLength <= content.length) {
					return;
				}
				newGuess = content + pressedKey;
			}

			setContent(newGuess);
			onChange(newGuess);
		},
		[onChange, content, maxLength]
	);

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
		(e) => {
			e.preventDefault();
			setContent("");
			onSubmit(content);
		},
		[onSubmit, content]
	);

	useLayoutEffect(() => {
		const handleKeyUp = (event: KeyboardEvent) => {
			handleChange(event.key);
		};

		document.body.addEventListener("keyup", handleKeyUp);

		return () => {
			document.body.removeEventListener("keyup", handleKeyUp);
		};
	}, [handleChange]);

	return (
		<form action={""} onSubmit={handleSubmit} className="flex flex-col items-center space-y-2">
			<div className="flex space-x-1">
				{keys.slice(0, 10).map((key) => (
					<input
						type="button"
						key={key}
						value={key}
						className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
					/>
				))}
			</div>
			<div className="flex space-x-1">
				{keys.slice(10, 19).map((key) => (
					<input
						type="button"
						key={key}
						value={key}
						className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
					/>
				))}
			</div>
			<div className="flex space-x-1">
				{keys.slice(19).map((key) => (
					<input
						type="button"
						key={key}
						className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
						value={key}
					/>
				))}
			</div>
			<input
				value={"submit"}
				type="submit"
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			/>
		</form>
	);
}

export default Keyboard;
