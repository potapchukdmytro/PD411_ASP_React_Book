import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../../services/CookieService";
import {useNavigate} from "react-router";
import {api} from "../../api.js";

const GenreListPage = () => {
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    const fetchGenres = async () => {
        try {
            const response = await api.get("genre");
            if (response.status === 200) {
                setGenres(response.data.payload);
            }
        } catch {
            navigate("/login");
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {genres.map((genre) => (
                        <TableRow key={genre.id}>
                            <TableCell>{genre.id}</TableCell>
                            <TableCell>{genre.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default GenreListPage;
