function Card (props) {
  return (
    <div className="card">
      <div className="card-header">{props.title}</div>
      <div className="card-body">{props.text}</div>
    </div>
  )
}

export default Card