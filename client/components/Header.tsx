import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useLogoutUserQuery } from "../generated/graphql";
import graphqlRequestClient, {
  queryClient,
} from "../requests/graphqlRequestClient";
import useStore from "../store";
import Spinner from "./Spinner";
import PostModal from "./modals/PostModal";
import CreatePost from "./posts/CreatePost";

const Header = () => {
  const router = useRouter();
  const store = useStore();
  const user = store.authUser;

  const { refetch } = useLogoutUserQuery(
    graphqlRequestClient,
    {},
    {
      enabled: false,
      onSuccess() {
        queryClient.clear();
        router.push("/login");
      },
      onError(error: any) {
        error.response.errors.forEach((err: any) => {
          toast(err.message, {
            type: "error",
            position: "top-right",
          });
          queryClient.clear();
          router.push("/login");
        });
      },
    }
  );

  const handleLogout = () => {
    refetch();
  };

  return (
    <>
      <header className="bg-white h-20">
        <nav className="h-full flex justify-between container items-center">
          <Link href="/" className="text-ct-dark-600 text-2xl font-semibold">
            Web
          </Link>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/" className="text-ct-dark-600">
                Home
              </Link>
            </li>
            {!user && (
              <>
                <li>
                  <Link href="/register" className="text-ct-dark-600">
                    SignUp
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-ct-dark-600">
                    Login
                  </Link>
                </li>
              </>
            )}
            {!!user && (
              <>
                <li>
                  <Link href="/profile" className="text-ct-dark-600">
                    Profile
                  </Link>
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => store.setOpenModal(true)}
                >
                  Create Post
                </li>
                <li className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <PostModal openModal={store.openModal} setOpenModal={store.setOpenModal}>
        <CreatePost />
      </PostModal>
      <div className="pt-4 pl-2 bg-ct-blue-600 fixed">
        {store.pageLoading && <Spinner color="text-ct-yellow-600" />}
      </div>
    </>
  );
};

export default Header;
