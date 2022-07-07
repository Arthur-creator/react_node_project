import Header from './components/layout/Header'
import {Container} from "@mui/material";
import {Routes, Route} from 'react-router-dom'
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import {Suspense} from "react";

function App() {
    return (
        <div className="App">
            <Header/>
            <Container maxWidth="lg">
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </Suspense>
            </Container>
        </div>
    )
}

export default App
