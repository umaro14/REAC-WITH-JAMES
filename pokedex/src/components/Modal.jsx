import ReactDom from 'react-dom';

export function Modal(props){
    const { children, handleCloseModel } = props
    return ReactDom.createPortal(
        <div className="modal-container">
          <button onClick={handleCloseModel} className="model-underlay"></button>
          <div className="modal-content">
            {children}
          </div>
        </div>,
        document.getElementById('portal')
    )
}