module.exports =  {
	handleChess,
	handleActiveUsers
}

/**
 * Lorsqu'on appelle Daffy, il répond...
 */

let activeUsers;

function handleActiveUsers(io ,datas) 
{
	activeUsers = Array.from(datas).map((data) => 
	{
		return {
			id: data[1].id,
			name: data[1].name
		}
	});

	io.sockets.emit('active_users', activeUsers);
}
