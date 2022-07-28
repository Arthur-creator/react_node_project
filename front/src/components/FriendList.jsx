import { useEffect, useState } from "react"

export default function FriendList({userId}) {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) return;
        (async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:4000/friends/${userId}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-type': 'application/json',
                    },
                });
                const users = [] ;

                const data = await res.json();
                console.log(data) ;
                for(const us of data) {
                    const tmp = await fetch('http://localhost:4000/users/' +us.friend_id ,{
                        method: 'GET'
                    }) ;
                    users.push(await tmp.json()) ;
                }
                setFriends(users);
            } catch (e) {
                console.error(e);
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