import BookCard from "./BookCard";
import {Box, Grid, IconButton, CircularProgress, Pagination} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {Link} from "react-router";
import {useAuth} from "../../context/AuthContext";
import {useGetBooksQuery} from "../../store/services/BookApi.js";
import {useState} from "react";

// sx == style
const BookListPage = () => {
    const {isAuth, user} = useAuth();
    const [page, setPage] = useState(1);

    const {data, isSuccess, isLoading} = useGetBooksQuery({page, pageSize: 15});

    const changePage = (event, value) => {
        setPage(value);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    if (isLoading) {
        return (
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <CircularProgress enableTrackSlot size="3rem" sx={{mt: 4}}/>
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
            {isSuccess &&
                <>
                    <Grid container spacing={2} mx="100px" my="50px">
                        {data.payload.data.map((b) => (
                            <Grid size={{sm: 12, md: 6, lg: 4, xl: 4}} key={b.id}>
                                <BookCard book={b}/>
                            </Grid>
                        ))}
                        <Grid size={data.payload.data.length % 3 === 0 ? 12 : 4}>
                            <Box
                                width="100%"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                height="100%"
                            >
                                <Link to="create">
                                    <IconButton color="secondary">
                                        <AddCircleIcon sx={{fontSize: "3em"}}/>
                                    </IconButton>
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box>
                        <Pagination count={data.payload.pageCount} page={data.payload.page} onChange={changePage}/>
                    </Box>
                </>
            }
        </Box>
    );
};

export default BookListPage;
