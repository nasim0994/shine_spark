import { useSelector } from "react-redux";
import UpdatePass from "./UpdatePass";

export default function Setting() {
  const { loggedUser } = useSelector((state) => state.user);

  return (
    <section>
      <UpdatePass id={loggedUser?.data?._id} />
    </section>
  );
}
