import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <p>Oops! </p>
      <p>Encounter something went wrong</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
