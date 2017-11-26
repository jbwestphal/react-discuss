import React from 'react'
import './styles/Header.css'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {

	return (
		<header className="navbar-fixed">
			<nav className="nav-wrapper">
				<Link to="/" className="brand-logo">Readable</Link>
				<a href="#gonnaOpenMenu" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li><NavLink activeClassName='active' exact to='/'>Home</NavLink></li>
					<li><a class="dropdown-button" href="#!" data-activates="dropdown1">Categories <i class="material-icons right">arrow_drop_down</i></a></li>
					<li><Link className="waves-effect waves-light btn" to='/new-post'>New Post <i className="material-icons right">add</i></Link></li>
				</ul>
			</nav>
		</header>
	)
}

export default Header