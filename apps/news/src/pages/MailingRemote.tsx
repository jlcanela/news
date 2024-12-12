import { lazy, Suspense } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { ArticleRepository } from "../repositories/ArticleRepositories";
import { MainTitle } from "../components/Titles";

export default function MailingRemote() {
  const articleRepository = new ArticleRepository();
  const navigate = useNavigate();

  const MailingRemote = lazy(
  	// @ts-ignore
  	async () => import('remote/Mailing'),
  );

  const ErrorMessage = () => (<MainTitle>MailingRemote Feature is not available</MainTitle>);
  return (
    <>
      <Suspense fallback={<ErrorMessage/>}>
         <MailingRemote
        articleRepository={articleRepository}
        goHome={() => {navigate("/");}}
        />
      </Suspense>
    </>
  );
}
