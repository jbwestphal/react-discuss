import React from 'react'
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

export default Modal