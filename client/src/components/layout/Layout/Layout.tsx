import Notification from "../../UI/Notification/Notification";
import Navigation from "../Navigation/Navigation";

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = (props) => {

    return (
        <>
            <Navigation>
                <Notification />
                {props.children}
            </Navigation>
        </>
    );
}

export default Layout;