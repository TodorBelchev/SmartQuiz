import { Container } from "@mui/system";
import Notification from "../../UI/Notification/Notification";

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = (props) => {

    return (
        <>
            <main>
                <Container>
                    <Notification />
                    {props.children}
                </Container>
            </main>
        </>
    );
}

export default Layout;