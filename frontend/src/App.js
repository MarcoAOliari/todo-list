import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Tasks from './components/pages/Tasks';
import Lists from './components/pages/Lists';

function App() {
    return (
		<>
			<Router>
				<Routes>
					<Route path='/' exact element={<Lists />}/>
					<Route path='/todo/:id' element={<Tasks />}/>
				</Routes>
			</Router>
		</>
    );
}

export default App;
