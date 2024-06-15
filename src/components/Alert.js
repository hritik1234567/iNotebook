import React from 'react'

function Alert(props){
  
    return (
        <>
        {props.alert && props.alert.type && props.alert.msg && (
          <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{props.alert.type}</strong>: {props.alert.msg}
            
          </div>
        )}
      </>
    )

}
export default Alert