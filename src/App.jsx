import "./App.css";
import Header from "./components/Header/Header";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import JournalList from "./components/JournalList/JournalList";
import Body from "./layouts/Body/Body";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import { useLocalStorage } from "./hooks/use-localstorage.hook";
import { UserContextProvider } from "./context/user.context";


function mapItems(items) {
    if (!items) {
        return [];
    }
    return items.map(i => ({
        ...i,
        date: new Date(i.date)
    }));
}

function App() {
    const [items, setItems] = useLocalStorage('data');
   

    const addItem = (item) => {
        setItems([...mapItems(items),
        {
            id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
            post: item.post,
            title: item.title,
            date: new Date(item.date),
        },
        ]);
    };

    return (
        <UserContextProvider>
            <div className="app">
                <LeftPanel>
                    <Header />
                    <JournalAddButton />
                    <JournalList items={mapItems(items)} />
                </LeftPanel>
                <Body>
                    <JournalForm onSubmit={addItem} />
                </Body>
            </div>
        </UserContextProvider>
    );
}

export default App;
