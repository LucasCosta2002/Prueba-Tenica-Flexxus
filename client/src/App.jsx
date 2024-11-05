import './App.css'
import './normalize.css'
import { Header } from './Components/Header.jsx'
import { UserTable } from './Components/UserTable.jsx'
import { SearchBar } from './Components/SearchBar.jsx'
import { UsersProvider } from './Context/UsersProvider.jsx'
import { Layout } from 'antd'

const { Content } = Layout;

function App() {

	return (
		<UsersProvider>
			<Layout>
				<Header />
				<Content style={{ padding: '20px 60px' }}>
					<SearchBar />
					<UserTable />
				</Content>
			</Layout>
		</UsersProvider>
	)
}

export default App