export default function Buttom(props) {
  const bgImage = props.bgUrl ? props.bgUrl : '';
  const btnContent = props.content ? props.content : '';
  const btnType = props.type ? props.type : '';
  const extStyle = props.extStyle ? props.extStyle : {};
  const onClick = props.onClick ? props.onClick : () => { };
  const classScss = props.custumStyle ? props.custumStyle : '';

  const btnStyles = {
    display: 'block',
    minWidth: '48px',
    maxWidth: '48px',
    height: '48px',
    background: '#3A80BA',
    borderRadius: '8px',
    backgroundPosition: 'center',
    // backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  return (
    <button
      style={{ ...btnStyles, ...extStyle, backgroundImage: `url(${bgImage})` }}
      className={classScss}
      type={btnType}
      onClick={() => onClick(btnContent)}
    >
      {btnContent}
    </button>
  );
}
