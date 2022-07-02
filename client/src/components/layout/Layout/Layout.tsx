import { Container } from "@mui/system";

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = (props) => {

    return (
        <>
            <main>
                <Container>
                    {props.children}
                </Container>
            </main>
        </>
    );
}

export default Layout;