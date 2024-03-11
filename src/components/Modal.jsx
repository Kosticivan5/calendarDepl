import { GoCheckCircleFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../features/eventInfo/EventInfoSlice";

const Modal = () => {
  const { cancelation, registration } = useSelector((store) => store.eventInfo);
  const dispatch = useDispatch();

  return (
    <div onClick={() => dispatch(closeModal())} className="modal">
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
