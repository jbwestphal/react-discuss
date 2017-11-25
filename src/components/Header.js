import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {

	return (
		<header className="header-main-wrapper">
			<h1><Link to="/" className="header-logo">Readable</Link></h1>
			<nav className="header-nav">
				<NavLink activeClassName='active' to='/'>Home</NavLink>
				<NavLink activeClassName='active' to='/categories' exact>Categories</NavLink>
			</nav>
		</header>
	)
}

export default Header