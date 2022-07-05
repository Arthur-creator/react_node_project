import Header from './components/layout/Header'
import {Container} from "@mui/material";
import Router from "./routes/Router";

function App() {
    return (
        <div className="App">
            <Header/>
            <Container maxWidth="lg">
                <Router/>
            </Container>
        </div>
    )
}

export default App
