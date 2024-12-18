import {PropsWithChildren, useEffect} from "react";
import {useAuth} from "../hooks/useAuth.ts";
import { useNavigate } from "react-router-dom"

type protectedRouteChildren = PropsWithChildren;

export default function ProtectedRoute({ children }: protectedRouteChildren) {
  const navigate = useNavigate()
  const {isAuthenticated} = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/authentication', {replace: true})
    }
  }, [navigate, isAuthenticated]);

  return children

}