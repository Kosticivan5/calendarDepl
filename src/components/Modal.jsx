import { GoCheckCircleFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../features/eventInfo/EventInfoSlice";
import { IoCloseCircleOutline } from "react-icons/io5";

const Modal = () => {
  const { cancelation, registration } = useSelector((store) => store.eventInfo);
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(closeModal());
        window.location.reload();
      }}
      className="modal"
    >
      <div className="check">
        <button>
          <IoCloseCircleOutline />
        </button>
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
