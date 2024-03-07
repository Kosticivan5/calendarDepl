import { GoCheckCircleFill } from "react-icons/go";
import { closeModal } from "../features/eventInfo/EventInfoSlice";
import { useDispatch, useSelector } from "react-redux";

const Modal = () => {
  const dispatch = useDispatch();
  const { cancelation, registration } = useSelector((store) => store.eventInfo);

  return (
    <div onClick={() => dispatch(closeModal("registration"))} className="modal">
      <div className="check">
        <GoCheckCircleFill />
        {cancelation && (
          <p>
            Вы отменили <br /> регистрацию
          </p>
        )}
        {registration && <p>Вы успешно зарегистрировались</p>}
      </div>
    </div>
  );
};
export default Modal;
