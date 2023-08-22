function Col (props) {
  return <div className={props.className ? 'col ' + props.className : 'col'}>{props.children}</div>
}

export default Col