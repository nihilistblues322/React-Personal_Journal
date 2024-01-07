import './App.css';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalItem from './components/JournalItem/JournalItem';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useState } from 'react';

const INITIAL_DATA = [
    {
        id: 1,
        title: 'Подготовка к обновлению курсов',
        text: 'Горные походы открывают удивительные природные ландшафты',
        date: new Date()
    },
    {
        id: 2,
        title: 'Поход в годы',
        text: 'Думал, что очень много времени',
        date: new Date()
    }
];

function App() {
    const [items, setItems] = useState(INITIAL_DATA);

    const addItem = item => {
        setItems(oldItems => [...oldItems, {
            id: Math.max(...oldItems.map(i => i.id)) + 1,
            text: item.text,
            title: item.title,
            date: new Date(item.date)

        }]);
    };

    const sortItems = (a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    };

    return (
        <div className='app'>
            <LeftPanel>
                <Header />
                <JournalAddButton />
                <JournalList>
                    {items.sort(sortItems).map(el => (
                        <CardButton key={el.id}>
                            <JournalItem
                                title={el.title}
                                date={el.date}
                                text={el.text}
                            />
                        </CardButton>
                    ))}
                </JournalList>
            </LeftPanel>
            <Body>
                <JournalForm onSubmit={addItem} />
            </Body>
        </div>
    );
}

export default App;
