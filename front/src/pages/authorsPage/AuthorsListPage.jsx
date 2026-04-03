import AuthorsCard from "./AuthorsCard";
import {Box, CircularProgress, Grid} from "@mui/material";
import {useGetAuthorsQuery} from "../../store/services/AuthorApi.js";

// sx == style

const AuthorsListPage = () => {
    const {data, isSuccess, isLoading} = useGetAuthorsQuery();

    if(isLoading) {
        return  (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress enableTrackSlot size="3rem" sx={{ mt: 4 }} />
            </Box>
        )
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
                <Grid container spacing={2} mx="100px" my="50px">
                    {data.payload.data.map((a) => (
                        <Grid size={4} key={a.id}>
                            <AuthorsCard author={a}/>
                        </Grid>
                    ))}
                </Grid>
            }
        </Box>
    );
};

export default AuthorsListPage;