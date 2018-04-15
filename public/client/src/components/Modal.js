import React from 'react'
import PropTypes from 'prop-types'
import './styles/Modal.css'

const Modal = (props) => {

  const display = {
    display: props.isOpen ? 'block' : 'none'
  }

  const closeModal = (el) => {
    let target = el.target
		target.parentNode.parentNode.style.display = 'none';
  }

	return (
		<div className="modal-custom" style={display}>
      <div className="modal-backdrop"></div>
      <div className="modal-content">
        <div className="modal-close" onClick={(el) => closeModal(el)}>X</div>
        { props.children }
      </div>
    </div>
	)
}

Modal.propTypes = {
  isOpen: PropTypes.bool
}

export default Modal