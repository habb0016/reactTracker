function Row (props) {
  return <div className={props.className ? 'row ' + props.className : 'row' }>{props.children}</div>
}

export default Row