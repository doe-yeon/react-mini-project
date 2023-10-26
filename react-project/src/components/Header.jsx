import React from 'react'
import { Container, Nav, Navbar, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container data-bs-theme="dark">
                <Navbar.Brand href="/" style={{ color: 'red' }}><img src="https://fontmeme.com/permalink/230927/1194d48886b70bad9638a24ca52935eb.png" width='100px'></img></Navbar.Brand>
                <Nav className="me-auto">
                    <Link to="/" className='link-item'>Home</Link>
                    <Link to="/" className='link-item'>Movies</Link>
                </Nav>
                <Form className="d-flex" data-bs-theme="light">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-danger">Search</Button>
                </Form>
            </Container>
        </Navbar >
    )
}

export default Header