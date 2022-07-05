import { Container } from "@mui/system";
import Notification from "../../UI/Notification/Notification";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = (props) => {

    return (
        <>
            <Navigation>
                <Notification />
                <Container>
                    {props.children}
                </Container>
            </Navigation>
            <Footer />
        </>
    );
}

export default Layout;