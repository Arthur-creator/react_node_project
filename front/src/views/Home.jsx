import Permission from "../components/utils/Permission";
import {SCOPES} from "../utils/permissions-map";

export default function Home() {
    return (
        <>
            <h1>Home</h1>
            <Permission scopes={[SCOPES.canView]}>
                <h2>Only users, editors and admin can see this.</h2>
                <small>Edit <b>Permission.jsx:10</b> to "GUEST" to test it</small>
            </Permission>
        </>
    )
}
