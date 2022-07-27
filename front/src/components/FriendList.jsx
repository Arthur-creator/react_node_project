import { useEffect, useState } from "react"

export default function FriendList({userId}) {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) return;
        (async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:4000/api/friends/${userId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-type': 'application/json',
                    },
                });
                const data = await res.json();
                setFriends(data);
                console.log(data)
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        })();
    }, [userId])

    return (
        <section>
            {friends.map((friend) => <article key={friend.id}>
                {`${friend.firstname} ${friend.lastname}`}
            </article>)}
        </section>
    )
}