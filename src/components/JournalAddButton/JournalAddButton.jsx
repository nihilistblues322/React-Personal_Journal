import './JournalAddButton.css';
import CardButton from '../CardButton/CardButton';

function JournalAddButton({clearForm}) {
	return (
		<CardButton className="journal-add" onClick={clearForm}>
			<img src="/Frame.svg" alt="+" />
			Новое воспоминание
		</CardButton>
	);
}

export default JournalAddButton;
