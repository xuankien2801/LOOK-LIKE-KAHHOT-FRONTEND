import styles from './App.css';
import MyButton from './components/MyButton/MyButton';
import InGame from './pages/InGame/InGame';

function App() {
  return (
    <div className={styles.App}>
      <InGame/>
    </div>
  );
}

export default App;
