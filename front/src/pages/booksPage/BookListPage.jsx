import { useEffect } from "react";
import BookCard from "./BookCard";
import { Box, Grid, IconButton, CircularProgress } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { useAction } from "../../store/hooks/useAction";
// dispatch - для запису у store
// useSelector - для отримання із store

// sx == style
const BookListPage = () => {
    const { isAuth, user } = useAuth();
    const { loadBooks } = useAction();

    // отримання масиву книг та стану завантаження
    const { books, isLoaded } = useSelector((state) => state.book);

    useEffect(() => {
        loadBooks()
            .then((result) => {})
            .catch((error) => console.error(error));
    }, []);

    if (!isLoaded) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress enableTrackSlot size="3rem" sx={{ mt: 4 }} />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Grid container spacing={2} mx="100px" my="50px">
                {books.map((b, index) => (
                    <Grid size={{sm: 12, md: 6, lg: 4, xl: 4}} key={index}>
                        <BookCard book={b} />
                    </Grid>
                ))}
                {isAuth && user.role === "admin" && (
                    <Grid size={books.length % 3 === 0 ? 12 : 4}>
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="100%"
                        >
                            <Link to="create">
                                <IconButton color="secondary">
                                    <AddCircleIcon sx={{ fontSize: "3em" }} />
                                </IconButton>
                            </Link>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default BookListPage;
