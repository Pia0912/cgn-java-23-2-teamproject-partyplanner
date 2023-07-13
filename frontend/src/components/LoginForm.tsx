import Button from "@mui/material/Button";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {TextField, IconButton, InputAdornment, FormControl, OutlinedInput, InputLabel, FormHelperText} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


type Props = {
    onLogin: (username: string, password: string) => void
}

export default function LoginForm(props: Props) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorUsername, setErrorUsername] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);



    const navigate = useNavigate()

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        props.onLogin(username, password)
        navigate("/")
    }

    function changeUsername(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
        if (event.target.value.includes(" ")) {
            setErrorUsername("Whitespace is not allowed!")
        } else if (event.target.value.length < 3) {
            setErrorUsername("Username must be at least 3 characters long!")
        } else if (event.target.value.length > 25) {
            setErrorUsername("Username must be under 25 characters long!")
        } else {
            setErrorUsername("")
        }
    }


    function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
        const regExp = new RegExp("(?=^.{8,}$)(?=.*\\d)(?=.*[!@#$%^&*]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$")
        if (!event.target.value.match(regExp)) {
            setErrorPassword("Must be at least 8 characters long, must include special character, must include digit, must include capital letter, must include non-capital letter")
        } else {
            setErrorPassword("")
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (<>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '28px' }}>Login</legend>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            label="Username"
                            type="text"
                            value={username}
                            id="username"
                            onChange={changeUsername}
                            helperText={errorUsername}
                            sx={{ width: '100%', marginBottom: '10px' }}
                        />
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={changePassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            {errorPassword && <FormHelperText error>{errorPassword}</FormHelperText>}
                        </FormControl>
                    </div>
                    <div>
                        <Button sx={{ mt: 1, mr: 1, color: "rgb(44, 161, 173)", borderColor: "rgb(44, 161, 173)" }} variant="outlined" disableElevation
                                onClick={() => navigate("/")}> Cancel</Button>

                        <Button sx={{ mt: 1, mr: 1, bgcolor: "rgb(44, 161, 173)" }} type="submit" variant="contained" className="button-right">
                            Login
                        </Button>
                    </div>
                </fieldset>
            </form>
        </>
)
}
