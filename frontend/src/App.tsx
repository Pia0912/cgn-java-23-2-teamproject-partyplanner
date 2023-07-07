import './App.css'
import Partylist from "./components/Partylist.tsx";
import Header from "./components/Header.tsx";
import {useEffect, useState} from "react";
import {DTOParty, Party} from "./models.ts";
import axios from "axios";
import {Container} from "@mui/material";
import AddForm from "./components/AddForm.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import PartyDetail from "./components/PartyDetail.tsx";
import EditForm from "./components/EditForm.tsx";


export default function App() {
    const navigate = useNavigate();
    const [parties, setParties] = useState<Party[]>([]);

    useEffect(() => {
        axios.get('api/parties')
            .then(response => response.data)
            .catch(console.error)
            .then(data => setParties(data))
    }, [])

    function handleAddParty(data: DTOParty) {
        axios.post('api/parties', data)
            .then(response => response.data)
            .catch(console.error)
            .then(data => setParties(data))
    }

    function handleEditParty(id: string, data: DTOParty) {
        axios.put(`/api/parties/${id}`, data)
            .then(response => response.data)
            .catch(console.error)
            .then(data => setParties(
                parties.map(party => {
                    if (party.id === id) {
                        return data;
                    }
                    return party;
                })
            ))
    }

    function handleDeleteParty(id: string) {
        axios.delete(`/api/parties/${id}`)
            .catch(console.error);
        setParties(parties.filter(party => party.id !== id))
        navigate("/")
    }

    return (
        <main>
            <Routes>
                <Route path={"/add"} element={<AddForm onAddParty={handleAddParty}/>}/>
                <Route path={"/:id"}>
                    <Route index element={<PartyDetail onDeleteParty={handleDeleteParty}/>}/>
                    <Route path={"edit"} element={<EditForm onEditParty={handleEditParty}/>}/>
                </Route>

                <Route path={"/"} element={
                    (<Container>
                        <Header/>
                        <Partylist parties={parties}/>
                        <Button className="button-right" variant="contained" disableElevation
                                onClick={() => navigate("/add")}>
                            + Add Party
                        </Button>

                    </Container>)
                }/>


            </Routes>


        </main>
    )
}
