import { useEffect } from "react";
import { useNavigate } from "react-router";

export function useRedirect({ condition, path, conditionRender }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (condition) navigate(path);
  }, [conditionRender]);
}
