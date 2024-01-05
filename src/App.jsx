import './App.css';
import Button from './components/Button/Button';
import JournalItem from './components/JournalItem/JournalItem';


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
    <>
      Project
      <h1>H1</h1>
      <p>text</p>
      <Button />
      <JournalItem
        title={data[0].title}
        date={data[0].date}
        text={data[0].text}
      />
      <JournalItem
        title={data[0].title}
        date={data[0].date}
        text={data[0].text}
      />


    </>



  );
}

export default App;
