import { Button } from "@mui/material";
import { Link } from "react-router";

const MainPage = () => {
    return (
        <>
            <h1 style={{ textAlign: "center" }}>Головна сторінка</h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to="/books">
                    <Button variant="contained" sx={{ mx: 1 }}>
                        Книги
                    </Button>
                </Link>

                <Link to="/authors">
                    <Button variant="contained" sx={{ mx: 1 }}>
                        Автори
                    </Button>
                </Link>
            </div>
        </>
    );
};

export default MainPage;
