import AuthorsCard from "./AuthorsCard";
import { Box, Grid } from "@mui/material";
import { useAction } from "../../store/hooks/useAction";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// sx == style

const AuthorsListPage = () => {
    const {loadAuthors} = useAction();
    const {authors} = useSelector(state => state.author);

    useEffect(() => {
        const loadAction = async () => {
            await loadAuthors();
        }

        loadAction();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Grid container spacing={2} mx="100px" my="50px">
                {authors.map((a) => (
                    <Grid item size={4} key={a.id}>
                        <AuthorsCard author={a} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AuthorsListPage;