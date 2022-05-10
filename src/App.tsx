import AddColor from './Components/AddColorForm';
import ColorList from './Components/ColorListForm';

const App: React.FC = () => (
    <main className="border">
        <AddColor />
        <ColorList />
    </main>
);

export default App;
