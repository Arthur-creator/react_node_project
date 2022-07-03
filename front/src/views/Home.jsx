import Permission from "../components/utils/Permission";
import {SCOPES} from "../utils/permissions-map";

export default function Home() {
    return (
        <>
            <h1>Home</h1>
                <Permission scopes={[SCOPES.canEdit]}>
                    <h2>Admin</h2>
                </Permission>
        </>
    )
}
