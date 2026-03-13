import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const TestUseEffect = () => {
    const [counter, setCounter] = useState(0);
    const [counter50, setCounter50] = useState(0);

    console.log(`Component rendered ${counter}, ${counter50}`);

    const increment = () => {
        setCounter(counter + 1);
    };

    const decrement = () => {
        setCounter(counter - 1);
    };

    const increment50 = () => {
        setCounter50(counter50 + 50);
    };

     const decrement50 = () => {
        setCounter50(counter50 - 50);
    };

    useEffect(() => {
        console.log("Effect called");
    }, []);

    return (
        <Box display="flex" justifyContent="space-around">
            <Box>
                <Typography variant="h3" sx={{ textAlign: "center" }}>
                    {counter}
                </Typography>
                <Box sx={{ textAlign: "center" }}>
                    <Button
                        onClick={increment}
                        variant="contained"
                        color="success"
                    >
                        +1
                    </Button>
                    <Button
                        onClick={decrement}
                        variant="contained"
                        color="error"
                    >
                        -1
                    </Button>
                </Box>
            </Box>

            <Box>
                <Typography variant="h3" sx={{ textAlign: "center" }}>
                    {counter50}
                </Typography>
                <Box sx={{ textAlign: "center" }}>
                    <Button
                        onClick={increment50}
                        variant="contained"
                        color="success"
                    >
                        +50
                    </Button>
                    <Button
                        onClick={decrement50}
                        variant="contained"
                        color="error"
                    >
                        -50
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default TestUseEffect;
