import React from 'react'
import { Link } from 'react-router-dom'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@chakra-ui/react'

function Navbar() {
    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <Link to="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Link to="/about">About</Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
                <Link to="/users">Users</Link>
            </BreadcrumbItem>
        </Breadcrumb>
    )
}

export default Navbar