import Button from "@mui/material/Button";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {TextField, IconButton, InputAdornment, FormControl, OutlinedInput, InputLabel} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


type Props = {
    onLogin: (username: string, password: string) => void
}

export default function LoginForm(props: Props) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);



    const navigate = useNavigate()

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        props.onLogin(username, password)
        navigate("/")
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
                            onChange={(event) => setUsername(event.target.value)}
                            sx={{ width: '100%', marginBottom: '10px' }}
                        />
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
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
