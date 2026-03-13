import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { object, string, number } from "yup";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "0px auto",
    [theme.breakpoints.up("sm")]: {
        maxWidth: "450px",
    },
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
        boxShadow:
            "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
        ...theme.applyStyles("dark", {
            backgroundImage:
                "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
        }),
    },
}));

const initValues = {
    firstName: "",
    lastName: "",
    birthday: "",
    country: "",
    image: "",
};




const AuthorsCreateForm = () => {
    const handleSubmit = (values) => {
        console.log(values);
    };

    const getError = (prop) => {
        return formik.touched[prop] && formik.errors[prop] ? (
            <Typography sx={{ mx: 1, color: "red" }} variant="h7">
                {formik.errors[prop]}
            </Typography>
        ) : null;
    };

    // validation scheme
    const maxYear = new Date().getFullYear();
    const validationScheme = object({
        firstName: string()
            .required("Обов'язкове поле")
            .max(100, "Максимальна довжина 100 символів"),
        lastName: string()
            .required("Обов'язкове поле")
            .max(100, "Максимальна довжина 100 символів"),
        birthday: number()
            .min(0, "Рік не може бути від'ємним")
            .max(maxYear, `Рік не може бути більшим за ${maxYear}`)
            .required("Обов'язкове поле"),                
        country: string().max(100, "Максимальна довжина 100 символів"),


    });

    // formik
    const formik = useFormik({
        initialValues: initValues,
        onSubmit: handleSubmit,
        validationSchema: validationScheme,
    });

    return (
        <Box>
            <SignInContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            width: "100%",
                            fontSize: "clamp(2rem, 10vw, 2.15rem)",
                        }}
                    >
                        Додавання нового автора
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "100%",
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="firstName">Ім'я</FormLabel>
                            <TextField
                                name="firstName"
                                placeholder="Ім'я"
                                autoComplete="firstName"
                                autoFocus
                                fullWidth
                                variant="outlined"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                        {getError("firstName")}
                        <FormControl>
                            <FormLabel htmlFor="lastName">Прізвище</FormLabel>
                            <TextField
                                name="lastName"
                                placeholder="Прізвище автора"
                                autoComplete="lastName"
                                fullWidth
                                variant="outlined"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                        {getError("lastName")}
                        <FormControl>
                            <FormLabel htmlFor="birthday">Рік народження</FormLabel>
                            <TextField
                                name="birthday"
                                placeholder="Рік народження"
                                autoComplete="birthday"
                                fullWidth
                                type="number"
                                variant="outlined"
                                value={formik.values.birthday}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            {getError("birthday")}
                        </FormControl>                        
                        <FormControl>
                            <FormLabel htmlFor="country">Країна</FormLabel>
                            <TextField
                                name="country"
                                placeholder="Країна"
                                autoComplete="country"
                                fullWidth
                                variant="outlined"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                        {getError("country")}

                        <FormControl>
                            <FormLabel htmlFor="image">Фото автора</FormLabel>
                            <TextField
                                name="image"
                                placeholder="Фото автора"
                                autoComplete="image"
                                fullWidth
                                variant="outlined"
                                value={formik.values.image}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="error"
                        >
                            Додати
                        </Button>
                    </Box>
                </Card>
            </SignInContainer>
        </Box>
    );
};

export default AuthorsCreateForm;
