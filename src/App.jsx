import './App.css';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalItem from './components/JournalItem/JournalItem';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';

function App() {
    const data = [
        {
            title: 'Подготовка к обновлению курсов',
            date: new Date(),
            text: 'Горные походы открывают удивительные природные ландшафты'
        },
        {
            title: 'Поход в годы',
            date: new Date(),
            text: 'Думал, что очень много времени'
        }
    ];
    return (
        <div className='app'>
            <LeftPanel>
                <Header />
                <JournalAddButton/>
                <JournalList>
                    <CardButton>
                        <JournalItem
                            title={data[0].title}
                            date={data[0].date}
                            text={data[0].text}
                        />
                    </CardButton>
                    <CardButton>
                        <JournalItem
                            title={data[0].title}
                            date={data[0].date}
                            text={data[0].text}
                        />
                    </CardButton>
                </JournalList>
            </LeftPanel>

            <Body>
                Body

            </Body>

            
        </div>
    );
}

export default App;
