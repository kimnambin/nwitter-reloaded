//특별한 컴포넌트
//로그인한 사용자가 볼 수 있는 것
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
    children, //ProtectedRoute (부모)의 자식임
}: {
    children: React.ReactNode;
}){
    //파이어베이스에 있는 auth 사용 (사용자가 로그인 했는지 알려줌)
    const user = auth.currentUser;
    //로그인이 안된 상태라면 로그인 페이지로 이동
    if (user === null) {
        return <Navigate to ="/login" />;
    }
    return children;
}

