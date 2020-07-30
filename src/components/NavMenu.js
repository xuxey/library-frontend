import React from "react";
import {Link} from "react-router-dom"
import {Image, Nav, Navbar} from 'react-bootstrap'

const NavMenu = ({user}) => {
    const navStyle = {
        paddingRight: 5
    }
    if (user)
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="/books">
                    <Image width="30"
                           height="30"
                           className="d-inline-block align-top"
                           src="/favicon.png"/>
                    ShareBooks
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#" as="span"><Link style={navStyle} to="/books">Home</Link></Nav.Link>
                        <Nav.Link href="#" as="span"><Link style={navStyle} to="/wishlist">Wishlist</Link></Nav.Link>
                        {/*<Nav.Link href="#" as="span"><Link style={navStyle}
                                                           to='/recommended'>Recommended</Link></Nav.Link>*/}
                        <Nav.Link href="#" as="span"><Link style={navStyle} to="/dashboard">Dashboard</Link></Nav.Link>
                        {
                            (user.username==='admin') ? <>
                            <Nav.Link href="#" as="span"><Link style={navStyle} to="/books/new">Add Book</Link></Nav.Link>
                            <Nav.Link href="#" as="span"><Link style={navStyle} to="/users">Users</Link></Nav.Link>
                            <Nav.Link href="#" as="span"><Link style={navStyle} to="/activity">Activity</Link></Nav.Link>
                            </>:
                            null
                        }
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as {user.username}
                    </Navbar.Text>
                    <Nav.Link href="#" as="span" ><Link style={navStyle} to='/logout'>Logout</Link></Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        )
    else
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="/books">
                    <Image width="30"
                           height="30"
                           className="d-inline-block align-top"
                           src="/favicon.png"/>
                    ShareBooks
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end">
                        <Nav.Link href="#" as="span"><Link style={navStyle} to='/login'>Login</Link></Nav.Link>
                        <Nav.Link href="#" as="span"><Link style={navStyle} to='/register'>Register</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
}

export default NavMenu
