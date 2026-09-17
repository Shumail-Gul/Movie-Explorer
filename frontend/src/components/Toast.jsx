
function Toast({message, type ="success", onClose}) {
  return (
    <div className={`toast show position-fixed bottom-0 end-0 m-4 bg-${type} text-secondary shadow-md border-white`} role="alert">
        <div className="d-flex">
            <div className="toast-body m-3">{message}</div>
            <button type="button" className="btn-close btn-close-while me-2 m-auto" onClick={onClose}></button>
        </div>
        
    </div>
  )
}

export default Toast