import { Alert } from "@mui/material";

export default function ErrorComponent({ error, Errors }) {
    return (<>
        {
            (error in Errors) ? < Alert severity="error">
                {
                    Errors[error] && (
                        <ul>
                            {
                                Errors[error].map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))
                            }
                        </ul>
                    )
                }
            </Alert> : null
        }
    </>)
}