import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <main className="error-page">
      <h1>404</h1>
      <p>Упсс...такая страница не существует</p>
      <Link to={"/calendarDKO"}>На главную</Link>
    </main>
  );
};
export default ErrorPage;
