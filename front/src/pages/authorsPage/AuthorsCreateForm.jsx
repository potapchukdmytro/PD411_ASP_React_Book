import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import {styled} from "@mui/material/styles";
import {useFormik} from "formik";
import {object, string} from "yup";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useState} from "react";
import {useCreateAuthorMutation} from "../../store/services/AuthorApi.js";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import "./style.css";

const Card = styled(MuiCard)(({theme}) => ({
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

const SignInContainer = styled(Stack)(({theme}) => ({
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

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const initValues = {
    name: "",
    birthDate: new Date().toISOString().slice(0, 16),
    country: ""
};

const AuthorsCreateForm = () => {
    const [image, setImage] = useState(null);
    const [createAuthor, {isError, error}] = useCreateAuthorMutation();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("birthDate", values.birthDate);
        formData.append("country", values.country);
        if (image) {
            formData.append("image", image);
        }

        await createAuthor(formData);
        if (!isError) {
            navigate("/authors");
        } else {
            toast.error(error);
        }
    };

    const changeImageHandle = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setImage(event.target.files[0]);
        }
    }

    const deleteImageHandle = () => {
        setImage(null);
    }

    const getError = (prop) => {
        return formik.touched[prop] && formik.errors[prop] ? (
            <Typography sx={{mx: 1, color: "red"}} variant="h7">
                {formik.errors[prop]}
            </Typography>
        ) : null;
    };

    // validation scheme
    const validationScheme = object({
        name: string()
            .required("Обов'язкове поле"),
        country: string().max(100, "Максимальна довжина 100 символів")
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
                            <FormLabel htmlFor="name">Ім'я</FormLabel>
                            <TextField
                                name="name"
                                placeholder="Ім'я"
                                autoComplete="name"
                                autoFocus
                                fullWidth
                                variant="outlined"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                        {getError("name")}
                        <FormControl>
                            <FormLabel htmlFor="birthDate">Рік народження</FormLabel>
                            <TextField
                                name="birthDate"
                                placeholder="Рік народження"
                                autoComplete="birthDate"
                                fullWidth
                                type="datetime-local"
                                variant="outlined"
                                value={formik.values.birthDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            {getError("birthDate")}
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
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon/>}
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    type="file"
                                    accept="image/*"
                                    onChange={changeImageHandle}
                                />
                            </Button>
                        </FormControl>
                        {image &&
                            <Box sx={{textAlign: 'center', width: "100%"}}>
                                <Box component="img"
                                     className="form-image"
                                     onClick={deleteImageHandle}
                                     sx={{objectFit: "contain"}}
                                     src={URL.createObjectURL(image)}
                                     height="300px"
                                     width="100%">
                                </Box>
                            </Box>
                        }
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
