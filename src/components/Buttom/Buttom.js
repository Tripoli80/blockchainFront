export default function Buttom(props) {
  const bgImage = props.bgUrl ? props.bgUrl : '';
  const btnContent = props.content ? props.content : '';
  const btnType = props.type ? props.type : '';
  const onClick = props.onClick ? props.onClick : () => {};
  const classScss = props.custumStyle ? props.custumStyle : '';

  return (
    <button
      type={btnType}
      onClick={() => onClick(btnContent)}
      className={`basicButton  ${classScss} ${bgImage} `}
    >
      {btnContent}
    </button>
  );
}
