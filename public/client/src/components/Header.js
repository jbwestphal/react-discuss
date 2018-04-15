import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import CategoriesDropdown from './CategoriesDropdown'
import './styles/Header.css'
import Logo from '../img/logo.png'

const Header = () => <header className="navbar-fixed">
	<nav className="nav-wrapper">
		<Link to="/" className="brand-logo"><img src={Logo} width="35" alt="React Readable" /> &nbsp; Discuss</Link>
		<a href="#gonnaOpenMenu" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
		<ul id="nav-mobile" className="right hide-on-med-and-down">
			<li><NavLink activeClassName='active' exact to='/'>Home</NavLink></li>
			<li className="header-dropdown"><CategoriesDropdown isLink={true} firstValue="Categories" /></li>
			<li><Link className="waves-effect waves-light btn" to='/new-post'>New Post <i className="material-icons right">add</i></Link></li>
		</ul>
	</nav>
</header>

export default Header